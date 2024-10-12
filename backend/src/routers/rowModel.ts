import prisma from "../prismaClient.js";
import { handleError } from "../utils/errorHandler.js";
import { schemas } from "../schemas/schemas.js";
import { fieldLabelMap } from "../schemas/fieldLabelMap.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

const getFollowedProgramIds = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { followedPrograms: { select: { id: true } } },
  });
  return user?.followedPrograms.map((program) => program.id) || [];
};

const applySelectFilter = (field, condition) => {
  const enumKeys = Object.keys(fieldLabelMap[field]).filter((key) => {
    const label = fieldLabelMap[field][key];
    return label.toLowerCase().includes(condition.filter.toLowerCase());
  });

  // If no matches found, use notIn to return an empty result
  if (enumKeys.length > 0) {
    return { in: enumKeys };
  } else {
    return { notIn: Object.keys(fieldLabelMap[field]) };
  }
};

const applyStringFilter = (condition) => ({
  contains: condition.filter,
  mode: "insensitive",
});

const applyNumberFilter = (condition) => {
  const { type, filter, filterTo } = condition;

  switch (type) {
    case "equals":
      return {
        equals: parseFloat(filter),
      };
    case "greaterThanOrEqual":
      return {
        gte: parseFloat(filter),
      };
    case "lessThanOrEqual":
      return {
        lte: parseFloat(filter),
      };
    case "inRange":
      if (filter && filterTo) {
        return {
          gte: parseFloat(filter),
          lte: parseFloat(filterTo),
        };
      }
      throw new Error(
        "Both 'filter' and 'filterTo' are required for 'inRange'"
      );
    default:
      throw new Error(`Unsupported number filter type: ${type}`);
  }
};

const applyBooleanFilter = (condition) => {
  const filterText = condition.filter.toLowerCase();

  if ("yes".includes(filterText)) {
    return { equals: true };
  } else if ("no".includes(filterText)) {
    return { equals: false };
  } else {
    // Optionally, handle cases where the filter text does not match either "yes" or "no"
    throw new Error(`Unsupported boolean filter text: ${condition.filter}`);
  }
};

const applyDateFilter = (condition) => {
  const { dateFrom, dateTo, type } = condition;

  switch (type) {
    case "equals": {
      const startOfDay = dayjs(dateFrom).utcOffset(0, true);
      const endOfDay = dayjs(dateFrom).utcOffset(0, true);

      return {
        gte: startOfDay.toDate(), // Inclusive
        lte: endOfDay.toDate(), // Inclusive
      };
    }
    case "lessThan": {
      const endOfDayLessThan = dayjs(dateFrom).utcOffset(0, true);

      return {
        lte: endOfDayLessThan.toDate(), // Inclusive
      };
    }
    case "greaterThan": {
      const startOfDayGreaterThan = dayjs(dateFrom).utcOffset(0, true);

      return {
        gte: startOfDayGreaterThan.toDate(), // Inclusive
      };
    }
    case "inRange": {
      if (dateFrom && dateTo) {
        const startOfDateFrom = dayjs(dateFrom).utcOffset(0, true);
        const endOfDateTo = dayjs(dateTo).utcOffset(0, true);

        return {
          gte: startOfDateFrom.toDate(), // Inclusive
          lte: endOfDateTo.toDate(), // Inclusive
        };
      }
      break;
    }
    default:
      throw new Error(`Unsupported date filter type: ${type}`);
  }
};

