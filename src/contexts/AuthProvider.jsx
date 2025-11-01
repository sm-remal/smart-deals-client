import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, sendPasswordResetEmail, sendEmailVerification, updateProfile  } from "firebase/auth";
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()


    // Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Login
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // SigIn With Google
    const signInGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // On Auth Change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); 
        })
        return () => {
            unsubscribe()
        }
    }, [])

    // Sign Out
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Forget Password
    const forgetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    // Verification Email
    const verificationEmail = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }

    // Update Profile 
    const updateUserProfile = () => {
        setLoading(true)
        return updateProfile()
    }

    const authInfo = {
        user,
        setUser,
        createUser,
        loginUser,
        signInGoogle,
        logOut,
        forgetPassword,
        verificationEmail,
        updateUserProfile,
        loading,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;