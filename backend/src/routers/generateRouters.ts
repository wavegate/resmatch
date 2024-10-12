import { createCrudHandlers } from "./crudHandler.js";
import express from "express";
import {
  optionalVerifyToken,
  verifyToken,
} from "../middleware/authMiddleware.js";

function createModelRouter(modelName) {
  const router = express.Router();

  const {
    create,
    getById,
    updateById,
    upvoteById,
    deleteById,
    listWithPagination,
    listAll,
    rowModel,
  } = createCrudHandlers(modelName);

  router.post("/", verifyToken, create);
  router.get("/all", listAll);
  router.get("/:id", getById);
  router.put("/:id", verifyToken, updateById);
  router.put("/upvote/:id", verifyToken, upvoteById);
  router.delete("/:id", verifyToken, deleteById);
  router.post("/search", listWithPagination);
  router.post("/rowModel", optionalVerifyToken, rowModel);

  return router;
}

export function createAllRouters(modelNames) {
  const routers = {};

  modelNames.forEach((modelName) => {
    routers[modelName] = createModelRouter(modelName);
  });

  return routers;
}
