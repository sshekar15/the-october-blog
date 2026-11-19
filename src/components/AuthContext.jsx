
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(username, password) {
    if (!username.trim() || !password.trim()) {
      return false;
    }

    const loggedInUser = {
      username: username.trim(),
    };

    setUser(loggedInUser);
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
