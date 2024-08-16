import prisma from "../prismaClient.js";
import { handleError } from "../utils/errorHandler.js";

export const createCrudHandlers = (modelName) => ({
  //check
  create: async (req, res) => {
    try {
      const userId = req.user.id;
      const newItem = await prisma[modelName].create({
        data: {
          ...req.body,
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
          program: {
            include: { institution: true },
          },
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
      const { id, ...data } = req.body;

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

  deleteById: async (req, res) => {
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
        pageSize = 10,
        programId,
        userId,
        ...extraConditions
      } = req.body;
      const offset = (pageNum - 1) * pageSize;

      // Constructing the where clause dynamically
      const whereClause = {};

      if (programId) {
        whereClause.programId = Number(programId); // Ensure programId is a number
      }

      if (userId) {
        whereClause.userId = Number(userId); // Ensure userId is a number
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

      const items = await prisma[modelName].findMany({
        skip: offset,
        take: pageSize,
        where: whereClause,
        include: {
          program: {
            include: {
              institution: true,
            },
          },
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
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
});
