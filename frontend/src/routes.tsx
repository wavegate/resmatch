import HomePage from "@/pages/HomePage";
import Invites from "@/pages/Invites/Invites";
import Login from "@/pages/Login/Login";
import Programs from "@/pages/Programs/Programs";
import RootLayout from "@/pages/RootLayout/RootLayout";
import SignUp from "@/pages/SignUp/SignUp";
import Users from "@/pages/Users/Users";
import Cities from "@/pages/Cities/Cities";
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import Chat from "@/pages/Chat/Chat";
import FameShame from "@/pages/FameShame/FameShame";
import RankLists from "./pages/RankLists/RankLists";
import AddInvite from "./pages/updatePages/AddInvite/AddInvite";
import AddProgram from "./pages/updatePages/AddProgram/AddProgram";
import AddUser from "./pages/updatePages/AddUser/AddUser";
import AddFameShamePage from "./pages/updatePages/AddFameShame/AddFameShame";
import AddRankList from "./pages/updatePages/AddRankList/AddRankList";

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
        path: "iv-offers",
        element: <Invites />,
      },
      {
        path: "invite/add",
        element: <AddInvite />,
      },
      {
        path: "program",
        element: <Programs />,
      },
      {
        path: "program/:id",
        element: <AddProgram />,
      },
      {
        path: "applicant-data",
        element: <Users />,
      },
      {
        path: "user/:id",
        element: <AddUser />,
      },
      {
        path: "city",
        element: <Cities />,
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
        path: "fame-shame/add",
        element: <AddFameShamePage />,
      },
      {
        path: "rank-list",
        element: <RankLists />,
      },
      {
        path: "rank-list/add",
        element: <AddRankList />,
      },
    ],
  },
];

export default routes;
