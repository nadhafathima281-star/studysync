import { createContext, useContext, useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  verifyOtp,
  refreshToken,
  logoutUser,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("accessToken");
      const storedUser = localStorage.getItem("user");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await refreshToken();
        localStorage.setItem("accessToken", res.data.accessToken);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const register = (data) => registerUser(data);

  const login = (data) => loginUser(data);

  const verifyOTP = async (data) => {
    const res = await verifyOtp(data);

    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user);

    return res;
  };

  const logout = async () => {
    await logoutUser();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        verifyOTP,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);