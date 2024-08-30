import React from 'react';
import ErrorImage from '../images/error.gif'
import Background from '../components/Background.js';

const ErrorPage = () => {
    return (
        <div className="relative min-h-screen bg-[#e9ede6] overflow-hidden">
            <div className="flex flex-col items-center justify-center min-h-screen text-[#556B2F]">

                <Background
                    showLeaf1={true}
                    showLeaf2={true}
                    showLeaf3={true}
                    showGhanaWeaving={false}
                    showTwist={false}
                    showBraidsStack={false}
                    showStitchBraidsStack={false}
                />

                <img
                    src={ErrorImage}
                    alt="404 illustration"
                    className="w-72 mb-8"
                />
                <h1 className="italic text-8xl font-bold mb-4">404</h1>
                <p className="text-2xl mb-2">uh oh! There was an error!</p>
                <a href="/" className="text-lg text-[#556B2F] hover:text-[#8FBC8F] underline">
                    go back!!!
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;
