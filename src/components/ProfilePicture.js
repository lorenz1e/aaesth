import { getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState, useTransition } from 'react';
import { ref } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../firebase/firebase';
import { uploadPFP } from '../firebase/firestore';

export const ProfilePicture = ({ uid, ownProfile }) => {
    const [image, setImage] = useState(null);
    const [upload, setUpload] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchImage = async () => {
            const imageRef = ref(FIREBASE_STORAGE, `profile_pictures/${uid}`);

            // console.log(imageRef)
            
            try {
                const url = await getDownloadURL(imageRef);
                setImage(url);
            } catch (error) {
                console.error("Error fetching profile picture: ", error);
                setImage(null)
            }
        };

        fetchImage();
    }, []);

    useEffect(() => {
        const uploadImage = async () => {
            try {
                await uploadPFP(upload)
            } catch (error) {
                console.log(error)
            }
        }

        uploadImage();
    }, [upload])

    return (
        <div className='relative rounded-full bg-gray-200 min-h-24 min-w-24 mb-6 overflow-hidden'>
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
                        onChange={(e) => setUpload(e.target.files[0])}
                    />
                )
            }


        </div>
    )
}
