import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen justify-center items-center  px-4">
      <div className="text-2xl font-bold text-center">
        Not Found
      </div>


      <button
        className="text-white font-bold bg-black rounded-2xl max-w-56 w-full min-h-[3.125rem] flex justify-center items-center mb-6 mt-2"
        onClick={() => navigate("/")}
      >

        <FaArrowLeft className='mr-2' />
        Go Back
      </button>
    </div>


  )
}
