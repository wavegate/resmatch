import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login/Login";
import RootLayout from "@/components/RootLayout/RootLayout";
import SignUp from "@/pages/SignUp/SignUp";
import ConfirmEmail from "@/pages/ConfirmEmail/ConfirmEmail";
import Chat from "@/pages/listPages/Chat/Chat";
import FameShame from "@/pages/listPages/FameShame/FameShame";
import RankLists from "@/pages/listPages/RankList/RankList";
import AddInvite from "@/pages/updatePages/AddInvite/AddInvite";
import AddProgram from "@/pages/updatePages/AddProgram/AddProgram";
import AddUser from "@/pages/updatePages/AddUser/AddUser";
import AddFameShamePage from "@/pages/updatePages/AddFameShame/AddFameShame";
import AddRankList from "@/pages/updatePages/AddRankList/AddRankList";
import Invite from "@/pages/listPages/Invite/Invite";
import Program from "@/pages/listPages/Program/Program";
import User from "@/pages/listPages/User/User";
import City from "@/pages/listPages/City/City";

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
        path: "invite/:id",
        element: <AddInvite />,
      },
      {
        path: "program",
        element: <Program />,
      },
      {
        path: "program/:id",
        element: <AddProgram />,
      },
      {
        path: "applicant-data",
        element: <User />,
      },
      {
        path: "user/:id",
        element: <AddUser />,
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
