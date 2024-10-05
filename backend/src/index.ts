import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import inviteRouter from "./routers/inviteRouter.js";
import programRouter from "./routers/programRouter.js";
import authRouter from "./routers/authRouter.js";
import corsOptions from "./middleware/corsMiddleware.js";
import userRouter from "./routers/userRouter.js";
import cityRouter from "./routers/cityRouter.js";
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
import tierListRouter from "./routers/tierListRouter.js";
import suggestionRouter from "./routers/suggestionRouter.js";
import binRouter from "./routers/binRouter.js";
import commentRouter from "./routers/commentRouter.js";
import fellowshipMatchRouter from "./routers/fellowshipMatchRouter.js";
import xOrYRouter from "./routers/xOrYRouter.js";
import cityUserInputRouter from "./routers/cityUserInputRouter.js";
import { createAllRouters } from "./routers/generateRouters.js";
import removeSensitiveFieldsMiddleware from "./middleware/removeSensitiveFieldsMiddleware.js";
import passport from "passport";
import session from "express-session";
import notificationRouter from "./routers/notificationRouter.js";
import { modelNames } from "./modelNames.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use(removeSensitiveFieldsMiddleware);

app.enable("trust proxy");

app.use(
  session({
    secret: process.env.SECRET_KEY || "your_secret_key", // Use a secure secret in production
    resave: false, // Prevents session from being saved back to the session store if it wasn’t modified
    saveUninitialized: false, // Prevents empty sessions from being saved
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Create routers for all models
const routers = createAllRouters(modelNames);

// Use the generated routers in your Express app
Object.keys(routers).forEach((modelName) => {
  app.use(`/${modelName}`, routers[modelName]);
});

app.use("/user", userRouter);
app.use("/invite", inviteRouter);
app.use("/program", programRouter);
app.use("/auth", authRouter);
app.use("/city", cityRouter);
// app.use("/fame-shame", fameShameRouter);
app.use("/rank-list", rankListRouter);
// app.use("/dropped", droppedRouter);
// app.use("/impression", impressionRouter);
// app.use("/logistics", logisticsRouter);
// app.use("/loi-response", loiResponseRouter);
// app.use("/m4-intern-impression", m4InternImpressionRouter);
// app.use("/malignant", malignantRouter);
// app.use("/post-iv-communication", postIVCommunicationRouter);
// app.use("/question", questionRouter);
// app.use("/rejection", rejectionRouter);
// app.use("/schedule-details", scheduleDetailsRouter);
// app.use("/second-look", secondLookRouter);
// app.use("/withdrawal", withdrawalRouter);
app.use("/tier-list", tierListRouter);
app.use("/suggestion", suggestionRouter);
app.use("/bin", binRouter);
app.use("/comment", commentRouter);
// app.use("/fellowship-match", fellowshipMatchRouter);
app.use("/x-or-y", xOrYRouter);
// app.use("/city-user-input", cityUserInputRouter);
app.use("/notification", notificationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
