import React from 'react';
import { createPortal } from 'react-dom';
import { Spinner } from 'react-activity';

export const SplashScreen = () => {
    return createPortal(
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50"/>,
        document.body
    );
};
