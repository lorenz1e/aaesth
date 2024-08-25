import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authSignOut } from '../firebase/auth';
import { checkUsernameExists, getUIDbyUN, getUserDoc } from '../firebase/firestore';
import { Spinner } from 'react-activity';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { useAuth } from '../contexts/AuthContext';
import { SplashScreen } from '../components/SplashScreen';
import { ImageUpload } from '../components/ImageUpload';
import { PostsList } from '../components/PostsList';

export const Profile = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [ownProfile, setOwnProfile] = useState(false);
    const [posts, setPosts] = useState()

    useEffect(() => {
        const checkProfile = async () => {
            try {
                const exists = await checkUsernameExists(id);
                if (!exists) {
                    navigate('/not-found');
                } else {
                    const uid = await getUIDbyUN(id);
                    const user = await getUserDoc(uid.uid);
                    setProfile(user);
                    console.log(profile)

                    setLoading(false);

                    if (currentUser?.uid === uid.uid) {
                        setOwnProfile(true);
                    } else {
                        setOwnProfile(false);
                    }


                }
            } catch (err) {
                console.log(err)
            }
        };

        checkProfile();
    }, [id, navigate, currentUser]);

   

    if (loading) {
        return <SplashScreen></SplashScreen>
    }

    if (!profile) {
        return <div>Error: Profile not found</div>;
    }

    return (
        <div className='flex flex-col items-center'>
            <div>@{profile.username}</div>

            {ownProfile ? <AuthProfile></AuthProfile> : null}

            <PostsList uid={profile.uid}></PostsList>
        </div>
    );
};

const AuthProfile = () => {
    return (
        <>
        <ImageUpload></ImageUpload>
            <button className="bg-red-500 text-white px-10 py-2 mt-6 rounded-xl flex justify-center" onClick={authSignOut}>Sign Out</button>
        </>
    )
};
