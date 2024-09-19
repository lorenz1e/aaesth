import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { checkProfileComplete } from '../firebase/firestore';
import { Navigate } from 'react-router-dom';
import { SplashScreen } from './SplashScreen';
import { FIREBASE_AUTH } from '../firebase/firebase';

export const CheckUserProfileComplete = ({ children }) => {
    const { currentUser } = useAuth();
    const [complete, setComplete] = useState(null);

    useEffect(() => {
        let isMounted = true; 

        const checkProfile = async () => {
            try {
                const result = currentUser.db.private.profile_complete && currentUser.db.public.profile_complete
                if (isMounted) {
                    setComplete(result);
                }
            } catch (error) {
                console.error("Error checking profile completion:", error);
                if (isMounted) {
                    setComplete(false); 
                }
            }
        };

        if (FIREBASE_AUTH.currentUser) {
            checkProfile();
        } else {
            setComplete(true); 
        }

        return () => {
            isMounted = false; 
        };
    }, [currentUser]);

    if (complete === null) {
        return <SplashScreen />;
    }

    if (!complete) {
        return <Navigate to="/complete-profile" />;
    }

    return children;
};
