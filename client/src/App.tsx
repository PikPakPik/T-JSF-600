import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Chat } from "./components/ChatLayout";
import Layout from "./components/Layout";
import { DiscussionChat } from "./components/chat/DiscussionChat";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/theme-provider";
import { useAuth } from "./hooks/useAuth";
import { HomeChat } from "./pages/Chat/HomeChat";
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
                <Route
                  path="/chat"
                  element={
                    <PrivateRoute
                      element={<Chat />}
                      fallback={<Navigate to="/" />}
                    />
                  }
                >
                  <Route index element={<HomeChat />} />
                  <Route path=":roomId" element={<DiscussionChat />} />
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
