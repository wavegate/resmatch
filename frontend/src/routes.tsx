import AddInvite from "@/pages/AddInvite.tsx/AddInvite";
import HomePage from "@/pages/HomePage";
import Invites from "@/pages/Invites/Invites";
import Login from "@/pages/Login/Login";
import Programs from "@/pages/Programs/Programs";
import RootLayout from "@/pages/RootLayout/RootLayout";
import SignUp from "@/pages/SignUp/SignUp";

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
        path: "invites",
        element: <Invites />,
      },
      {
        path: "invites/add",
        element: <AddInvite />,
      },
      {
        path: "programs",
        element: <Programs />,
      },
    ],
  },
];

export default routes;
