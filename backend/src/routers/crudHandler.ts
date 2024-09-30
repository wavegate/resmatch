import { intersectFields, userFields } from "../fields.js";
import prisma from "../prismaClient.js";
import { handleError } from "../utils/errorHandler.js";

export const createCrudHandlers = (modelName) => ({
  //check
  create: async (req, res) => {
    try {
      const userId = req.user.id;
      const { save, ...data } = req.body;

      if (
        ["interviewInvite", "interviewRejection"].includes(modelName) &&
        save
      ) {
        // Find fields that are common between the data and userFields
        const profileFieldsToUpdate = intersectFields(
          Object.keys(data),
          userFields
        );
        const profileData = profileFieldsToUpdate.reduce((obj, key) => {
          if (data[key] !== null) {
            // Skip fields with null values
            obj[key] = data[key];
          }
          return obj;
        }, {});

        // Update the user's profile with the filtered data
        if (Object.keys(profileData).length > 0) {
          await prisma.user.update({
            where: { id: Number(req.user.id) },
            data: profileData,
          });
        }
      }

      // Create the new item in the interviewInvite model, excluding the `save` field
      const newItem = await prisma[modelName].create({
        data: {
          ...data,
          userId: Number(userId), // Ensure the userId is stored as a number
        },
      });

      res.status(201).json(newItem);
    } catch (error) {
      handleError(res, error, `Error creating ${modelName}`);
    }
  },

  getById: async (req, res) => {
    try {
      const item = await prisma[modelName].findUnique({
        where: { id: Number(req.params.id) },
        include: {
          user: true,
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
        },
      });
      if (!item) {
        return res.status(404).json({ error: `${modelName} not found` });
      }
      res.json(item);
    } catch (error) {
      handleError(res, error, `Error fetching ${modelName} details`);
    }
  },

  updateById: async (req, res) => {
    try {
      // Remove the id from the request body if it exists
      const { id, save, ...data } = req.body;

      // Fetch the item to verify ownership
      const item = await prisma[modelName].findUnique({
        where: { id: Number(req.params.id) }, // Assuming `id` is the primary key
        select: { userId: true }, // Adjust based on your model's fields
      });

      if (!item) {
        return res.status(404).json({ error: `${modelName} not found` });
      }

      // Check if the current user is the owner of the item
      if (item.userId !== req.user.id) {
        return res
          .status(403)
          .json({ error: "You do not have permission to update this item" });
      }

      if (modelName === "interviewInvite" && save) {
        // Find fields that are common between the data and userFields
        const profileFieldsToUpdate = intersectFields(
          Object.keys(data),
          userFields
        );
        const profileData = profileFieldsToUpdate.reduce((obj, key) => {
          if (data[key] !== null) {
            // Skip fields with null values
            obj[key] = data[key];
          }
          return obj;
        }, {});

        // Update the user's profile with the filtered data
        if (Object.keys(profileData).length > 0) {
          await prisma.user.update({
            where: { id: Number(req.user.id) },
            data: profileData,
          });
        }
      }

      const updatedItem = await prisma[modelName].update({
        where: { id: Number(req.params.id) }, // Assuming `id` is the primary key
        data: data, // Use the remaining fields from the request body
      });

      res.json(updatedItem);
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: `${modelName} not found` });
      }
      handleError(res, error, `Error updating ${modelName}`);
    }
  },

  upvoteById: async (req, res) => {
    try {
      const { id } = req.params; // Object ID (e.g., interview invite ID)
      const userId = req.user.id; // Get user ID from middleware
      const { isUpvote } = req.body; // Boolean passed from frontend

      // Fetch the item to check if it exists
      const item = await prisma[modelName].findUnique({
        where: { id: Number(id) },
        select: { id: true }, // Fetch only the ID to verify the item exists
      });

      if (!item) {
        return res.status(404).json({ error: `${modelName} not found` });
      }

      let updatedItem;

      if (isUpvote) {
        // User wants to upvote
        updatedItem = await prisma[modelName].update({
          where: { id: Number(id) },
          data: {
            upvotedUsers: {
              connect: { id: userId }, // Add the user to upvotedUsers
            },
          },
        });
      } else {
        // User wants to remove upvote
        updatedItem = await prisma[modelName].update({
          where: { id: Number(id) },
          data: {
            upvotedUsers: {
              disconnect: { id: userId }, // Remove the user from upvotedUsers
            },
          },
        });
      }

      // Return the ID of the object that was upvoted/unvoted
      res.json({ id: updatedItem.id });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: `${modelName} not found` });
      }
      handleError(res, error, `Error updating upvotes for ${modelName}`);
    }
  },

  deleteById: async (req, res) => {
    // Fetch the item to verify ownership
    const item = await prisma[modelName].findUnique({
      where: { id: Number(req.params.id) }, // Assuming `id` is the primary key
      select: { userId: true }, // Adjust based on your model's fields
    });

    if (!item) {
      return res.status(404).json({ error: `${modelName} not found` });
    }

    // Check if the current user is the owner of the item
    if (item.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this item" });
    }
    try {
      await prisma[modelName].delete({
        where: { id: Number(req.params.id) },
      });
      res.json({ message: `${modelName} with ID: ${req.params.id} deleted` });
    } catch (error) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: `${modelName} not found` });
      }
      handleError(res, error, `Error deleting ${modelName}`);
    }
  },

  listWithPagination: async (req, res) => {
    try {
      const {
        pageNum = 1,
        pageSize = 1000,
        programId,
        userId,
        startDate,
        endDate,
        ...extraConditions
      } = req.body;
      const offset = (pageNum - 1) * pageSize;

      // Constructing the where clause dynamically
      const whereClause = {};

      if (programId && modelName !== "cityUserInput") {
        whereClause.programId = Number(programId); // Ensure programId is a number
      }

      if (userId) {
        whereClause.userId = Number(userId); // Ensure userId is a number
      }

      if (startDate || endDate) {
        whereClause.date = {};
        if (startDate) {
          whereClause.date.gte = new Date(startDate);
        }
        if (endDate) {
          whereClause.date.lte = new Date(endDate);
        }
      }

      // Add extra conditions to the where clause
      Object.keys(extraConditions).forEach((key) => {
        const value = extraConditions[key];
        if (value !== undefined && value !== null) {
          whereClause[key] = value;
        }
      });

      const totalCount = await prisma[modelName].count({
        where: whereClause,
      });

      // Determine the orderBy clause based on the modelName
      let orderByClause;
      if (
        ["interviewInvite", "interviewRejection", "dropped"].includes(modelName)
      ) {
        orderByClause = [{ date: "desc" }, { createdAt: "desc" }]; // Sort by date descending
      } else {
        orderByClause = { createdAt: "desc" }; // Sort by createdAt descending
      }
      if (["cityUserInput"].includes(modelName)) {
        orderByClause = [{ city: { state: "asc" } }, { city: { name: "asc" } }];
      }

      const items = await prisma[modelName].findMany({
        skip: offset,
        take: pageSize,
        where: whereClause,
        include: {
          ...(modelName !== "cityUserInput" &&
            modelName !== "xorY" && {
              program: {
                include: {
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
          comments: true,
          user: {
            select: {
              id: true,
              alias: true,
            },
          },
        },
        orderBy: orderByClause,
      });

      const processedItems = items.map((item) => {
        if (item.anonymous) {
          item.user = undefined; // Remove user data if anonymous
        }
        return item;
      });

      res.json({ items: processedItems, totalCount });
    } catch (error) {
      handleError(res, error, `Error fetching ${modelName}`);
    }
  },

  listAll: async (req, res) => {
    try {
      // Determine the orderBy clause based on the modelName
      let orderByClause;
      if (
        ["interviewInvite", "interviewRejection", "dropped"].includes(modelName)
      ) {
        orderByClause = [{ date: "desc" }, { createdAt: "desc" }]; // Sort by date descending
      } else {
        orderByClause = { createdAt: "desc" }; // Sort by createdAt descending
      }
      if (["cityUserInput"].includes(modelName)) {
        orderByClause = [{ city: { state: "asc" } }, { city: { name: "asc" } }];
      }

      // Fetch all items from the model without any filters or pagination
      const items = await prisma[modelName].findMany({
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
      });

      // Process the items to remove user data if anonymous
      const processedItems = items.map((item) => {
        if (item.anonymous) {
          item.user = undefined; // Remove user data if anonymous
        }
        return item;
      });

      // Return all items without pagination
      res.json({ items: processedItems });
    } catch (error) {
      handleError(res, error, `Error fetching all data for ${modelName}`);
    }
  },
});
