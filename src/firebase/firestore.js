import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebase";
import { updateProfile } from "firebase/auth";
import { ref } from "firebase/storage";
import { FIREBASE_STORAGE } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { uploadBytes } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";


export const checkUsernameExists = async (username) => {
    const docRef = doc(FIREBASE_DB, `links/${username}`);
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        throw new Error("Error while checking username");
    }
};

export const createUserDocs = async (username, realName, email, password, uid) => {
    try {
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            throw new Error("Username already exists");
        }

        const publicDocRef = doc(FIREBASE_DB, `users_public/${uid}`);
        const privateDocRef = doc(FIREBASE_DB, `users_private/${uid}`);
        const linkDocRef = doc(FIREBASE_DB, `links/${username}`);

        const publicData = {
            uid: uid,
            username: username,
            realName: realName,
            pfp_url: "",
        };

        const privateData = {
            uid: uid,
            email: email,
            password: password,
            password_length: password.length,
            created_at: Date(),
            last_login: Date(),
        };

        const linkData = {
            uid: uid,
            username: username
        };

        await setDoc(publicDocRef, publicData);
        await setDoc(linkDocRef, linkData);
        await setDoc(privateDocRef, privateData);

        await updateProfile(FIREBASE_AUTH.currentUser, {
            displayName: username
        });

    } catch (error) {
        FIREBASE_AUTH.currentUser.delete()

        throw new Error(error);
    }
};


export const getUserPublicDoc = async (uid) => {
    const docRef = doc(FIREBASE_DB, `users_public/${uid}`);
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching user doc: ", error);
        return null;
    }
};

export const getUserPrivateDoc = async (uid) => {
    const docRef = doc(FIREBASE_DB, `users_private/${uid}`);
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching user doc: ", error);
        return null;
    }
};


export const getUIDbyUN = async (username) => {
    const docRef = doc(FIREBASE_DB, `links/${username}`);
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching UID by username: ", error);
        return null;
    }
};

export const createPost = async (image) => {
    if (!image) return;
    const imageRef = ref(FIREBASE_STORAGE, `posts/${FIREBASE_AUTH.currentUser.uid}/${uuidv4()}`);
    try {
        await uploadBytes(imageRef, image);
    } catch (error) {
        console.error("Error uploading image: ", error);
    }
};

export const uploadPFP = async (image) => {
    if (!image) return;

    const imageRef = ref(FIREBASE_STORAGE, `profile_pictures/${FIREBASE_AUTH.currentUser.uid}`);
    const publicDocRef = doc(FIREBASE_DB, `users_public/${FIREBASE_AUTH.currentUser.uid}`);

    try {
        await uploadBytes(imageRef, image);
    } catch (error) {
        throw new Error(error)
    }
}