import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../supabaseClient';
import Background from '../components/Background.js';
import Confetti from 'react-confetti';

function PickYourStylist() {
    const [stylists, setStylists] = useState([]);
    const [selectedStylist, setSelectedStylist] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

   
    const appointmentId = location.state?.appointmentId;

    useEffect(() => {
        fetchStylists();
    }, []);

    const fetchStylists = async () => {
        const { data, error } = await supabase.from('stylists').select('*');
        if (error) {
            console.error('Error fetching stylists:', error);
        } else {
            setStylists(data);
        }
    };

    const handleStylistSelection = (stylist) => {
        setSelectedStylist(stylist);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    const handleConfirmSelection = () => {
        if (!selectedStylist) {
            alert('Please select a stylist.');
            return;
        }


        navigate('/confirm-your-booking', { state: { appointmentId, stylistId: selectedStylist.id } });
    };

    return (
        <div className="relative min-h-screen bg-[#e9ede6] overflow-hidden">
            {showConfetti && <Confetti className="z-50" />}
            <Background
                showLeaf1={true}
                showLeaf2={true}
                showLeaf3={true}
                showGhanaWeaving={false}
                showTwist={false}
                showBraidsStack={false}
                showStitchBraidsStack={false}
            />
            <div className="mt-16 container mx-auto py-8 flex justify-center items-center flex-wrap">
                <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg w-full max-w-5xl">
                    <div className="relative z-10 text-center">
                        <h1 className="text-5xl mb-9 font-bold text-[#A9B49F]"
                            style={{ fontFamily: 'Matemasie, sans-serif', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                            Pick Your Stylist
                        </h1>

                        <div className="flex flex-wrap justify-center">
                            {stylists.map((stylist) => (
                                <div
                                    key={stylist.id}
                                    className={`p-4 border rounded-md border-gray-300 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg ${selectedStylist?.id === stylist.id ? 'bg-teal-100' : 'bg-white'
                                        }`}
                                    onClick={() => handleStylistSelection(stylist)}
                                    style={{
                                        width: '300px',
                                        height: '420px',
                                        margin: '10px',
                                        textAlign: 'center',
                                        backgroundColor: selectedStylist?.id === stylist.id ? '#949f89' : '#A9B49F',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <img src={stylist.image_url} alt={stylist.name} className="w-24 h-24 rounded-full mb-2 mx-auto" />
                                    <h2 className="text-2xl font-bold" style={{ fontFamily: 'Jersey 10, sans-serif' }}>{stylist.name}</h2>
                                    <p className="text-lg" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                                        {stylist.description}
                                    </p>
                                    <p className="text-sm text-gray-600">{`Available Days: ${stylist.available_days.join(', ')}`}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleConfirmSelection}
                            className="bg-[#A9B49F] text-white px-4 py-2 rounded mt-4"
                        >
                            Confirm Selection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PickYourStylist;
