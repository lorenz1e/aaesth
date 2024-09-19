import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/library.css';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../firebase/auth';
import { checkProfileComplete } from '../firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { FIREBASE_AUTH } from '../firebase/firebase';

const time = new Date().getHours();

export const Home = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState(""); 

  useEffect(() => {
    if (time < 12) setGreeting("Morning");
    else if (time >= 12 && time <= 17) setGreeting("Afternoon");
    else if (time >= 17 && time <= 24) setGreeting("Evening");
  }, []);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      await signInWithGoogle();
      setGoogleLoading(false);
      window.location.reload()
    } catch(error) {
      setError(error)
    }
  }

  const timeTest = () => {
    const date1 = Timestamp.fromDate(new Date())
    console.log(date1)
    console.log(date1.toDate())
  }


  return (
    <div className="flex flex-col h-screen justify-center items-center px-4 w-full">
      <div className="w-full max-w-xs">
        <div className="text-2xl font-bold text-center">
          Good {greeting}! 👋
        </div>
        <div className="text-center mb-14">
          Choose a sign in method and get started...
        </div>


        <button
          onClick={handleGoogleSignIn}
          className="bg-gray-100 font-bold rounded-2xl w-full h-[3.125rem] flex justify-center items-center"
        >
          <FaGoogle className="mr-2 text-xl" />
          Sign up with Google
        </button>
        <div className="text-red-500 flex justify-center">
          {error && `❌ Error: ${error}`}
        </div>
      </div>
    </div>
  );
};
