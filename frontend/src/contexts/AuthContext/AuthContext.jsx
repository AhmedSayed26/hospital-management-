import { createContext, useContext, useEffect, useState } from "react";
import { getToken, setToken as persistToken } from "@/api/client";
import AuthServices from "@/services/AuthServices";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const ROLE_LABELS = {
  USER: "Patient",
  ADMIN: "Doctor",
};

function userFromToken(token) {
  const decoded = jwtDecode(token);
  const role = decoded.roles?.[0];

  if (!role) {
    throw new Error("Invalid token: missing role");
  }

  if (decoded.exp && decoded.exp * 1000 <= Date.now()) {
    throw new Error("Token expired");
  }

  return {
    id: decoded.id,
    email: decoded.sub,
    role,
  };
}

function applySession(token, setToken, setUser) {
  const user = userFromToken(token);
  setToken(token);
  persistToken(token);
  setUser(user);
  return user;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      applySession(storedToken, setToken, setUser);
    } catch {
      persistToken(null);
      localStorage.removeItem("role");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const registerPatient = async (patientData) => {
    try {
      const response = await AuthServices.registerPatient(patientData);

      if (!response?.success) {
        throw new Error(response.message || "Registration failed");
      }

      applySession(response.data, setToken, setUser);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed";

      throw new Error(message);
    }
  };

  const registerDoctor = async (doctorData) => {
    try {
      const response = await AuthServices.registerDoctor(doctorData);

      if (!response?.success) {
        throw new Error(response.message || "Registration failed");
      }

      applySession(response.data, setToken, setUser);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed";

      throw new Error(message);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await AuthServices.login(credentials);

      if (!response?.success) {
        throw new Error(response.message || "Login failed");
      }

      applySession(response.data, setToken, setUser);
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed";

      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    persistToken(null);
    localStorage.removeItem("role");
  };

  const isAuthenticated = Boolean(user && token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        registerPatient,
        registerDoctor,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
