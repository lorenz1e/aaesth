import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-activity';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { MdOutlineCancel } from "react-icons/md";
import { MdContactPage } from 'react-icons/md';
import { checkUsernameExists, updateToCompleteUserDocs } from '../firebase/firestore';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { ProfilePicture } from '../components/ProfilePicture';

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export const CompleteProfile = ({ method }) => {
    const [available, setAvailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const [name, setName] = useState(FIREBASE_AUTH.currentUser.displayName);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("")

    const debouncedUsername = useDebounce(username, 500);

    const handleGetStarted = async () => {
        setLoading(true)
        try {
            await updateToCompleteUserDocs(username, name)
            setLoading(false)
            navigate("/")
            window.location.reload()
        } catch (error) {
            setError(error)
            setLoading(false)
        }

    }

    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername) {
                setAvailable(false);
                return;
            }

            try {
                if (debouncedUsername.length >= 3 && debouncedUsername.length <= 15) {
                    if (!(await checkUsernameExists(debouncedUsername))) {
                        setAvailable(true);
                    }
                } else {
                    setAvailable(false);
                }
            } catch (error) {
                setError(error)
            }
        }

        checkUsername();
    }, [debouncedUsername]);

    return (
        <div className="flex flex-col h-screen justify-center items-center px-4 w-full ">
            <div className="w-full max-w-xs ">
                <div className="text-2xl font-bold text-center mb-4">
                    Complete your profile
                </div>

                <div className='bg-gray-100 font-semibold rounded-xl  mb-14 flex items-center py-4 px-6 justify-between'>
                    <MdContactPage size={42}></MdContactPage>
                    <div className="text-center ml-2">
                        Enter your name and username...
                    </div>
                </div>

                <ProfilePicture ownProfile={true} url={FIREBASE_AUTH.currentUser.photoURL} />

                <div className="mb-4">
                    <input
                        className="bg-gray-100 px-5 font-medium rounded-2xl w-full h-[3.125rem] outline-none"
                        value={name}
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-14 flex-row flex bg-gray-100 px-5 rounded-2xl w-full h-[3.125rem] outline-none items-center justify-between">
                    <div className='text-gray-400'>@</div>

                    <input
                        className="bg-gray-100 w-full pl-0.5 outline-none placeholder:text-gray-400"
                        maxLength={933}
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {available ? <MdOutlineCheckCircle className='text-green-600 text-3xl' /> : <MdOutlineCancel className='text-red-600 text-3xl' />}
                </div>

                <button
                    className="text-white font-bold bg-black rounded-2xl w-full min-h-[3.125rem] flex justify-center items-center mb-4"
                    disabled={!available}
                    onClick={handleGetStarted}
                >
                    {
                        loading ? <Spinner /> : "Get started"
                    }
                </button>

                <div className="text-red-500 flex justify-center">
                    {error && `❌ Error: ${error}`}
                </div>
            </div>
        </div>
    );
}
