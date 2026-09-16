import { createContext, useContext, useState } from "react";
import { setToken as persistToken } from "@/api/client";
import AuthServices from "@/services/AuthServices";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const registerPatient = async (patientData) => {
    try {
      const response = await AuthServices.registerPatient(patientData);

      if (!response?.success) {
        throw new Error(response.message || "Registration failed");
      }

      setToken(response.data);
      persistToken(response.data);
      setUser({ email: patientData.email, name: patientData.name });

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
      setToken(response.data);
      persistToken(response.data);
      setUser({ email: doctorData.email, name: doctorData.name });
      return response;
    }
    catch (error) {
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

      setToken(response.data);
      persistToken(response.data);
      setUser({ email: credentials.email });

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed";

      throw new Error(message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, registerPatient , registerDoctor, login }}>
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
