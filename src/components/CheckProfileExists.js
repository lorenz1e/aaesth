import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkUsernameExists, getUIDbyUN, getUserPublicDoc } from '../firebase/firestore';
import { useParams } from 'react-router-dom';
import { SplashScreen } from './SplashScreen';
import { FIREBASE_AUTH } from '../firebase/firebase';

export const CheckProfileExists = ({ children }) => {
    const [exists, setExists] = useState(null);
    const [profile, setProfile] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const checkProfile = async () => {
            try {
                const exists = await checkUsernameExists(username);
                if (exists === false) {
                    setExists(false);
                } else {
                    const uid = await getUIDbyUN(username);
                    const user = await getUserPublicDoc(uid.uid);
                    setProfile(user);
                    setExists(true);
                }
            } catch (error) {
                setExists(false);
                console.log(error);
            }
        };

        checkProfile();
    }, [username]);

    if (exists === null) {
        return <SplashScreen />;
    }

    if (!exists) {
        return <Navigate to="/not-found" />;
    }

    return React.cloneElement(children, { profile });
};
