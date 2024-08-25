import { getDownloadURL, listAll } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { ref } from 'firebase/storage';
import { FIREBASE_AUTH, FIREBASE_STORAGE } from '../firebase/firebase';

export const PostsList = ({uid}) => {
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
    }, [imageListRef]);


    return (
        <div>
            {imageList.map((url, index) => (
                <img key={index} src={url} alt={`post-${index}`} />
            ))}
        </div>
    );
};
