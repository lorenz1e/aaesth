import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebase";
import { updateCurrentUser, updateProfile } from "firebase/auth";

export const checkUsernameExists = async (username) => {
    const docRef = doc(FIREBASE_DB, `links/${username}`);
    try {
        const docSnap = await getDoc(docRef);
        const exists =  docSnap.exists(); 

        return exists;
    } catch (error) {
        throw new Error("Error while checking username"); 
    }
};


export const createUserDocs = async (username, email, password, uid) => {
    try {
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
            throw new Error("Username already exists");
        }

        const docRef1 = doc(FIREBASE_DB, `users/${uid}`);
        const docRef2 = doc(FIREBASE_DB, `links/${username}`);
        
        const data1 = {
            uid: uid,
            username: username,
            email: email,
            password: password,
            created_at: Date(),
            last_login: Date(),
            pfp_url: "",
           
        };

        const data2 = {
            uid: uid,
            username: username
        };

        await setDoc(docRef1, data1);
        await setDoc(docRef2, data2);

        await updateProfile(FIREBASE_AUTH.currentUser, {
            displayName: username
        })

    } catch (error) {
        throw new Error(error)
    }
};

export const getUserDoc = async (uid) => {
    const docRef = doc(FIREBASE_DB, `users/${uid}`);

    try {
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUIDbyUN = async (username) => {
    const docRef = doc(FIREBASE_DB, `links/${username}`);

    try {
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}

