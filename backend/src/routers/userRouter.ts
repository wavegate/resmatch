import express from "express";

const userRouter = express.Router();

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User details for ID: ${id}`);
});

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} updated`);
});

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User with ID: ${id} deleted`);
});

userRouter.post("/search", (req, res) => {
  const { search } = req.body;
  res.send(`Search results for users with query: ${search}`);
});

export default userRouter;
