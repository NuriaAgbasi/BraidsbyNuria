import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient'; 

function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);


    const fetchTestimonials = async () => {
        const { data, error } = await supabase
            .from('testimonials')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching testimonials:', error);
        else setTestimonials(data);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
            .from('testimonials')
            .insert([{ name, message }]);

        if (error) console.error('Error adding testimonial:', error);
        else {
            setName('');
            setMessage('');
            fetchTestimonials();
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="bg-[#d9ded5]  py-16">
            <div className=" lg:flex-row gap-12">
                <div className="flex-1 p-8 bg-[#e9ede6]  rounded-xl shadow-lg">
                    <h2 className="text-4xl font-semibold text-center mb-8">What Our Clients Say</h2>
                    {testimonials.length > 0 && (
                        <div className="relative flex flex-col items-center">
                            <div className="p-6 bg-gray-50 rounded-lg shadow-md">
                                <p className="font-semibold text-xl text-gray-800">{testimonials[currentIndex].name}</p>
                                <p className="mt-4 text-gray-600">{testimonials[currentIndex].message}</p>
                            </div>
                            <div className="flex justify-between mt-6 w-full px-6">
                                <button
                                    onClick={handlePrev}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </div>


                <div className="flex-1 p-8 bg-white rounded-xl shadow-lg">
                    <h2 className="text-4xl font-semibold text-center mb-8">Submit Your Testimonial</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-lg font-medium mb-2 text-gray-800" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2 text-gray-800" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                rows="4"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Testimonials;
