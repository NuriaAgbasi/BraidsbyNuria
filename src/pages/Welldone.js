import React from 'react';
import Welldone from '../images/weldone.gif';
import Background from '../components/Background';

function WellDone() {
    return (
        <div className="relative min-h-screen bg-[#e9ede6] overflow-hidden flex items-center justify-center">
            <Background
                showLeaf1={true}
                showLeaf2={true}
                showLeaf3={true}
                showGhanaWeaving={false}
                showTwist={false}
                showBraidsStack={false}
                showStitchBraidsStack={false}
            />
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
                <img
                    src={Welldone}
                    alt="Well Done"
                    className="w-48 mb-6 "
                />
                <h1 className="text-4xl font-bold text-[#A9B49F] mb-4 font-jersey">
                    Well Done!
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    Your appointment has been confirmed. The stylist will review your booking and send you a confirmation email shortly.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="bg-[#A9B49F] z-30 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-[#8a9c7c] transition-colors"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default WellDone;
