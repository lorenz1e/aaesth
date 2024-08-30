import { getDownloadURL, listAll } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { ref } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../firebase/firebase';

export const PostsList = ({ uid }) => {
    const [imageList, setImageList] = useState([]);

    const imageListRef = ref(FIREBASE_STORAGE, `posts/${uid}`);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await listAll(imageListRef);
                const urls = await Promise.all(
                    response.items.map((item) => getDownloadURL(item))
                );
                setImageList(urls);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };

        fetchImages();
    }, [uid]);


    return (
        <div className='grid grid-cols-2'>
            {imageList.map((url, index) => (
                <div className='pl-2 pr-2 pt-4 pb-2' key={index}>
                    <img src={url} className='rounded-lg max-h-[70vh]' alt={index}/>
                </div>
            ))}
        </div>
    );
};
