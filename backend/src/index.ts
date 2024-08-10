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
import rankListRouter from "./routers/rankListRouter.js";
import droppedRouter from "./routers/droppedRouter.js";
import impressionRouter from "./routers/impressionRouter.js";
import logisticsRouter from "./routers/logisticsRouter.js";
import m4InternImpressionRouter from "./routers/m4InternImpressionRouter.js";
import malignantRouter from "./routers/malignantRouter.js";
import postIVCommunicationRouter from "./routers/postIVCommunicationRouter.js";
import questionRouter from "./routers/questionRouter.js";
import rejectionRouter from "./routers/rejectionRouter.js";
import scheduleDetailsRouter from "./routers/scheduleDetailsRouter.js";
import secondLookRouter from "./routers/secondLookRouter.js";
import withdrawalRouter from "./routers/withdrawalRouter.js";
import loiResponseRouter from "./routers/loiResponseRouter.js";

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
app.use("/rank-list", rankListRouter);
app.use("/dropped", droppedRouter);
app.use("/impression", impressionRouter);
app.use("/logistics", logisticsRouter);
app.use("/loi-response", loiResponseRouter);
app.use("/m4-intern-impression", m4InternImpressionRouter);
app.use("/malignant", malignantRouter);
app.use("/post-iv-communication", postIVCommunicationRouter);
app.use("/question", questionRouter);
app.use("/rejection", rejectionRouter);
app.use("/schedule-details", scheduleDetailsRouter);
app.use("/second-look", secondLookRouter);
app.use("/withdrawal", withdrawalRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
