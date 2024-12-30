'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillAlt } from 'react-icons/fa';

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateCountdown = (date) => {
    const eventDate = new Date(date);
    const diff = eventDate - new Date();
    if (diff < 0) return 'Event Passed';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://volt-backend.vercel.app/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen dark:text-white">
        <p className="text-gray-600 dark:text-white text-xl">Loading events...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full min-h-screen dark:bg-gray-900 dark:text-white">
        {/* Grid Background */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 min-h-screen"
          style={{ gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))' }}
        >
          {Array.from({ length: 40 }).map((_, index) => (
            <div
              key={index}
              className={`border-r border-b border-[#9e9e9e] dark:border-gray-700 ${
                index % 4 === 3 ? 'border-r-0' : ''
              } ${index >= 96 ? 'border-b-0' : ''} aspect-square`}
            />
          ))}
        </div>

        {/* Hero Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-start mt-4 text-black dark:text-white top-[20vh] z-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-center">Discover Events</h1>
          <p className="text-lg mt-4 text-center max-w-2xl px-6 sm:px-12">
            Explore a world of exciting sports events near you. Find competitions,
            workshops, and activities tailored to your interests. Join the action
            and be part of the thrill today!
          </p>
        </div>

        {/* Events Section */}
        <div className="px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 absolute inset-0 items-center text-black dark:text-white mt-16">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="border hover:scale-105 transform transition duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden dark:border-gray-700"
            >
              {/* Event Image */}
              {event.photos && event.photos.length > 0 ? (
                <Image
                  src={event.photos[0]}
                  alt={event.event_name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-white">No Image</span>
                </div>
              )}

              {/* Event Details */}
              <div className="p-4 text-black dark:text-white">
                <h3 className="text-lg font-bold text-black dark:text-white">{event.event_name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{event.event_description}</p>

                <div className="mt-3 space-y-2">
                  <p className="text-sm text-black dark:text-white">
                    <FaMoneyBillAlt className="inline-block text-green-500 mr-2" />
                    <strong>Cost:</strong> {event.event_cost !== null ? `₹${event.event_cost}` : 'Free'}
                  </p>
                  <p className="text-sm text-black dark:text-white">
                    <FaCalendarAlt className="inline-block text-blue-500 mr-2" />
                    <strong>Date:</strong> {event.event_date || 'TBD'}
                  </p>
                  <p className="text-sm text-yellow-600 font-semibold">{calculateCountdown(event.event_date)}</p>
                  <p className="text-sm text-black dark:text-white">
                    <FaMapMarkerAlt className="inline-block text-red-500 mr-2" />
                    <strong>Location:</strong> {event.event_location?.address || 'TBD'}
                  </p>
                </div>

                <p className="text-sm inline-block mt-2 bg-red-200 text-black dark:bg-red-600 dark:text-white rounded-full px-2 py-1 text-xs">
                  <strong>Sports:</strong> {event.sports.join(', ')}
                </p>

                {/* Button */}
                <button
                  className={`mt-4 w-full py-2 text-sm rounded ${event.isRegistered ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'} transition duration-200`}
                >
                  {event.isRegistered ? 'Registered' : 'Register'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;