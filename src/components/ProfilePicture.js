import React, { useEffect, useState } from 'react';
import { uploadPFP } from '../firebase/firestore';
import imageCompression from 'browser-image-compression';
import { useAuth } from '../contexts/AuthContext';

export const ProfilePicture = ({ ownProfile, url }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(url)
    }, [url]);

    const uploadImage = async (imageFile) => {
        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 512,
            useWebWorker: true,
        }

        try {
            const compressedFile = await imageCompression(imageFile, options);

            await uploadPFP(compressedFile)

            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='relative rounded-full bg-gray-200 min-h-24 min-w-24 h-24 w-24 mb-6 overflow-hidden'>
            {
                image ? (
                    <img
                        src={image}
                        className='absolute inset-0 w-full h-full object-cover'
                    />
                ) : (
                    <img
                        className='absolute inset-0 w-full h-full object-cover'
                        src="https://firebasestorage.googleapis.com/v0/b/aaesth-e8a6e.appspot.com/o/assets%2FFrame%201%20(2).svg?alt=media&token=b7e780d2-5b5f-476c-90a2-546b25572bf8"
                    />
                )
            }

            {
                ownProfile && (
                    <input
                        accept="image/*"
                        type='file'
                        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        onChange={(event) => uploadImage(event.target.files[0])}
                    />
                )
            }


        </div>
    )
}
