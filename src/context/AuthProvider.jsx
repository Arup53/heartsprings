import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config.js";
import { axiosBasicSecure } from "../hooks/useAxios.jsx";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const axiosCustomSecure = axiosBasicSecure;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  function logOut() {
    return signOut(auth);
  }

  function popUpSignUp() {
    return signInWithPopup(auth, googleProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.email) {
        // generate token
        const { data } = await axiosCustomSecure.post(`/jwt`, {
          email: user?.email,
        });

        setUser(user);
        setLoading(false);
      } else {
        setUser(user);
        //  delete cookie
        const { data } = await axiosCustomSecure.get(`/logout`);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

 

  const authData = {
    user,
    setUser,
    loading,
    setLoading,
    signUp,
    logIn,
    updateUser,
    logOut,
    popUpSignUp,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => {
  const data = useContext(AuthContext);
  return data;
};
