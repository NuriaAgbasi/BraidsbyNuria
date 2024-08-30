import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient';

function StylistDashboard() {
    const [stylist, setStylist] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = supabase.auth.user();
                if (user) {
                    const { data: stylistData, error: stylistError } = await supabase
                        .from('stylists')
                        .select('*')
                        .eq('id', user.id)
                        .single();
                    if (stylistError) throw stylistError;
                    setStylist(stylistData);

                    const { data: appointmentsData, error: appointmentsError } = await supabase
                        .from('appointments')
                        .select('*')
                        .eq('stylist_id', user.id);
                    if (appointmentsError) throw appointmentsError;
                    setAppointments(appointmentsData);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleAccept = async (appointmentId) => {
        try {
            const { error } = await supabase
                .from('appointments')
                .update({ status: 'accepted' })
                .eq('id', appointmentId);
            if (error) throw error;
            setAppointments((appointments) =>
                appointments.map((appointment) =>
                    appointment.id === appointmentId ? { ...appointment, status: 'accepted' } : appointment
                )
            );
        } catch (error) {
            console.error('Error updating appointment:', error.message);
        }
    };

    const handleReject = async (appointmentId) => {
        try {
            const { error } = await supabase
                .from('appointments')
                .update({ status: 'rejected' })
                .eq('id', appointmentId);
            if (error) throw error;
            setAppointments((appointments) =>
                appointments.map((appointment) =>
                    appointment.id === appointmentId ? { ...appointment, status: 'rejected' } : appointment
                )
            );
        } catch (error) {
            console.error('Error updating appointment:', error.message);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen bg-[#e9ede6] p-4">
            <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#A9B49F]">Stylist Dashboard</h1>
                {stylist && (
                    <div className="space-y-4 mb-8">
                        <h2 className="text-2xl font-bold mb-2">Profile Information</h2>
                        <p><strong>Name:</strong> {stylist.name}</p>
                        <p><strong>Email:</strong> {stylist.email}</p>
                        <p><strong>Phone:</strong> {stylist.phone}</p>
                        {/* Add more profile details as needed */}
                    </div>
                )}
                <h2 className="text-2xl font-bold mb-2">Appointments</h2>
                {appointments.length > 0 ? (
                    <div className="space-y-4">
                        {appointments.map((appointment) => (
                            <div key={appointment.id} className="p-4 border border-gray-300 rounded-lg">
                                <p><strong>Appointment ID:</strong> {appointment.id}</p>
                                <p><strong>Client:</strong> {appointment.client_name}</p>
                                <p><strong>Date:</strong> {appointment.date}</p>
                                <p><strong>Status:</strong> {appointment.status}</p>
                                <div className="flex justify-between mt-2">
                                    <button
                                        onClick={() => handleAccept(appointment.id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(appointment.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No appointments available.</p>
                )}
            </div>
        </div>
    );
}

export default StylistDashboard;
