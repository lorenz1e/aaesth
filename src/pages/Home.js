import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/library.css';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createUserDocs } from '../firebase/firestore';

const time = new Date().getHours();

export const Home = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [greeting, setGreeting] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (time < 12) setGreeting("Morning");
    else if (time >= 12 && time <= 17) setGreeting("Afternoon");
    else if (time >= 17 && time <= 24) setGreeting("Evening");
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center  px-4">
      <div className="text-2xl font-bold text-center">
        Good {greeting}! 👋
      </div>
      <div className="text-center mb-16">
        Sign up or login to get started.
      </div>

      <button
        className="bg-black text-white font-bold rounded-2xl max-w-xs w-full h-[3.125rem] mb-4"
        onClick={() => navigate("/sign-up")}
      >
        Sign up
      </button>

      <button
        onClick={null} 
        className="bg-gray-100 font-bold rounded-2xl max-w-xs w-full h-[3.125rem] flex justify-center items-center"
      >
        {!googleLoading && <FaGoogle className="mr-2 text-xl" />}
        {googleLoading ? <Spinner color="black" /> : 'Sign up with Google'}
      </button>

      <div className="w-full max-w-xs border-t border-gray-300 my-12"></div>

      <button
        onClick={() => navigate('/login')}
        className="text-black font-bold bg-gray-100 rounded-2xl max-w-xs w-full h-[3.125rem]"
      >
        Login
      </button>
    </div>
  );
};
