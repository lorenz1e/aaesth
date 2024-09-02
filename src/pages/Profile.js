import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { PostsList } from '../components/PostsList';
import { BiPlus } from 'react-icons/bi';
import { authSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { prettyFormat } from '@testing-library/react';
import { uploadPFP } from '../firebase/firestore';
import { ProfilePicture } from '../components/ProfilePicture';

export const Profile = ({ profile }) => {
    const { currentUser } = useAuth();
    const [ownProfile, setOwnProfile] = useState(false);

    useEffect(() => {
        if (currentUser?.uid === profile?.uid) {
            setOwnProfile(true);
        } else {
            setOwnProfile(false);
        }

    }, [currentUser, profile]);

    return (
        <div className="flex flex-col h-screen mt-14 items-center px-4">
            
            <ProfilePicture uid={profile?.uid} ownProfile={ownProfile}></ProfilePicture>

            <div className='text-2xl font-bold tracking-tight'>{profile.realName}</div>
            <div className='font-medium text-base text-gray-500 '>@{profile.username}</div>

            {ownProfile ? <AuthProfile username={profile.username} /> : <Space />}


            <PostsList uid={profile.uid} />

        </div>
    );
};

const AuthProfile = ({ username }) => {
    const navigate = useNavigate();

    return (
        <>
            <button
                className="text-black font-bold bg-gray-100 rounded-2xl max-w-56 w-full min-h-[3.125rem] flex justify-center items-center mt-6"
                onClick={() => navigate("/edit-profile", { username: username })}
            >
                Edit profile
            </button>

            <button
                className="text-white font-bold bg-black rounded-2xl max-w-56 w-full min-h-[3.125rem] flex justify-center items-center mb-6 mt-2"
                onClick={() => navigate("/create")}
            >
                <BiPlus size={24} className='mr-2' />
                Create Post
            </button>
        </>
    );
};

const Space = () => {
    return (
        <div className='mb-6'></div>
    );
}