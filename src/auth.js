import React, { createContext, useEffect, useState } from "react";
import firebase from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth();

const useCreateUser = () => {
  const [status, setStatus] = useState({ error: "", success: "" });

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setStatus({ success: "ok", error: "" });
      })
      .catch((err) => {
        setStatus({ succes: "", error: err });
      });
  };
  return [status, createUser];
};

const useSignInUser = () => {
  const [status, setStatus] = useState({});

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((err) => {
      setStatus(err);
    });
  };
  return [status, signIn];
};

const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticationLoaded, setIsAuthenticationLoaded] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticationLoaded(true)
      }else{
        setIsAuthenticationLoaded(true)
      }
    });
  }, []);
  return [user,isAuthenticationLoaded];
};

const userSignOut = () => {
  signOut(auth).then(() => {
    window.location.reload()
  });
};

const AuthProvider = ({ children }) => {
  const [user,loading] = useGetUser();
  const [createUserStatus, createUser] = useCreateUser();
  const [signInStatus, signIn] = useSignInUser();
  
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userSignOut,
        userSignIn: {
          signInStatus,
          signIn,
        },
        createUser: {
          createUserStatus,
          createUser,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
