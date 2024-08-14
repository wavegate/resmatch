import { createCrudHandlers } from "./crudHandler.js";
import express from "express";
import prisma from "../prismaClient.js";
import { verifyToken } from "../middleware/authMiddleware.js";

function createModelRouter(modelName) {
  const router = express.Router();

  const { create, getById, updateById, deleteById, listWithPagination } =
    createCrudHandlers(modelName);

  router.post("/", verifyToken, create);
  router.get("/:id", getById);
  router.put("/:id", verifyToken, updateById);
  router.delete("/:id", verifyToken, deleteById);
  router.post("/search", listWithPagination);

  return router;
}

export function createAllRouters(modelNames) {
  const routers = {};

  modelNames.forEach((modelName) => {
    routers[modelName] = createModelRouter(modelName);
  });

  return routers;
}