const buildFilters = async (filterModel, modelName, showFollowed, userId) => {
  const filters = {};

  if (filterModel) {
    for (const [field, condition] of Object.entries(filterModel)) {
      const filterPath = field.split(".");
      let currentFilter = filters;

      let filterCondition;

      if (field === "program.institution.name") {
        // Directly add the program name or institution name filter at the root level
        if (!filters.OR) filters.OR = [];

        filters.OR.push(
          {
            program: {
              name: {
                contains: condition.filter,
                mode: "insensitive",
              },
            },
          },
          {
            program: {
              institution: {
                name: {
                  contains: condition.filter,
                  mode: "insensitive",
                },
              },
            },
          }
        );

        continue; // Skip the rest of the loop for this special case
      }

      const fieldInfo = schemas[modelName]?.[field];

      if (fieldInfo) {
        // Apply the appropriate filter based on the field type
        switch (fieldInfo.type) {
          case "select":
            if (fieldLabelMap[field]) {
              filterCondition = applySelectFilter(field, condition);
            }
            break;
          case "string":
            filterCondition = applyStringFilter(condition);
            break;
          case "number":
            filterCondition = applyNumberFilter(condition);
            break;
          case "boolean":
            filterCondition = applyBooleanFilter(condition);
            break;
          case "date":
            filterCondition = applyDateFilter(condition);
            break;
          default:
            continue; // Skip unrecognized field types
        }
      } else {
        // Default case for nested fields
        filterCondition = {
          contains: condition.filter,
          mode: "insensitive",
        };
      }

      // Apply the filter condition if set
      if (filterCondition) {
        filterPath.forEach((part, index) => {
          if (index === filterPath.length - 1) {
            currentFilter[part] = filterCondition;
          } else {
            currentFilter[part] = currentFilter[part] || {};
            currentFilter = currentFilter[part];
          }
        });
      }
    }
  }

  // Add showFollowed logic
  if (showFollowed && userId) {
    const followedProgramIds = await getFollowedProgramIds(userId);
    if (modelName === "xorY") {
      filters.OR = [
        ...(filters.OR || []), // Ensure existing OR conditions are preserved
        { programXId: { in: followedProgramIds } },
        { programYId: { in: followedProgramIds } },
      ];
    } else {
      filters.programId = { in: followedProgramIds };
    }
  }

  return filters;
};

const buildOrderByClause = (sortModel, modelName) => {
  if (sortModel && sortModel.length > 0) {
    return sortModel.map((sort) => {
      const sortPath = sort.colId.split(".");
      let orderByObject = {};
      let currentLevel = orderByObject;

      sortPath.forEach((part, index) => {
        if (index === sortPath.length - 1) {
          currentLevel[part] = sort.sort;
        } else {
          currentLevel[part] = {};
          currentLevel = currentLevel[part];
        }
      });

      return orderByObject;
    });
  } else if (
    ["interviewInvite", "interviewRejection", "dropped"].includes(modelName)
  ) {
    return [{ date: "desc" }, { createdAt: "desc" }];
  } else if (["cityUserInput"].includes(modelName)) {
    return [{ city: { state: "asc" } }, { city: { name: "asc" } }];
  } else {
    return { createdAt: "desc" };
  }
};

const fetchItemsWithPagination = async (
  modelName,
  filters,
  orderByClause,
  limit,
  offset
) => {
  return prisma[modelName].findMany({
    where: filters,
    include: {
      ...(modelName !== "cityUserInput" &&
        modelName !== "xorY" && {
          program: {
            include: {
              city: true,
              institution: true,
            },
          },
        }),
      ...(modelName === "xorY" && {
        programX: {
          include: {
            institution: true,
          },
        },
        programY: {
          include: {
            institution: true,
          },
        },
      }),
      ...(modelName === "cityUserInput" && {
        city: true,
      }),
      comments: {
        where: {
          parentId: null,
        },
        select: {
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      upvotedUsers: true,
      user: {
        select: {
          id: true,
          alias: true,
        },
      },
    },
    orderBy: orderByClause,
    take: limit,
    skip: offset,
  });
};

const countTotalItems = async (modelName, filters) => {
  return prisma[modelName].count({ where: filters });
};

const rowModel = (modelName) => async (req, res) => {
  try {
    const { startRow, endRow, filterModel, sortModel, showFollowed } = req.body;
    const limit = parseInt(endRow) - parseInt(startRow);
    const offset = parseInt(startRow);

    const filters = await buildFilters(
      filterModel,
      modelName,
      showFollowed,
      req.user?.id
    );
    console.log(filters);
    const orderByClause = buildOrderByClause(sortModel, modelName);
    const items = await fetchItemsWithPagination(
      modelName,
      filters,
      orderByClause,
      limit,
      offset
    );
    const totalItems = await countTotalItems(modelName, filters);

    const processedItems = items.map((item) => {
      if (item.anonymous) {
        item.user = undefined;
      }
      return item;
    });

    res.json({ items: processedItems, lastRow: totalItems });
  } catch (error) {
    handleError(res, error, `Error fetching paginated data for ${modelName}`);
  }
};

export { rowModel };
