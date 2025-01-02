'use client';

import { useState, useEffect } from 'react';
import { sendOTP, verifyOTP, registerUser, checkUsername } from '../lib/apiClient';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

const JoinPage = () => {
    const [contact, setContact] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Enter Contact, 2: Verify OTP, 3: Register
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        type: 'athlete',
    });

    const handleSendOTP = async () => {
        try {
            const response = await sendOTP(contact);
            console.log(response.data);
            localStorage.setItem('athleteId', response.data.athlete_id);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await verifyOTP(contact, otp);
            console.log(response.data);
            if (response.data.isLogin) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('profileImg', response.data.profile_img)
                setStep(4);
            } else {
                setStep(3);
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    const handleRegister = async () => {
        try {
            const response = await registerUser({ contact, ...userData });
            console.log(response.data);
            localStorage.setItem('isLoggedIn', 'true');
            setStep(4);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    const handleCheckUsername = async (username) => {
        try {
            const response = await checkUsername(username);
            return !response.data.exists;
        } catch (err) {
            setError('Error checking username');
            return false;
        }
    };

    return (
        <>
            <div className="relative w-full min-h-screen dark:bg-gray-900 dark:text-white">
                {/* Grid Background with separate styles for light and dark themes */}
                <div
                    className="absolute top-0 left-0 w-full h-full grid grid-cols-4 gap-0 min-h-screen"
                    style={{
                        gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
                        zIndex: -1,
                    }}
                >
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className={`border-r border-b dark:border-gray-700 border-[#9e9e9e] ${
                                index % 4 === 3 ? "border-r-0" : ""
                            } ${index >= 40 ? "border-b-0" : ""} aspect-square`}
                        />
                    ))}
                </div>

                {/* Box Overlaying on the Grid */}
                <div className="relative max-w-md mx-auto p-6 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-3xl h-auto mb-20 mt-40 z-10">
                    <h1 className="text-xl font-bold mb-4 text-black dark:text-white text-center">VYRA WELCOMES YOU!</h1>
                    <h1 className="text-xl mt-2 mb-4 text-black dark:text-white text-center">JOIN VYRA</h1>
                    {error && <p className="text-red-500">{error}</p>}

                    {step === 1 && (
                        <>
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="Enter your email or phone number"
                                className="w-full p-2 border rounded mb-4 text-black dark:text-white dark:bg-gray-600"
                            />
                            <button
                                onClick={handleSendOTP}
                                className="w-full bg-red-600 text-black dark:bg-red-500 dark:text-white hover:bg-green-600 p-2 rounded"
                            >
                                Send OTP
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full p-2 border rounded mb-4 dark:text-white dark:bg-gray-600"
                            />
                            <button
                                onClick={handleVerifyOTP}
                                className="w-full bg-blue-600 text-white p-2 rounded"
                            >
                                Verify OTP
                            </button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <input
                                type="text"
                                value={userData.username}
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                onBlur={async () => {
                                    const valid = await handleCheckUsername(userData.username);
                                    if (!valid) setError('Username already taken');
                                }}
                                placeholder="Choose a username"
                                className="w-full p-2 border rounded mb-4 dark:text-white dark:bg-gray-600"
                            />
                            <input
                                type="text"
                                value={userData.name}
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                placeholder="Your full name"
                                className="w-full p-2 border rounded mb-4 dark:text-white dark:bg-gray-600"
                            />
                            <button
                                onClick={handleRegister}
                                className="w-full bg-blue-600 text-white p-2 rounded"
                            >
                                Register
                            </button>
                        </>
                    )}

                    {step === 4 && <p className="text-green-500">Registration complete! Welcome to VYRA.</p>}

                    {/* Social Media Sign Up Buttons */}
                    <div className="my-4 flex items-center">
                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                        <span className="mx-2 text-gray-500 dark:text-white">OR</span>
                        <hr className="flex-grow border-t border-gray-300 dark:border-gray-600" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <button className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center">
                            <FaGoogle className="mr-2" /> Sign Up with Google
                        </button>
                        <button className="w-full bg-blue-500 text-white p-2 mt-3 rounded flex items-center justify-center">
                            <FaFacebook className="mr-2" /> Sign Up with Facebook
                        </button>
                        <button className="w-full bg-black text-white p-2 mt-3 rounded flex items-center justify-center">
                            <FaApple className="mr-2" /> Sign Up with Apple
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JoinPage;