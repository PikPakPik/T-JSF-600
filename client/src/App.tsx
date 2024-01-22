import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "./components/shared/theme-provider";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { Login } from "./pages/Profile/Login";
import { Signup } from "./pages/Profile/Signup";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
