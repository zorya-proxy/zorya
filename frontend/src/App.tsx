import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home/Home";
import { MainLayout } from "./layouts/MainLayout";
import History from "./pages/History/History";
import { Toaster } from "./components/ui/sonner";
import Playground from "./pages/Playground/Playground";

function App() {
  return (
    <QueryProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Playground />} />
              <Route path="/home" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="*" element={<Navigate to="/" />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster richColors />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryProvider>
  );
}

export default App;
