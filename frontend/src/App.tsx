import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";

import routes from "@/routes";

const queryClient = new QueryClient();

const router = createBrowserRouter(routes);

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
