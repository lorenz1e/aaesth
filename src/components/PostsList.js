import { getDownloadURL, listAll } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { ref } from 'firebase/storage';
import { FIREBASE_STORAGE } from '../firebase/firebase';

export const PostsList = ({ uid }) => {
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const imageListRef = ref(FIREBASE_STORAGE, `posts/${uid}`);

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
                <div className='ml-2 mr-2 mt-2 mb-2 cursor-pointer' key={index} onClick={() => console.log(url)}>
                    <img src={url} className='rounded-lg max-h-[70vh]' alt={index} />
                </div>
            ))}
        </div>
    );
};
