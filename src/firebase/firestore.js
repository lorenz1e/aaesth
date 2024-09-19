import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, setDoc, Timestamp, updateDoc, writeBatch } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebase";
import { deleteUser, updateProfile } from "firebase/auth";
import { ref } from "firebase/storage";
import { FIREBASE_STORAGE } from "./firebase";
import { v4 as uuidv4 } from "uuid";
import { uploadBytes } from "firebase/storage";
import { CheckProfileExists } from "../components/CheckProfileExists";
import { getDownloadURL } from "firebase/storage";
import { WriteBatch } from "firebase/firestore";

export const checkUsernameExists = async (username) => {
    const docRef = doc(FIREBASE_DB, `links/${username}`);
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    } catch (error) {
        return false
    }
};

export const checkProfileComplete = async () => {
    const publicDocRef = doc(FIREBASE_DB, `users_public/${FIREBASE_AUTH.currentUser.uid}`);
    const privateDocRef = doc(FIREBASE_DB, `users_private/${FIREBASE_AUTH.currentUser.uid}`);

    try {
        const publicDocSnap = await getDoc(publicDocRef)
        const privateDocSnap = await getDoc(privateDocRef)

        if (!publicDocSnap.data().profile_complete || !privateDocSnap.data().profile_complete) {
            return false
        }

        return true;
    }
    catch (error) {
        throw new Error(error)
    }
}

export const createDefaultUserDocs = async () => {
    const publicDocRef = doc(FIREBASE_DB, `users_public/${FIREBASE_AUTH.currentUser.uid}`);
    const privateDocRef = doc(FIREBASE_DB, `users_private/${FIREBASE_AUTH.currentUser.uid}`);

    const batch = writeBatch(FIREBASE_DB)

    try {
        const date = new Date()

        const publicData = {
            uid: FIREBASE_AUTH.currentUser.uid,
            username: null,
            realName: null,
            pfp_url: FIREBASE_AUTH.currentUser.photoURL,
            profile_complete: false,
        }

        const privateData = {
            uid: FIREBASE_AUTH.currentUser.uid,
            email: FIREBASE_AUTH.currentUser.email,
            created_at: Timestamp.fromDate(date),
            last_login: Timestamp.fromDate(date),
            profile_complete: false,
        }

        batch.set(publicDocRef, publicData)
        batch.set(privateDocRef, privateData)

        await batch.commit();

    } catch (error) {
        deleteUser(FIREBASE_AUTH.currentUser);
        window.location.reload()
        throw new Error(error);
    }
};

export const updateToCompleteUserDocs = async (username, realName) => {
    const publicDocRef = doc(FIREBASE_DB, `users_public/${FIREBASE_AUTH.currentUser.uid}`);
    const privateDocRef = doc(FIREBASE_DB, `users_private/${FIREBASE_AUTH.currentUser.uid}`);
    const linkDocRef = doc(FIREBASE_DB, `links/${username}`);

    const batch = writeBatch(FIREBASE_DB)

    try {
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            throw new Error("Username already exists");
        }

        const publicData = {
            uid: FIREBASE_AUTH.currentUser.uid,
            username: username,
            realName: realName,
            pfp_url: FIREBASE_AUTH.currentUser.photoURL,
            profile_complete: true,
        }

        const privateData = {
            uid: FIREBASE_AUTH.currentUser.uid,
            email: FIREBASE_AUTH.currentUser.email,
            profile_complete: true,
        }

        const linkData = {
            uid: FIREBASE_AUTH.currentUser.uid,
            username: username
        };


        batch.update(publicDocRef, publicData)
        batch.update(privateDocRef, privateData)
        batch.set(linkDocRef, linkData)

        batch.commit();

        await updateProfile(FIREBASE_AUTH.currentUser, {
            displayName: username
        });

    } catch (error) {
        throw new Error(error);
    }
};

export const getPublicUserProfile = async (uid) => {
    const docRef = doc(FIREBASE_DB, `users_public/${uid}`);
    try {
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
        console.error("Error fetching user doc: ", error);
        return null;
    }
};


export const getOwnProfile = async() => {
    const publicDocRef = doc(FIREBASE_DB, `users_public/${FIREBASE_AUTH.currentUser.uid}`);
    const privateDocRef = doc(FIREBASE_DB, `users_private/${FIREBASE_AUTH.currentUser.uid}`);

    try {
        const publicDocSnap = await getDoc(publicDocRef);
        const privateDocSnap = await getDoc(privateDocRef);

        if (publicDocSnap.exists() && privateDocSnap.exists()) {
            const data = {
                public: publicDocSnap.data(),
                private: privateDocSnap.data()
            }

            return data;
        }

        return null
    } catch (error) {
        console.error("Error fetching user doc: ", error);
        return null;
    }
}


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

    const user = FIREBASE_AUTH.currentUser;
    if (!user) {
        throw new Error("User not authenticated");
    }

    const imageRef = ref(FIREBASE_STORAGE, `profile_pictures/${user.uid}`);
    const publicDocRef = doc(FIREBASE_DB, `users_public/${user.uid}`);

    try {
        await uploadBytes(imageRef, image);

        const imageUrl = await getDownloadURL(imageRef);

        await updateDoc(publicDocRef, { pfp_url: imageUrl });

        return imageUrl;
    } catch (error) {
        throw new Error("Error uploading profile picture: " + error.message);
    }
};