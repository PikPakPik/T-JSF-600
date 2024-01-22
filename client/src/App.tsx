import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/shared/theme-provider";
import Home from "./pages/Home";
import Layout from "./components/Layout";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
