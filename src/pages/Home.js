
import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background.js';

function Home() {
    return (
        <div className="relative min-h-screen bg-[#e9ede6] overflow-hidden">
            <Background
                showLeaf1={true}
                showLeaf2={true}
                showLeaf3={true}
                showGhanaWeaving={true}
                showTwist={true}
                showBraidsStack={true}
                showStitchBraidsStack={true}
            />

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-6xl font-bold font-custom text-[#000]">BraidsByNuria</h1>
                <Link to="/book-appointment" className="bg-orange-500 text-white rounded-xl px-6 py-2 font-medium mt-8 hover:bg-orange-600 transition">
                    Book an Appointment
                </Link>
            </div>
        </div>
    );
}

export default Home;
