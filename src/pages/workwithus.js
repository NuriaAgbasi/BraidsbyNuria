
import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background'

const WorkWithUs = () => {
    return (
        <div className=" flex flex-col items-center py-12 relative min-h-screen bg-[#e9ede6] overflow-hidden">
            <Background
                showLeaf1={true}
                showLeaf2={true}
                showLeaf3={true}
                showGhanaWeaving={false}
                showTwist={false}
                showBraidsStack={false}
                showStitchBraidsStack={false}
            />
            <div className="bg-[#F5F3EE] mt-5 p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1
                    className="text-5xl text-center font-bold text-[#A9B49F] mb-4"
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
                    🌟 Work With Us at BraidsByNuria! 🌟
                </h1>
                <p className="text-lg text-gray-700 mb-6 text-center">
                    Hey there, future star! Are you passionate about braiding and looking for a vibrant place to shine? You’ve come to the right spot! At BraidsByNuria, we're all about celebrating amazing braiders who can add their magic to our community. 🌈✨
                </p>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#A9B49F] mb-4">🎉 Why Join Us?</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-4">
                        <li><strong>Be a Part of Our Growing Family:</strong> Join a team where your skills are celebrated, and your creativity knows no bounds.</li>
                        <li><strong>Flexible Hours:</strong> Whether you're a night owl or an early bird, we’ve got flexible hours that fit your lifestyle. 🕒🌟</li>
                        <li><strong>Exciting Opportunities:</strong> As we grow, so do the opportunities. From special events to collaborations, you’ll always find something new and exciting to be a part of.</li>
                        <li><strong>Supportive Community:</strong> Here, you’re never alone. Our supportive team is here to help you thrive and reach your full potential. 🤝💕</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#A9B49F] mb-4">💪 What We’re Looking For</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-4">
                        <li><strong>Have a Passion for Braiding:</strong> Whether you're a pro or just starting, if you love braiding, we want to hear from you!</li>
                        <li><strong>Great Communication Skills:</strong> Interact with clients and fellow stylists with a smile. 😄📞</li>
                        <li><strong>Professionalism and Punctuality:</strong> We value your time and commitment as much as our clients do. ⏰💼</li>
                        <li><strong>A Friendly and Bubbly Attitude:</strong> We’re all about good vibes! 🌟😊</li>
                    </ul>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-[#A9B49F] mb-4">📋 Qualifications</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-4">
                        <li>Have experience in braiding (formal training is a plus, but not required!).</li>
                        <li>Be enthusiastic and willing to learn.</li>
                        <li>Have a reliable phone for client communication. 📱💬</li>
                    </ul>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-[#A9B49F] mb-4">📞 Get in Touch!</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Ready to bring your braiding skills to the next level? We’d love to hear from you! Reach out to us at:
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                        <span className="block">Email: <a href="mailto:braidsbynuria@gmail.com" className="text-[#A9B49F] hover:underline">braidsbynuria@gmail.com</a> ✉️</span>
                    </p>
                    <p className="text-lg text-gray-700 mt-6">
                        Drop us a message, and let’s start this exciting journey together! 🚀✨
                    </p>
                    <Link to="/" className="mt-8 inline-block bg-[#A9B49F] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#8a9b7f]">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WorkWithUs;
