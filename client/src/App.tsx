import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/theme-provider";
import { useAuth } from "./hooks/useAuth";
import { Chat } from "./pages/Chat/Chat";
import Home from "./pages/Home";
import { Login } from "./pages/Profile/Login";
import { Signup } from "./pages/Profile/Signup";

const App = () => {
  const PrivateRoute = ({
    element: element,
    fallback: fallback,
  }: {
    element: React.ReactNode;
    fallback: React.ReactNode;
  }) => {
    const { user } = useAuth();
    return user ? element : fallback;
  };

  const GuestRoute = ({
    element: element,
    fallback: fallback,
  }: {
    element: React.ReactNode;
    fallback: React.ReactNode;
  }) => {
    const { user } = useAuth();
    console.log("user", user);
    return !user ? element : fallback;
  };

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <GuestRoute
                      element={<Home />}
                      fallback={<Navigate to="/chat" />}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <GuestRoute
                      element={<Login />}
                      fallback={<Navigate to="/chat" />}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <GuestRoute
                      element={<Signup />}
                      fallback={<Navigate to="/chat" />}
                    />
                  }
                />
                <Route path="/chat">
                  <Route index element={<Chat />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
