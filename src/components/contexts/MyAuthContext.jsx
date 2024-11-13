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
  const [loading, setLoading] = useState(true);

  // State manager to track if user is logged in or not
  const [user, setUser] = useState(null);

 

  // Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout user

  const logout = () => {
    return signOut(auth);
  };

  // Send Password Reset Email
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };


 // Manage user login state via Firebase observer in useEffect
 useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    console.log("Currently Logged User", currentUser);
    if(currentUser){
      setUser(currentUser);
      setLoading(false);
    }
    else{
      setUser(null);
      setLoading(false);
    }
    
  });

  return () => {
    unSubscribe();
  };
}, []);

  // Simplified auth info
  const authInfo = {
    user,
    createUser,
    login,
    logout,
    resetPassword,
    loading

  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default MyAuthContext;
