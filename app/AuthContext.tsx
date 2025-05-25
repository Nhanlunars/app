// app/context/AuthContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId?: string;
  // ... các trường khác
}

interface AuthContextType {
  userToken: string | null;
  userInfo: UserInfo | null;
  login: (token: string, userInfo: UserInfo) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // useEffect(() => {
  //   // Load token on app start
  //   const loadToken = async () => {
  //     const token = await AsyncStorage.getItem("userToken");
  //     if (token) setUserToken(token);
  //   };
  //   loadToken();
  // }, []);

  const login = async (token: string, info: UserInfo) => {
  await AsyncStorage.setItem("userToken", token);
  await AsyncStorage.setItem("userInfo", JSON.stringify(info));
  setUserToken(token);
  setUserInfo(info);
};

  const logout = async () => {
  await AsyncStorage.removeItem("userToken");
  await AsyncStorage.removeItem("userInfo");
  setUserToken(null);
  setUserInfo(null);
};

useEffect(() => {
  const loadData = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const infoStr = await AsyncStorage.getItem("userInfo");
    if (token) setUserToken(token);
    if (infoStr) setUserInfo(JSON.parse(infoStr));
  };
  loadData();
}, []);

  return (
    <AuthContext.Provider value={{ userToken,userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
