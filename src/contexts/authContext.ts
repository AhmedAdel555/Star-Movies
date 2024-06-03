import { User } from "firebase/auth";
import React from "react";

interface AuthContextType {
  user: User;
  loading: boolean;
  error: string;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType)

export default AuthContext;