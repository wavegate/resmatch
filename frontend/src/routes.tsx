import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login/Login";
import RootLayout from "@/components/RootLayout/RootLayout";
import SignUp from "@/pages/SignUp/SignUp";
import ConfirmEmail from "@/pages/ConfirmEmail/ConfirmEmail";
import Chat from "@/pages/listPages/Chat/Chat";
import FameShame from "@/pages/listPages/FameShame/FameShame";
import Invite from "@/pages/listPages/Invite/Invite";
import Program from "@/pages/listPages/Program/Program";
import User from "@/pages/listPages/User/User";
import City from "@/pages/listPages/City/City";
import Dropped from "./pages/listPages/Dropped/Dropped";
import Impression from "./pages/listPages/Impression/Impression";
import Logistics from "./pages/listPages/Logistics/Logistics";
import LOIResponse from "./pages/listPages/LOInterestResponse/LOInterestResponse";
import Rejection from "./pages/listPages/Rejection/Rejection";
import M4InternImpression from "./pages/listPages/M4InternImpression/M4InternImpression";
import PostIVCommunication from "./pages/listPages/PostIVCommunication/PostIVCommunication";
import Question from "./pages/listPages/Question/Question";
import ScheduleDetails from "./pages/listPages/ScheduleDetails/ScheduleDetails";
import SecondLook from "./pages/listPages/SecondLook/SecondLook";
import Withdrawal from "./pages/listPages/Withdrawal/Withdrawal";
import Malignant from "./pages/listPages/Malignant/Malignant";
import RankTally from "./pages/RankTally/RankTally";
import FellowshipMatch from "./pages/listPages/FellowshipMatch/FellowshipMatch";
import PSTP from "./pages/listPages/PSTP/PSTP";
import TierList from "./pages/TierList/TierList";
import IMGTierList from "./pages/IMGTierList/IMGTierList";
import RankList from "@/pages/listPages/RankList/RankList";
import XorY from "./pages/listPages/XorY/XorY";
import AddInvite from "./pages/updatePages/AddInvite/AddInvite";
import ModReport from "./pages/listPages/ModReport/ModReport";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import AddUser from "./pages/updatePages/AddUser/AddUser";
import AddChat from "./pages/updatePages/AddChat/AddChat";
import UserProfile from "./pages/UserProfile/UserProfile";
import AddRejection from "./pages/updatePages/AddRejection/AddRejection";
import AddDropped from "./pages/updatePages/AddDropped/AddDropped";
import AddLogistics from "./pages/updatePages/AddLogistics/AddLogistics";
import AddQuestion from "./pages/updatePages/AddQuestion/AddQuestion";
import AddImpression from "./pages/updatePages/AddImpression/AddImpression";
import AddLOIResponse from "./pages/updatePages/AddLOInterestResponse/AddLOInterestResponse";
import AddLOInterestResponse from "./pages/updatePages/AddLOInterestResponse/AddLOInterestResponse";
import LOInterestResponse from "./pages/listPages/LOInterestResponse/LOInterestResponse";
import LOIntentResponse from "./pages/listPages/LOIntentResponse/LOIntentResponse";
import AddLOIntentResponse from "./pages/updatePages/AddLOIntentResponse/AddLOIntentResponse";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "invite",
        element: <Invite />,
      },
      {
        path: "invite/add",
        element: <AddInvite />,
      },
      {
        path: "invite/:id",
        element: <AddInvite />,
      },
      {
        path: "program",
        element: <Program />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "img-user",
        element: <User />,
      },
      {
        path: "city",
        element: <City />,
      },
      {
        path: "confirm-email",
        element: <ConfirmEmail />,
      },
      {
        path: "main-chat",
        element: <Chat />,
      },
      {
        path: "fame-shame",
        element: <FameShame />,
      },
      {
        path: "rank-list",
        element: <RankList />,
      },
      {
        path: "rank-list-img",
        element: <RankList />,
      },
      {
        path: "rank-list-do",
        element: <RankList />,
      },
      {
        path: "dropped",
        element: <Dropped />,
      },
      {
        path: "dropped/add",
        element: <AddDropped />,
      },
      {
        path: "dropped/:id",
        element: <AddDropped />,
      },
      {
        path: "impression",
        element: <Impression />,
      },
      {
        path: "impression/add",
        element: <AddImpression />,
      },
      {
        path: "impression/:id",
        element: <AddImpression />,
      },
      {
        path: "logistics",
        element: <Logistics />,
      },
      {
        path: "logistics/add",
        element: <AddLogistics />,
      },
      {
        path: "logistics/:id",
        element: <AddLogistics />,
      },
      {
        path: "lointerest-response",
        element: <LOInterestResponse />,
      },
      {
        path: "lointerest-response/add",
        element: <AddLOInterestResponse />,
      },
      {
        path: "lointerest-response/:id",
        element: <AddLOInterestResponse />,
      },
      {
        path: "lointent-response",
        element: <LOIntentResponse />,
      },
      {
        path: "lointent-response/add",
        element: <AddLOIntentResponse />,
      },
      {
        path: "lointent-response/:id",
        element: <AddLOIntentResponse />,
      },
      {
        path: "m4-intern-impression",
        element: <M4InternImpression />,
      },
      {
        path: "malignant",
        element: <Malignant />,
      },
      {
        path: "post-iv-communication",
        element: <PostIVCommunication />,
      },
      {
        path: "question",
        element: <Question />,
      },
      {
        path: "question/add",
        element: <AddQuestion />,
      },
      {
        path: "question/:id",
        element: <AddQuestion />,
      },
      {
        path: "rejection",
        element: <Rejection />,
      },
      {
        path: "rejection/add",
        element: <AddRejection />,
      },
      {
        path: "rejection/:id",
        element: <AddRejection />,
      },
      {
        path: "schedule-details",
        element: <ScheduleDetails />,
      },
      {
        path: "second-look",
        element: <SecondLook />,
      },
      {
        path: "withdrawal",
        element: <Withdrawal />,
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
        path: "fellowship-match",
        element: <FellowshipMatch />,
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
        path: "mod-report",
        element: <ModReport />,
      },
      {
        path: "x-or-y",
        element: <XorY />,
      },
      {
        path: "x-or-y-img",
        element: <XorY />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "user/:id",
        element: <UserProfile />,
      },
      {
        path: "user/add/:id",
        element: <AddUser />,
      },
      {
        path: "chat/add",
        element: <AddChat />,
      },
    ],
  },
];

export default routes;
