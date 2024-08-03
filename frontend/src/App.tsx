import { useEffect } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@/pages/RootLayout/RootLayout";
import HomePage from "@/pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "@/pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const localBackend = "http://localhost:3000/";
const prodBackend = "https://powerful-falls-38746-ef92b126204d.herokuapp.com/";

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
        path: "interview-invites",
        element: <HomePage />,
      },
      {
        path: "programs",
        element: <HomePage />,
      },
    ],
  },
]);

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
});

function App() {
  useEffect(() => {
    fetch(prodBackend + "first-user")
      .then((res) => res.json())
      .then(console.log);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
