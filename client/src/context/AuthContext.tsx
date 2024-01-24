import LoadingPage from "@/components/shared/LoadingPage";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Constantes pour les URLs et les clés
const API_URL = "http://localhost:3000/api";
const TOKEN_KEY = "token";

interface User {
  _id: number;
  username: string;
  email: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (params: unknown, errorCallback: (error: Error) => void) => void;
  logout: () => void;
  signup: (params: unknown, errorCallback: (error: Error) => void) => void;
}

const defaultProvider: AuthContextProps = {
  user: null,
  setUser: () => null,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signup: () => Promise.resolve(),
};

const AuthContext = createContext<AuthContextProps>(defaultProvider);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultProvider.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      // Utilisation de la constante pour le TOKEN_KEY et la méthode getItem pour récupérer le token
      const storedToken = window.localStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        try {
          // Utilisation de la constante pour API_URL et la méthode fetch pour récupérer les données
          const response = await fetch(`${API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
          } else {
            console.error(`Server responded with status: ${response.status}`);
            if (response.status === 401) {
              window.localStorage.removeItem(TOKEN_KEY);
              window.location.href = "/login";
            }
          }
        } catch (err) {
          window.localStorage.removeItem(TOKEN_KEY);
          window.location.href = "/login";
          console.error(err);
        }
      }
      // Une fois l'authentification vérifiée, mettez à jour l'état de chargement
      setLoading(false);
    };

    initAuth();
  }, []);

  // Fonction pour gérer l'authentification
  const handleLogin = (
    params: unknown,
    errorCallback: (error: Error) => void
  ) => {
    // Utilisation de la constante pour API_URL et la méthode fetch pour envoyer les données
    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 401) {
            return Promise.reject(
              new Error("Identifiant ou mot de passe incorrect")
            );
          }
        }
      })
      .then((data) => {
        // Utilisation de la constante pour le TOKEN_KEY et la méthode setItem pour stocker le token
        window.localStorage.setItem(TOKEN_KEY, data.token);
        fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.data);
            navigate("/");
          });
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleSignup = (
    params: unknown,
    errorCallback: (error: Error) => void
  ) => {
    // Utilisation de la constante pour API_URL et la méthode fetch pour envoyer les données
    fetch(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login");
          return res.json();
        } else {
          if (res.status === 401) {
            return Promise.reject(
              new Error("Identifiant ou mot de passe incorrect")
            );
          }
        }
      })
      .then((data) => {
        // Utilisation de la constante pour le TOKEN_KEY et la méthode setItem pour stocker le token
        window.localStorage.setItem(TOKEN_KEY, data.token);
        fetch(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.data);
            navigate("/");
          });
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    setUser(null);
    // Utilisation de la constante pour le TOKEN_KEY et la méthode removeItem pour supprimer le token
    window.localStorage.removeItem(TOKEN_KEY);
    navigate("/login");
    window.location.reload();
  };

  const values: AuthContextProps = {
    user,
    setUser,
    login: handleLogin,
    logout: handleLogout,
    signup: handleSignup,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading ? <LoadingPage /> : children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
