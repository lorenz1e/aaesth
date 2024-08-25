import { useEffect, useState, createContext, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Spinner } from 'react-activity';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { SplashScreen } from '../components/SplashScreen';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (userCredential) => {
            setCurrentUser(userCredential);
            setLoading(false);
        });

        return () => {
            setLoading(true);
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {loading ? <SplashScreen></SplashScreen> : children}
        </AuthContext.Provider>
    );
};
