import { createUserWithEmailAndPassword, getAdditionalUserInfo, getRedirectResult, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth"
import { FIREBASE_AUTH, FIREBASE_DB, } from "./firebase"
import { GoogleAuthProvider } from "firebase/auth"
import { createDefaultUserDocs, updateToCompleteUserDocs } from "./firestore"
import { doc, setDoc } from "firebase/firestore"
import { updateProfile } from "firebase/auth"


export const signUpWithEmail = async (email, password, username, realName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        await updateToCompleteUserDocs(username, realName, userCredential.user.email, password, userCredential.user.uid)
    } catch (error) {
        throw new Error(error)
    }
}

export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const credential = await signInWithPopup(FIREBASE_AUTH, provider)

        const { isNewUser } = await getAdditionalUserInfo(credential)

        if (isNewUser) {
            await createDefaultUserDocs();
        }


    } catch (error) {
        throw new Error(error)
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



