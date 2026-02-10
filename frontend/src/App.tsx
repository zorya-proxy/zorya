import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home/Home";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <QueryProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryProvider>
  );
}

export default App;
