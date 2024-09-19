import { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Spinner } from 'react-activity';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { SplashScreen } from '../components/SplashScreen';
import { getOwnProfile, getOwnUsername } from '../firebase/firestore';
import userEvent from '@testing-library/user-event';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async () => {
            if (FIREBASE_AUTH.currentUser) {

                try {
                    const ownProfileData = await getOwnProfile();

                    console.log(ownProfileData)

                    const data = {
                        auth: FIREBASE_AUTH.currentUser,
                        db: ownProfileData
                    }


                    setCurrentUser(data);

                } catch (error) {
                    console.log(error)
                }
            }
            setLoading(false);
        });

        return () => {
            setLoading(true);
            unsubscribe();
        };
    }, []);

    console.log(currentUser)

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {loading ? <SplashScreen></SplashScreen> : children}
        </AuthContext.Provider>
    );
};
