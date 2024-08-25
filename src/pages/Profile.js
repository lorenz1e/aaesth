import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authSignOut } from '../firebase/auth';
import { checkUsernameExists, getUIDbyUN, getUserDoc } from '../firebase/firestore';
import { Spinner } from 'react-activity';
import { FIREBASE_AUTH } from '../firebase/firebase';

export const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [ownProfile, setOwnProfile] = useState(false)

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
                    console.log(user)
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
                navigate('/error');
            }
        };

        checkProfile();
    }, [id, navigate]);

    useEffect(() => {
        if (profile == FIREBASE_AUTH.user) {
            setOwnProfile(true)
        } else setOwnProfile(false)

        console.log(ownProfile)
    }, [profile])

    if (loading) {
        return <Spinner />;
    }

    if (!profile) {
        return <div>Error: Profile not found</div>;
    }

    return (
        <div className='flex flex-col items-center'>
            <div>@{profile.username}</div>


        </div>
    );
};

const AuthProfile = () => {
    return (
        <>
            <input type='file'></input>
            <button className="bg-red-500 text-white px-10 py-2 mt-6 rounded-xl flex justify-center" onClick={authSignOut}>Sign Out</button>
        </>


    )
}
