import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth"
import { FIREBASE_AUTH, } from "./firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { createUserDocs } from "./firestore"
import { GoogleAuthProvider } from "firebase/auth";


export const signUpWithEmail = async (email, password, username, realName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        await createUserDocs(username, realName, userCredential.user.email, password, userCredential.user.uid)
    } catch (error) {
        throw new Error(error)
    }
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        return await signInWithRedirect(FIREBASE_AUTH, provider)
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    } catch (error) {
        throw new Error(error)
    }
}

export const authSignOut = async () => {
    try {
        signOut(FIREBASE_AUTH)
    } catch (error) {
        console.log(error)
    } 
}



