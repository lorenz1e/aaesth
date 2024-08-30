import React, { useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { createPost } from '../firebase/firestore';
import { createPortal } from 'react-dom';
import { Spinner } from 'react-activity';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../firebase/firebase';


export const CreatePost = () => {
  const [upload, setUpload] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handlePublish = async () => {
    setLoading(true)
    try {
      await createPost(upload)
      setLoading(false)
      navigate(`/${FIREBASE_AUTH.currentUser.displayName}`)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      createPortal(
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
          <Spinner size={20}></Spinner>
        </div>,
        document.body
      )
    )
  }

  return (
    <div className="flex flex-col h-screen items-center px-4 justify-center">
      <div className="text-2xl font-bold text-center">
        Create Post
      </div>

      <div className='bg-gray-200 w-4/5 h-1/2 rounded-xl max-w-md relative flex items-center justify-center'>
        {upload ? (
          <img src={upload} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <div className='flex items-center flex-col h-full justify-center font-bold'>
            <FiUpload className='pb-2 text-4xl' />
            Upload an Image
            <input
              accept="image/*"
              type='file'
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
              onChange={(upload) => setUpload(upload.target.files[0])}
            />
          </div>
        )}
      </div>

      <button
        className="text-white font-bold bg-black rounded-2xl max-w-56 w-full min-h-[3.125rem] flex justify-center items-center mb-4 mt-6"
        onClick={() => handlePublish()}
      >
        Publish
      </button>

     
    </div>
  );

}
