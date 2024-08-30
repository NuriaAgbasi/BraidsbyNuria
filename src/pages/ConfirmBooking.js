import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import Background from '../components/Background.js';

function ConfirmYourBooking() {
    const location = useLocation();
    const navigate = useNavigate();
    const { appointmentId, stylistId } = location.state || {};

    const [appointment, setAppointment] = useState(null);
    const [stylist, setStylist] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (appointmentId && stylistId) {
            fetchDetails();
        }
    }, [appointmentId, stylistId]);

    const fetchDetails = async () => {
        try {

            const { data: appointmentData, error: appointmentError } = await supabase
                .from('appointments')
                .select('*')
                .eq('id', appointmentId)
                .single();

            if (appointmentError) throw appointmentError;
            setAppointment(appointmentData);


            const { data: stylistData, error: stylistError } = await supabase
                .from('stylists')
                .select('*')
                .eq('id', stylistId)
                .single();

            if (stylistError) throw stylistError;
            setStylist(stylistData);

        } catch (error) {
            console.error('Error fetching details:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {

        navigate('/well-done');
    };

    return (
        <div className="relative min-h-screen bg-[#e9ede6] overflow-hidden">
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
                            Confirm Your Booking
                        </h1>

                        {loading ? (
                            <p className="text-xl">Loading your booking details...</p>
                        ) : appointment && stylist ? (
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                                <h1 className="text-3xl font-bold mb-4 text-center text-[#A9B49F]">Appointment Details</h1>

                                <div className="border-b border-gray-300 pb-4 mb-4">
                                    <p className="text-xl mb-2">
                                        <strong className="font-semibold text-xl font-jersey">Appointment ID:</strong> {appointment.id}
                                    </p>
                                    <p className="text-xl mb-2">
                                        <strong className="font-semibold text-xl font-jersey">Services:</strong> {appointment.services.map(service => service.name).join(', ')}
                                    </p>
                                    <p className="text-xl mb-2">
                                        <strong className="font-semibold text-xl font-jersey">Date:</strong> {appointment.appointment_date}
                                    </p>
                                    <p className="text-xl mb-2">
                                        <strong className="font-semibold text-xl font-jersey">Total Price:</strong> ${appointment.total_price}
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold mb-4 text-[#A9B49F]">Stylist Details</h2>

                                <div className="space-y-2">
                                    <p className="text-xl mb-2">
                                        <strong className="font-semibold text-xl font-jersey">Name:</strong> {stylist.name}
                                    </p>
                                    <p className="text-xl mb-2">
                                        <strong className="font-semibold text-xl font-jersey">Email:</strong> {stylist.email}
                                    </p>
                                    <p className="text-xl mb-2">
                                        <strong className="font-semibold text-xl font-jersey">Phone:</strong> {stylist.phone}
                                    </p>
                                </div>
                                <div className="text-center mb-4">
                                    <p className="text-sm text-gray-600">
                                        The Stylist will contact you about the details of your appointment.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <button
                                        onClick={handleConfirm}
                                        className="bg-[#A9B49F] text-white px-4 py-2 rounded-lg"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xl">
                                Unable to retrieve booking details. Please try again.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmYourBooking;
