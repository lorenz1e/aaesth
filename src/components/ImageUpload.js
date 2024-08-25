import React, { useState } from 'react'
import { FIREBASE_STORAGE } from '../firebase/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { createPost } from '../firebase/firestore';
 
export const ImageUpload = () => {
    const [imageUpload, setImageUpload] = useState(null );

    return (
        <div>
            <input type='file' onChange={(inp) => setImageUpload(inp.target.files[0])} />
            <button onClick={() => createPost(imageUpload)}>Upload</button>
        </div>

    )
}
