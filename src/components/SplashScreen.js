import React from 'react';
import { createPortal } from 'react-dom';
import "../App.css"

export const SplashScreen = () => {
    return createPortal(
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
            <img 
                className='h-28 w-28 animate-pulse-logo'
                src='https://firebasestorage.googleapis.com/v0/b/aaesth-e8a6e.appspot.com/o/assets%2Flogo.svg?alt=media&token=a86cf1c4-e005-4762-ac9e-dfe17977f4f6'
            />
        </div>,
        document.body
    );
};

