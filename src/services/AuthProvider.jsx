import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useToast } from "@chakra-ui/react";

AuthProvider.propTypes = {
  children: PropTypes.node,
};

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const toast = useToast();

  const login = async (email, password) => {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    setIsAuthenticated(true);
    setUser(data.user);
  };

  // const isAuth = () => !!user;

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
      status: "success",
      duration: 3000,
    });
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
