
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import auth from "../firebase/firebase.config";
//   import useAxiosCommon from "../Hooks/useAxiosCommon";

  export const AuthContext = createContext(null);
  export default function AuthContextComponent({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    // const axiosCommon = useAxiosCommon();

    // createUser
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };

    // login user
    const logInUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    };

    // google provider
    const googleSignIn = () => {
      return signInWithPopup(auth, googleProvider)
    }



    // sign out
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
    // onAuthStateChanged
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log(currentUser);
        // setLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, []);

  //   update user profile
  const updateUserProfile =(name, photo) => {
      return updateProfile(auth.currentUser,{
          displayName: name,
          photoURL: photo,
      })
  }


    const authInfo = { user, loading, createUser, logInUser, logOut, updateUserProfile, googleSignIn };
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  }
