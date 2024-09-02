import React, { useEffect, useState } from 'react';
import { authSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { getUserPrivateDoc } from '../firebase/firestore';
import { MdLock } from "react-icons/md";


export const EditProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserPrivateDoc(FIREBASE_AUTH.currentUser.uid);
        setData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4 w-full">
      <div className="w-full max-w-xs"> 
        <div className="text-2xl font-bold text-center mb-4">
          Edit your profile
        </div>

        <div className='bg-gray-100 font-semibold rounded-xl mb-14 flex items-center py-4 px-6'>
          <MdLock size={42}></MdLock>
          <div className="text-center ml-2">
            Profile edits are currently unavailable...
          </div>
        </div>

        <div className="mb-4">
          <div className="mb-0.5 text-gray-500">E-Mail</div>
          <input
            className="bg-gray-100 px-5 font-medium rounded-2xl w-full h-[3.125rem] outline-none"
            disabled
            value={data?.email || ''}
          />
        </div>

        <div className="mb-4">
          <div className="mb-0.5 text-gray-500">Password</div>
          <input
            className="bg-gray-100 px-5 font-medium rounded-2xl w-full h-[3.125rem] outline-none"
            disabled
            value={data?.password || ''}
          />
        </div>

        <div className="mb-14">
          <div className="mb-0.5 text-gray-500">Profile ID</div>
          <input
            className="bg-gray-100 px-5 font-medium rounded-2xl w-full h-[3.125rem] outline-none"
            disabled
            value={data?.uid || ''}
          />
        </div>

        <button
          className="text-white font-bold bg-red-600 rounded-2xl w-full min-h-[3.125rem] flex justify-center items-center"
          onClick={() => {
            authSignOut();
            navigate(`/${FIREBASE_AUTH.currentUser.displayName}`);
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
