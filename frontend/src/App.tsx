import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home/Home";
import { MainLayout } from "./layouts/MainLayout";
import History from "./pages/History/History";

function App() {
  return (
    <QueryProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="*" element={<Navigate to="/" />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryProvider>
  );
}

export default App;
