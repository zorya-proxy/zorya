import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { QueryProvider } from "./providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <QueryProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AppProvider>
    </QueryProvider>
  );
}

export default App;
