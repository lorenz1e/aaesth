import React from 'react'
import { Spinner } from 'react-activity';
import "react-activity/dist/library.css";
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';
import { FaApple } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../firebase/firebase';


export const Home = ({ }) => {
    const [googleLoading, setGoogleLoading] = useState(false);

    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-[100vh] justify-center items-center">
            <div className="text-2xl font-bold">Sign up and get started!</div>
            <div className="flex text-lg">
                <div className="mr-1.5">with</div>
                <div className="italic font-medium">aaesth</div>
            </div>

            <div className='flex flex-col w-72 mt-10'>
                <button className="bg-black text-white px-5 py-3 mb-2 rounded-xl" onClick={() => navigate("/sign-up")}>
                    Sign Up
                </button>
                <button onClick={null} className='bg-gray-200 px-5 py-3 mb-2 rounded-xl flex items-center justify-center'>
                    {!googleLoading && <FaGoogle className='mr-2 text-xl' />}
                    {
                        googleLoading ? <Spinner color='black' /> : "Sign up with Google"
                    }
                </button>

                <button onClick={null} className='bg-gray-200 px-5 py-3 mb-2 rounded-xl flex items-center justify-center'>
                    {!googleLoading && <FaApple className='mr-2 text-xl' />}
                    {
                        googleLoading ? <Spinner color='black' /> : "Sign up with Apple"
                    }
                </button>

                <button onClick={() => navigate("/login")}>
                    Login
                </button>
            </div>

        </div>
    )
}

