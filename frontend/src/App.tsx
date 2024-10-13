import "./App.scss";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.layer.css";
// import "mantine-datatable/styles.layer.css";
// import "./layout.css";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import routes from "@/routes";
import { DatesProvider } from "@mantine/dates";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  },
});

const router = createBrowserRouter(routes);

const theme = createTheme({
  fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
});

dayjs.extend(utc);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <DatesProvider settings={{ timezone: "UTC" }}>
          <Notifications position="bottom-right" zIndex={1001} />
          <ModalsProvider>
            <RouterProvider router={router}></RouterProvider>
          </ModalsProvider>
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
