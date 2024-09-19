import React, { useEffect, useState } from 'react';
import { authSignOut } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { getUserPrivateDoc, getUserPublicDoc } from '../firebase/firestore';
import { MdLock } from "react-icons/md";
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';


export const EditProfile = () => {
  const navigate = useNavigate();
  const {currentUser} = useAuth(FIREBASE_AUTH)

  const privateData = currentUser.db.private
  const publicData = currentUser.db.public

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
          <div className="mb-0.5 text-gray-500">Username</div>
          <input
            className="bg-gray-100 px-5 font-medium rounded-2xl w-full h-[3.125rem] outline-none"
            disabled
            value={publicData?.username || ''}
          />
        </div>

        <div className="mb-4">
          <div className="mb-0.5 text-gray-500">E-Mail</div>
          <input
            className="bg-gray-100 px-5 font-medium rounded-2xl w-full h-[3.125rem] outline-none"
            disabled
            value={privateData?.email || ''}
          />
        </div>


        <div className="mb-14">
          <div className="mb-0.5 text-gray-500">Profile ID</div>
          <input
            className="bg-gray-100 px-5 font-medium rounded-2xl w-full h-[3.125rem] outline-none"
            disabled
            value={privateData?.uid || ''}
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
