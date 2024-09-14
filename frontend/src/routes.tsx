import { lazy, Suspense } from "react";
import RootLayout from "@/components/RootLayout/RootLayout";
import { modelNames } from "./services/services";

const Login = lazy(() => import("@/pages/Login/Login"));
const SignUp = lazy(() => import("@/pages/SignUp/SignUp"));
const ConfirmEmail = lazy(() => import("@/pages/ConfirmEmail/ConfirmEmail"));
const Chat = lazy(() => import("@/pages/listPages/Chat/Chat"));
const Program = lazy(() => import("@/pages/listPages/Program/Program"));
const RankTally = lazy(() => import("@/pages/RankTally/RankTally"));
const PSTP = lazy(() => import("@/pages/listPages/PSTP/PSTP"));
const TierList = lazy(() => import("@/pages/TierList/TierList"));
const IMGTierList = lazy(() => import("@/pages/IMGTierList/IMGTierList"));
const ModReport = lazy(() => import("@/pages/listPages/ModReport/ModReport"));
const Profile = lazy(() => import("@/pages/Profile/Profile"));
const AddUser = lazy(() => import("@/pages/updatePages/AddUser/AddUser"));
const AddChat = lazy(() => import("@/pages/updatePages/AddChat/AddChat"));
const USApplicant = lazy(
  () => import("@/pages/listPages/USApplicant/USApplicant")
);
const IMGApplicant = lazy(
  () => import("@/pages/listPages/IMGApplicant/IMGApplicant")
);
const AddRankList = lazy(
  () => import("@/pages/updatePages/AddRankList/AddRankList")
);
const RankListMD = lazy(
  () => import("@/pages/listPages/RankListMD/RankListMD")
);
const RankListDO = lazy(
  () => import("@/pages/listPages/RankListDO/RankListDO")
);
const RankListIMG = lazy(
  () => import("@/pages/listPages/RankListIMG/RankListIMG")
);
const AddPage = lazy(() => import("@/pages/updatePages/AddPage"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Page404 = lazy(() => import("@/pages/Page404"));
const LoginSuccess = lazy(() => import("@/pages/LoginSuccess"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const ToS = lazy(() => import("@/pages/ToS"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const ListPage = lazy(() => import("@/pages/listPages/ListPage"));

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "sign-up",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "login-success",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginSuccess />
          </Suspense>
        ),
      },
      {
        path: "privacy-policy",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: "terms-of-service",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ToS />
          </Suspense>
        ),
      },
      {
        path: "program",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Program />
          </Suspense>
        ),
      },
      {
        path: "applicant-us",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <USApplicant />
          </Suspense>
        ),
      },
      {
        path: "applicant-img",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <IMGApplicant />
          </Suspense>
        ),
      },
      {
        path: "confirm-email",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ConfirmEmail />
          </Suspense>
        ),
      },
      {
        path: "main",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Chat />
          </Suspense>
        ),
      },
      {
        path: "rank-list-md",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RankListMD />
          </Suspense>
        ),
      },
      {
        path: "rank-list-md/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddRankList type="MD" />
          </Suspense>
        ),
      },
      {
        path: "rank-list-md/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddRankList type="MD" />
          </Suspense>
        ),
      },
      {
        path: "rank-list-do",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RankListDO />
          </Suspense>
        ),
      },
      {
        path: "rank-list-do/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddRankList type="DO" />
          </Suspense>
        ),
      },
      {
        path: "rank-list-do/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddRankList type="DO" />
          </Suspense>
        ),
      },
      {
        path: "rank-list-img",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RankListIMG />
          </Suspense>
        ),
      },
      {
        path: "rank-list-img/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddRankList type="IMG" />
          </Suspense>
        ),
      },
      {
        path: "rank-list-img/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddRankList type="IMG" />
          </Suspense>
        ),
      },
      ...modelNames
        .map((modelName) => {
          return [
            {
              path: modelName,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ListPage modelName={modelName} key={modelName} />
                </Suspense>
              ),
            },
            {
              path: `${modelName}/add`,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <AddPage modelName={modelName} key={modelName} />
                </Suspense>
              ),
            },
            {
              path: `${modelName}/:id`,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <AddPage modelName={modelName} key={modelName} />
                </Suspense>
              ),
            },
          ];
        })
        .flat(),
      {
        path: "rank-tally",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RankTally />
          </Suspense>
        ),
      },
      {
        path: "pstp",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PSTP />
          </Suspense>
        ),
      },
      {
        path: "tier-list",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TierList />
          </Suspense>
        ),
      },
      {
        path: "tier-list-img",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <IMGTierList />
          </Suspense>
        ),
      },
      {
        path: "report",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ModReport />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "user/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "user/add/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddUser />
          </Suspense>
        ),
      },
      {
        path: "chat/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddChat type="main" />
          </Suspense>
        ),
      },
      {
        path: "pstp/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddChat type="pstp" />
          </Suspense>
        ),
      },
      {
        path: "report/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddChat type="report" />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Page404 />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
