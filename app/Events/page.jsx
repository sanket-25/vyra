'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://volt-backend.vercel.app/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        // Sort events by event_date in ascending order
        const sortedEvents = data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
        setEvents(sortedEvents);
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

  // Group events by date
  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = new Date(event.event_date).toDateString();
    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }
    acc[eventDate].push(event);
    return acc;
  }, {});

  return (
    <div className="relative w-full min-h-screen dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="p-6 shadow-md">
        <h1 className="text-3xl font-bold mt-20 text-black dark:text-white">Events</h1>
      </div>

      {/* Timeline Section */}
      <div className="relative p-6">
        <div className="relative border-l-2 border-dotted border-gray-400 dark:border-gray-600 ml-6">
          {Object.entries(groupedEvents).map(([dateString, events]) => {
            const date = new Date(dateString);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            const formattedDate = date.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div key={dateString} className="relative mb-8 pl-10">
                {/* Timeline Dot */}
                <div className="absolute top-0 left-[-7px] w-4 h-4 bg-gray-400 dark:bg-gray-600 rounded-full border-2 border-gray-500 dark:border-gray-700"></div>

                {/* Event Date and Day */}
                <div className="text-sm text-black dark:text-gray-400 mb-4 font-bold">
                  {formattedDate} <span className="font-normal text-gray-700">{day}</span>
                </div>

                {/* Events on the same date */}
                {events.map((event) => (
                  <div key={event.event_id} className="mb-4">
                    {/* Event Card */}
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition">
                      <div className="flex items-start">
                        {/* Event Image */}
                        <div className="flex-shrink-0 mr-4">
                          {event.photos && event.photos.length > 0 ? (
                            <Image
                              src={event.photos[0]}
                              alt={event.event_name}
                              width={100}
                              height={100}
                              className="rounded-md object-cover"
                            />
                          ) : (
                            <div className="h-24 w-24 bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-md">
                              <span className="text-gray-600 dark:text-white">No Image</span>
                            </div>
                          )}
                        </div>

                        {/* Event Details */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-black dark:text-white">
                            {event.event_name}
                          </h3>
                          <p className="text-sm text-black dark:text-gray-300">
                            {event.event_description}
                          </p>
                          <div className="text-sm text-black dark:text-gray-400 mt-2 flex items-center">
                            <FaMapMarkerAlt className="mr-2" />
                            {event.event_location?.address || 'TBD'}
                          </div>
                          <div className="text-sm text-black dark:text-gray-400 mt-2 flex items-center">
                            <FaCalendarAlt className="mr-2" />
                            {event.event_date || 'TBD'}
                          </div>
                          <div className="text-sm text-black dark:text-gray-400 mt-2 flex items-center">
                            <FaUsers className="mr-2" />
                            {event.attendees?.length || 0} Attendees
                          </div>
                          {event.sold_out && (
                            <span className="text-xs text-red-600 font-semibold mt-2 inline-block">
                              Sold Out
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
