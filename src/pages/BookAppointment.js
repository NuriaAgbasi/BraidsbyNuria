import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import Background from '../components/Background.js';

function BookAppointment() {
    const [user, setUser] = useState(null);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [expandedCategory, setExpandedCategory] = useState(null); 
    const [appointmentDate, setAppointmentDate] = useState(''); 
    const navigate = useNavigate();

    const serviceCategories = [
        {
            category: 'Braids/Extensions',
            services: [
                { id: 1, name: 'Afro Kinky Twist', duration: '5hrs', price: 80, deposit: 24 },
                { id: 2, name: 'Knotless Braids - Jumbo Sized', duration: '4hrs', price: 100, deposit: 30 },
                { id: 3, name: 'Knotless Braids - Large Sized', duration: '5hrs', price: 120, deposit: 36 },
                { id: 4, name: 'Knotless Braids - Medium Sized', duration: '7hrs', price: 140, deposit: 42 },
                { id: 5, name: 'Knotless Braids - Small Sized', duration: '8hrs', price: 200, deposit: 60 },
                { id: 6, name: 'Cornrows With Extensions - Medium Sized', duration: '3hrs', price: 80, deposit: 24 },
                { id: 7, name: 'Cornrows With Extensions - Small Sized', duration: '4hrs 30mins', price: 115, deposit: 34.50 },
                { id: 8, name: 'Cornrows With Extensions - Large Sized', duration: '2hrs 15mins', price: 60, deposit: 18 },
                { id: 9, name: 'Crochet Braid', duration: '2hrs 30mins', price: 115, deposit: 34.50 },
                { id: 10, name: 'Small-Sized Box Braids', duration: '7hrs', price: 180, deposit: 54 },
                { id: 11, name: 'Medium-Sized Box Braids', duration: '4hrs 50mins', price: 150, deposit: 45 },
                { id: 12, name: 'Large-Sized Box Braids', duration: '3hrs 30mins', price: 100, deposit: 30 },
                { id: 15, name: 'Goddess Braids', duration: '5hrs 30mins', price: 130, deposit: 39 },
                { id: 18, name: 'Bohemian Braids', duration: '5hrs 30mins', price: 125, deposit: 37.50 },
            ],
        },
    ];

    useEffect(() => {
        checkUser();
        if (serviceCategories.length > 0) {
            setExpandedCategory(serviceCategories[0].category);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchAppointments();
        }
    }, [user]);

    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
    };

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.error('Error signing in with Google:', error.message);
        } else {
            console.log('Google sign-in successful!');
        }
    };

    const handleServiceSelection = (service) => {
        const isSelected = selectedServices.some((s) => s.id === service.id);
        let newSelectedServices;

        if (isSelected) {
            newSelectedServices = selectedServices.filter((s) => s.id !== service.id);
        } else {
            newSelectedServices = [...selectedServices, service];
        }

        setSelectedServices(newSelectedServices);
        calculateTotalPrice(newSelectedServices);
    };

    const calculateTotalPrice = (services) => {
        const price = services.reduce((total, service) => total + service.price, 0);
        setTotalPrice(price);
    };

    const handleBooking = async () => {
        if (!user) {
            alert('Please sign in to book an appointment.');
            return;
        }

        if (selectedServices.length === 0 || !phone || !firstName || !lastName || !email || !appointmentDate) {
            alert('Please fill in all fields and select at least one service.');
            return;
        }

        const { data, error } = await supabase
            .from('appointments')
            .insert([{
                user_id: user.id,
                services: selectedServices,
                phone,
                total_price: totalPrice,
                first_name: firstName,
                last_name: lastName,
                email,
                appointment_date: appointmentDate,
            }])
            .select(); 

        if (error) {
            console.error('Error booking appointment:', error);
            return;
        }

        console.log('Insert data:', data); 

        if (data && data.length > 0) {
            const appointmentId = data[0].id; 
            alert('Appointment booked successfully!');
            setSelectedServices([]);
            setPhone('');
            setEmail('');
            setFirstName('');
            setLastName('');
            setAppointmentDate('');
            fetchAppointments();
            sendNotification();

            navigate('/pick-your-stylist', { state: { appointmentId } });
        } else {
            console.error('Unexpected error: No data returned from appointment booking.');
        }
    };



    const fetchAppointments = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                console.error('Error fetching appointments:', error);
            } else {
                setAppointments(data);
            }
        }
    };

    const sendNotification = async () => {
        console.log('Notification sent to admin with booking details.');
    };

    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
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
            <div className="booking-page mt-28 container mx-auto py-8 flex justify-center items-start">
                <div className="flex flex-col space-y-2 mr-4 z-20">
                    {serviceCategories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => toggleCategory(category.category)}
                            className={`text-left text-lg bg-[#A9B49F] font-semibold p-2 rounded transition-all ${expandedCategory === category.category ? 'bg-gray-200' : 'bg-gray-100'
                                }`}
                            style={{ zIndex: 10 }}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                {/* Main Content Box */}
                <div className="bg-[#F5F3EE] p-8 rounded-lg shadow-lg w-full max-w-3xl">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <h1
                            className="text-5xl font-bold text-[#A9B49F] mb-4"
                            style={{
                                fontFamily: 'Matemasie, sans-serif',
                                textShadow: `
                                    -1px -1px 0 #000,  /* Top Left */
                                    1px -1px 0 #000,   /* Top Right */
                                    -1px 1px 0 #000,   /* Bottom Left */
                                    1px 1px 0 #000    /* Bottom Right */
                                `,
                            }}
                        >
                            Book Your Appointment
                        </h1>

                        <div className="w-full flex flex-col items-center space-y-4">
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="p-2 border border-gray-300 rounded w-full max-w-md"
                            />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="p-2 border border-gray-300 rounded w-full max-w-md"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="p-2 border border-gray-300 rounded w-full max-w-md"
                            />
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Phone"
                                className="p-2 border border-gray-300 rounded w-full max-w-md"
                            />
                            <input
                                type="date"
                                value={appointmentDate}
                                onChange={(e) => setAppointmentDate(e.target.value)}
                                placeholder="Appointment Date"
                                className="p-2 border border-gray-300 rounded w-full max-w-md"
                            />

                            {serviceCategories.map((category) => (
                                <div key={category.category} className="text-left w-full max-w-md">
                                    {expandedCategory === category.category && (
                                        <>
                                            <h2 className="text-xl font-bold mb-2">{category.category}</h2>
                                            {category.services.map((service) => (
                                                <div
                                                    key={service.id}
                                                    className={` my-2 cursor-pointer transition-colors ${selectedServices.some((s) => s.id === service.id) ? 'bg-teal-100' : 'bg-white'
                                                        }`}
                                                    onClick={() => handleServiceSelection(service)}
                                                >
                                                    <div className="flex flex-col p-3 border border-gray-300 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-lg font-semibold">{service.name}</span>
                                                            <div className="text-right">
                                                                <div className="text-lg font-medium">£{service.price}</div>
                                                                <div className="text-sm text-gray-600">Deposit: £{service.deposit}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="text-center mb-4">
                            <p className="text-sm text-gray-600">
                                A deposit is required to secure your appointment. This deposit is non-refundable but will be deducted from your total service cost. Deposits ensure that the time slot is reserved just for you.
                            </p>
                        </div>

                        <div className="flex flex-col items-center mt-6">
                            {user ? (
                                <>
                                    <button
                                        onClick={handleBooking}
                                        className="bg-[#A9B49F] text-white px-4 py-2 rounded mb-4"
                                    >
                                        Book Appointment
                                    </button>
                                    <p>Total Price: ${totalPrice}</p>
                                </>
                            ) : (
                                <button
                                    onClick={signInWithGoogle}
                                    className="bg-[#A9B49F] text-white px-4 py-2 rounded"
                                >
                                    Sign in with Google
                                </button>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookAppointment;
