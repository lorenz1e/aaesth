import React, { useState } from 'react';
import { MdImageSearch } from "react-icons/md";
import { createPost } from '../firebase/firestore';
import { createPortal } from 'react-dom';
import { Spinner } from 'react-activity';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../firebase/firebase';

export const CreatePost = () => {
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePublish = async () => {
    setLoading(true);
    try {
      await createPost(upload);
      setLoading(false);
      navigate(`/${FIREBASE_AUTH.currentUser.displayName}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return createPortal(
      <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
        <Spinner size={20} />
      </div>,
      document.body
    );
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4 w-full">
      <div className="w-full max-w-xs"> 
       

        <div className='bg-gray-200 w-full rounded-xl relative flex items-center justify-center overflow-hidden'
             style={{ paddingTop: '150%' }}> 
          <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
            {upload ? (
              <img src={URL.createObjectURL(upload)} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className='flex items-center flex-col justify-center font-bold'>
                <MdImageSearch className='pb-2 text-4xl' />
                Upload an Image

                
                <input
                  accept="image/*"
                  type='file'
                  className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                  onChange={(e) => setUpload(e.target.files[0])}
                />
              </div>
            )}
          </div>
        </div>

        <button
          className="text-white font-bold bg-black rounded-2xl w-full min-h-[3.125rem] flex justify-center items-center mb-4 mt-14"
          onClick={handlePublish}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};
