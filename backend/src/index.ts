import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import inviteRouter from "./routers/inviteRouter.js";
import programRouter from "./routers/programRouter.js";
import authRouter from "./routers/authRouter.js";
import corsOptions from "./middleware/corsMiddleware.js";
import userRouter from "./routers/userRouter.js";
import cityRouter from "./routers/cityRouter.js";
import threadRouter from "./routers/threadRouter.js";
import replyRouter from "./routers/replyRouter.js";
import fameShameRouter from "./routers/fameShameRouter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/user", userRouter);
app.use("/invite", inviteRouter);
app.use("/program", programRouter);
app.use("/auth", authRouter);
app.use("/city", cityRouter);
app.use("/thread", threadRouter);
app.use("/reply", replyRouter);
app.use("/fame-shame", fameShameRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
