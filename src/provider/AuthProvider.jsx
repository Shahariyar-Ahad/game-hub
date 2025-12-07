import React, { createContext, useEffect, useState } from 'react';
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithPopup,
    signInWithEmailAndPassword, // Added
    signOut // Added
} from 'firebase/auth';
import auth from '../Firebase/Firebase.config';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
 
    const googleProvider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    
    // 1. Register
    const registerWithEmailAndPassword = (email, pass) => {
        setLoading(true); 
        return createUserWithEmailAndPassword(auth, email, pass);
    }; 
    
    // 2. Login 
    const loginWithEmailAndPassword = (email, pass) => {
        setLoading(true); 
        return signInWithEmailAndPassword(auth, email, pass);
    };

    // 3. Logout 
    const logOut = () => {
        setLoading(true); 
        return signOut(auth);
    };

    // 4. Google Sign-in
    const handleGoogleSignin = () => {
        setLoading(true); // Start loading
        return signInWithPopup(auth, googleProvider);
    };

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null); 
            }
            setLoading(false); 
        });

        return () => {
          unsubscribe();
        };
    }, []);

    const authData = {
        registerWithEmailAndPassword, 
        loginWithEmailAndPassword, // Exported
        logOut, // Exported
        setUser,
        user,
        handleGoogleSignin,
        loading,
        setLoading // Exporting setLoading for use in components like Register/Login
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;