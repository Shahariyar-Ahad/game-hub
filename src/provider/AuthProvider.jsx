import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import auth from '../Firebase/Firebase.config';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
 
    const googleProvider =new GoogleAuthProvider
    const [loading,setLoading]=useState(true)
    const [user, setUser]=useState(null)
    
    const registerWithEmailAndPassword = (email, pass) => {
  return createUserWithEmailAndPassword(auth, email, pass);
};

    const handleGoogleSignin =() => {
      return signInWithPopup(auth,googleProvider)
    }
    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth,(currentUser)=>{
            if(currentUser){
                setUser(currentUser)
                setLoading(false)
            }
        })
        return () => {
          unsubscribe()
        }
    },[])
    const authData={
        registerWithEmailAndPassword, 
        setUser,
        user,
        handleGoogleSignin,
        loading
    }

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
};

export default AuthProvider;