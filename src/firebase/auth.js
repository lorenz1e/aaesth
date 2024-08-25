import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { FIREBASE_AUTH, } from "./firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { createUserDocs } from "./firestore"

export const signUpWithEmail = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        await createUserDocs(username, userCredential.user.email, password, userCredential.user.uid)
    } catch (error) {
        throw new Error(error)
    }
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        return await signInWithPopup(FIREBASE_AUTH, provider)
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



