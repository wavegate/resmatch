import { createCrudHandlers } from "./crudHandler.js";
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
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
  router.get("/all", optionalVerifyToken, listAll);
  router.get("/:id", optionalVerifyToken, getById);
  router.put("/:id", verifyToken, updateById);
  router.put("/upvote/:id", verifyToken, upvoteById);
  router.delete("/:id", verifyToken, deleteById);
  router.post("/search", listWithPagination);
  if (modelName === "interviewInvite") {
    router.post("/rowModel", optionalVerifyToken, rowModel);
  }

  return router;
}

export function createAllRouters(modelNames) {
  const routers = {};

  modelNames.forEach((modelName) => {
    routers[modelName] = createModelRouter(modelName);
  });

  return routers;
}
