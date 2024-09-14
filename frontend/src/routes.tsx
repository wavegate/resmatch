import Login from "@/pages/Login/Login";
import RootLayout from "@/components/RootLayout/RootLayout";
import SignUp from "@/pages/SignUp/SignUp";
import ConfirmEmail from "@/pages/ConfirmEmail/ConfirmEmail";
import Chat from "@/pages/listPages/Chat/Chat";
import Program from "@/pages/listPages/Program/Program";
import PostIVCommunication from "./pages/listPages/PostIVCommunication/PostIVCommunication";
import RankTally from "./pages/RankTally/RankTally";
import PSTP from "./pages/listPages/PSTP/PSTP";
import TierList from "./pages/TierList/TierList";
import IMGTierList from "./pages/IMGTierList/IMGTierList";
import ModReport from "./pages/listPages/ModReport/ModReport";
import Profile from "./pages/Profile/Profile";
import AddUser from "./pages/updatePages/AddUser/AddUser";
import AddChat from "./pages/updatePages/AddChat/AddChat";
import AddPostIVCommunication from "./pages/updatePages/AddPostIVCommunication/AddPostIVCommunication";
import USApplicant from "./pages/listPages/USApplicant/USApplicant";
import IMGApplicant from "./pages/listPages/IMGApplicant/IMGApplicant";
import AddRankList from "./pages/updatePages/AddRankList/AddRankList";
import RankListMD from "./pages/listPages/RankListMD/RankListMD";
import RankListDO from "./pages/listPages/RankListDO/RankListDO";
import RankListIMG from "./pages/listPages/RankListIMG/RankListIMG";
import AddCityUserInput from "./pages/updatePages/AddCityUserInput/AddCityUserInput";
import AddPage from "./pages/updatePages/AddPage";
import ListPage from "./pages/listPages/ListPage";
import { modelNames } from "./services/services";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Page404 from "./pages/Page404";
import LoginSuccess from "./pages/LoginSuccess";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ToS from "./pages/ToS";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("@/pages/HomePage"));

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login-success",
        element: <LoginSuccess />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-of-service",
        element: <ToS />,
      },
      {
        path: "program",
        element: <Program />,
      },
      {
        path: "applicant-us",
        element: <USApplicant />,
      },
      {
        path: "applicant-img",
        element: <IMGApplicant />,
      },
      {
        path: "confirm-email",
        element: <ConfirmEmail />,
      },
      {
        path: "main",
        element: <Chat />,
      },

      {
        path: "rank-list-md",
        element: <RankListMD />,
      },
      {
        path: "rank-list-md/add",
        element: <AddRankList type="MD" />,
      },
      {
        path: "rank-list-md/:id",
        element: <AddRankList type="MD" />,
      },
      {
        path: "rank-list-do",
        element: <RankListDO />,
      },
      {
        path: "rank-list-do/add",
        element: <AddRankList type="DO" />,
      },
      {
        path: "rank-list-do/:id",
        element: <AddRankList type="DO" />,
      },
      {
        path: "rank-list-img",
        element: <RankListIMG />,
      },
      {
        path: "rank-list-img/add",
        element: <AddRankList type="IMG" />,
      },
      {
        path: "rank-list-img/:id",
        element: <AddRankList type="IMG" />,
      },
      ...modelNames
        .map((modelName) => {
          return [
            {
              path: modelName,
              element: <ListPage modelName={modelName} key={modelName} />,
            },
            {
              path: `${modelName}/add`,
              element: <AddPage modelName={modelName} key={modelName} />,
            },
            {
              path: `${modelName}/:id`,
              element: <AddPage modelName={modelName} key={modelName} />,
            },
          ];
        })
        .flat(),

      {
        path: "post-iv-communication",
        element: <PostIVCommunication />,
      },
      {
        path: "post-iv-communication/add",
        element: <AddPostIVCommunication />,
      },
      {
        path: "post-iv-communication/:id",
        element: <AddPostIVCommunication />,
      },

      {
        path: "rank-tally",
        element: <RankTally />,
      },
      {
        path: "rank-tally",
        element: <RankTally />,
      },

      {
        path: "pstp",
        element: <PSTP />,
      },
      {
        path: "tier-list",
        element: <TierList />,
      },
      {
        path: "tier-list-img",
        element: <IMGTierList />,
      },
      {
        path: "report",
        element: <ModReport />,
      },

      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "user/:id",
        element: <Profile />,
      },
      {
        path: "user/add/:id",
        element: <AddUser />,
      },
      {
        path: "chat/add",
        element: <AddChat type="main" />,
      },
      {
        path: "pstp/add",
        element: <AddChat type="pstp" />,
      },
      {
        path: "report/add",
        element: <AddChat type="report" />,
      },
      {
        path: "city-user-input/add",
        element: <AddCityUserInput />,
      },

      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
];

export default routes;
