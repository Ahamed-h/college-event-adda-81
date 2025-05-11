
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "organizer";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: "student" | "organizer") => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("eventx-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    // Mock login - In a real app, this would make an API call
    if (email && password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - In a real app, this would come from the backend
      const userData = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role: email.includes('organizer') ? "organizer" : "student" as "student" | "organizer"
      };
      
      setUser(userData);
      localStorage.setItem("eventx-user", JSON.stringify(userData));
    }
  };

  const register = async (name: string, email: string, password: string, role: "student" | "organizer") => {
    // Mock registration - In a real app, this would make an API call
    if (name && email && password) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - In a real app, this would come from the backend
      const userData = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role
      };
      
      setUser(userData);
      localStorage.setItem("eventx-user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eventx-user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
