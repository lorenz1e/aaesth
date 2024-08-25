import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Spinner } from 'react-activity';
import { signUpWithEmail } from '../firebase/auth';
import { checkUsernameExists } from '../firebase/firestore';
import { FIREBASE_AUTH } from '../firebase/firebase';

export const SignUp = () => {
    const [curPage, setCurPage] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    if (FIREBASE_AUTH.currentUser) {
        return <Navigate to={`/${FIREBASE_AUTH.currentUser.displayName}`}/>
    }

    const handleNext = async () => {
        setLoading(true);
        try {
            if (await checkUsernameExists(username) === false && username.length >= 3) {
                setCurPage(2)
                setLoading(false)
                setError(null)
            } else {
                setError("Username is not available")
                setLoading(false)
            }
        } catch (err) {
            setError("Username is not available");
            setLoading(false)
        }
    };

    const handleSignUp = async () => {
        setLoading(true)
        try {
            await signUpWithEmail(email, password, username);
            setLoading(false);
            setError(null)
        } catch (err) {
            setError(err.message);
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col h-[100vh] justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <div className="text-2xl font-bold">Sign Up</div>
                <div className="flex text-lg">
                    {curPage === 1 ? "Create a username for your profile." : "Enter your E-Mail and Password and sign up"}
                </div>
                <div className='flex flex-col w-72 mt-10'>
                    {
                        curPage === 1 ? (
                            <SignUpUsername
                                handleNext={handleNext}
                                username={username}
                                setUsername={setUsername}
                                loading={loading}
                            />
                        ) : (
                            <SignUpEmail
                                handleBack={() => setCurPage(1)}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                username={username}
                                handleSignUp={handleSignUp}
                                loading={loading} 
                            />
                        )
                    }
                </div>
            </div>
            <div className="text-red-500 flex justify-center">
                {error && `❌ ${error}`}
            </div>
        </div>
    )
}

const SignUpUsername = ({ handleNext, username, setUsername, loading }) => {
    return (
        <div className='flex flex-col my-4'>
            <input
                className="bg-gray-200 px-5 py-2 mb-4 outline-none rounded-xl"
                value={username}
                placeholder='Username'
                onChange={(input) => setUsername(input.target.value)}
            />
            <button className="bg-black text-white px-5 py-2 rounded-xl disabled:bg-gray-500" onClick={handleNext}>
                {loading ? <Spinner/> : "Next"}
            </button>
        </div>
    )
}

const SignUpEmail = ({ handleBack, email, setEmail, password, setPassword, username, handleSignUp, loading }) => {
    return (
        <div className='flex flex-col mt-5'>
            <div>Your username: {username}</div>
            <input
                className="bg-gray-200 px-5 py-2 mb-2 outline-none rounded-xl"
                value={email}
                placeholder='E-Mail'
                onChange={(input) => setEmail(input.target.value)}
            />
            <input
                className="bg-gray-200 px-5 py-2 mb-4 outline-none rounded-xl"
                value={password}
                type='password'
                placeholder='Password'
                onChange={(input) => setPassword(input.target.value)}
            />
            <button className="bg-black text-white px-5 py-3 mt-6 rounded-xl flex justify-center" onClick={handleSignUp}>
                {loading ? <Spinner /> : "Sign up"}
            </button>
            <div className="flex justify-center mt-10">
                <button
                    className='bg-gray-200 rounded-full p-3 flex items-center justify-center'
                    onClick={handleBack}
                >
                    <FaArrowLeft />
                </button>
            </div>
        </div>
    )
}
