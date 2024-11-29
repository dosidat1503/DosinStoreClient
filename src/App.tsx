import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";
import CssBaseline from "@mui/material/CssBaseline";

import { ThemeProvider } from "@mui/material/styles";
import MUItheme from "./configs/MUI-theme";
import { queryClient } from "./configs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRoutes } from "./routes";
import { App as AntdApp, ConfigProvider, Skeleton } from "antd";
import { ANTDtheme } from "./configs";
import { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Skeleton />}>
        <ThemeProvider theme={MUItheme}>
          <CssBaseline />
          <ConfigProvider theme={ANTDtheme}>
            <AntdApp>
              <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                  <AppRoutes />
                  <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
                </QueryClientProvider>
              </Provider>
            </AntdApp>
          </ConfigProvider>
        </ThemeProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
