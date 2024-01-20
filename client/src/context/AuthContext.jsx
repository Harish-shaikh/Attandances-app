/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const register = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setUser(data.user);

        return true;
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const login = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setUser(data.user);
        if (data.user.role === "admin") setIsAdmin(true);

        return true;
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        register,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
