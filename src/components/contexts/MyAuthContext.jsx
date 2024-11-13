import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

// Create Authentication Context
export const AuthContext = createContext(null);

const MyAuthContext = ({ children }) => {
  // State manager to track if user is logged in or not
  const [user, setUser] = useState(null);

  // Manage user login state via Firebase observer in useEffect
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Currently Logged User", currentUser);
      setUser(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  // Create User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user

  const logout = () => {
    return signOut(auth);
  };

  // Send Password Reset Email
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Simplified auth info
  const authInfo = {
    user,
    createUser,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default MyAuthContext;
