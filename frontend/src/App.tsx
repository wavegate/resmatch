import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/RootLayout/RootLayout";
import HomePage from "@/pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/SignUp";
import Programs from "@/pages/Programs/Programs";
import { Notifications } from "@mantine/notifications";
import Invites from "@/pages/Invites/Invites";
import AddInvite from "./pages/AddInvite.tsx/AddInvite";

const queryClient = new QueryClient();

const router = createBrowserRouter([
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
]);

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications position="top-center" zIndex={1000} />
        <RouterProvider router={router}></RouterProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
