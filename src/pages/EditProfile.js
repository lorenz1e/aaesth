import React from 'react'
import { authSignOut } from '../firebase/auth'
import { useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { FIREBASE_AUTH } from '../firebase/firebase'

export const EditProfile = ({ props }) => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col h-screen justify-center items-center  px-4">
      <div className="text-2xl font-bold text-center">
        Edit your profile
      </div>

      <button
        className="text-black font-bold bg-gray-100 rounded-2xl max-w-56 w-full min-h-[3.125rem] flex justify-center items-center mt-6"
        onClick={() => {
          authSignOut()
          navigate(`/${FIREBASE_AUTH.currentUser.displayName}`)
        }}
      >
        Sign Out
      </button>

    </div>
  )
}
