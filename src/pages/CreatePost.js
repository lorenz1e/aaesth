import React, { useState } from 'react';
import { MdImageSearch } from "react-icons/md";
import { createPost } from '../firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FIREBASE_AUTH } from '../firebase/firebase';
import { cropImage } from '../CropImg';
import imageCompression from 'browser-image-compression';
import { SplashScreen } from '../components/SplashScreen';
import { MdOutlineAddLocationAlt } from "react-icons/md";


export const CreatePost = () => {
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [description, setDescription] = useState();
  const [location, setLocation] = useState();

  const handlePublish = async () => {
    setLoading(true);
    const options = { maxSizeMB: 4, useWebWorker: true };

    try {
      const croppedImage = await cropImage(upload);
      const compressedImage = await imageCompression(croppedImage, options);
      await createPost(croppedImage);
      setLoading(false);
      navigate(`/${FIREBASE_AUTH.currentUser.displayName}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4 w-full">
      <div className="w-full max-w-xs">
        <div className="relative pt-[150%] bg-gray-100 rounded-xl flex items-center justify-center overflow-visible ">
          <div className="absolute inset-0 flex items-center justify-center">
            {upload ? (
              <img src={URL.createObjectURL(upload)} className="object-cover w-full h-full rounded-xl" alt="Upload" />
            ) : (
              <div className="flex flex-col items-center justify-center font-bold">
                <MdImageSearch className="text-4xl pb-2" />
                Upload an Image

              </div>
            )}
            <input
              accept="image/png, image/jpeg"
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setUpload(e.target.files[0])}
            />

          </div>
        </div>

       


        <button
          className="bg-black text-white font-bold rounded-2xl w-full h-12 flex justify-center items-center mt-14"
          onClick={handlePublish}
        >
          Create Post
        </button>
      </div>
    </div>
  );
};
