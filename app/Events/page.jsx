"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaArrowRight ,FaLink,FaChevronUp,FaChevronDown} from "react-icons/fa";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://volt-backend.vercel.app/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        const sortedEvents = data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
        setEvents(sortedEvents);
        if (sortedEvents.length > 0) {
          setSelectedEvent(sortedEvents[0]);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handlePreviousEvent = () => {
    if (currentEventIndex > 0) {
      setCurrentEventIndex(currentEventIndex - 1);
      setSelectedEvent(events[currentEventIndex - 1]);
    }
  };

  const handleNextEvent = () => {
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(currentEventIndex + 1);
      setSelectedEvent(events[currentEventIndex + 1]);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen dark:text-white">
        <p className="text-gray-600 dark:text-white text-xl">Loading events...</p>
      </div>
    );
  }

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
      <div className="p-6 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mt-24 text-black dark:text-white">Events</h1>
      </div>

      {/* Event List */}
      <div className="relative p-4 md:p-6">
        <div className="relative border-l-2 border-dotted border-gray-400 dark:border-gray-600 ml-4 md:ml-6">
          {Object.entries(groupedEvents).map(([dateString, events]) => {
            const date = new Date(dateString);
            const day = date.toLocaleDateString("en-US", { weekday: "long" });
            const formattedDate = date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <div key={dateString} className="relative mb-8 pl-6 md:pl-10">
                <div className="absolute top-0 left-[-7px] w-3 h-3 md:w-4 md:h-4 bg-gray-400 dark:bg-gray-600 rounded-full border-2 border-gray-500 dark:border-gray-700"></div>
                <div className="text-sm text-black dark:text-gray-400 mb-4 font-bold">
                  {formattedDate} <span className="font-normal text-gray-700">{day}</span>
                </div>

                {events.map((event) => (
                  <div key={event.event_id} className="mb-4">
                    <div
                      className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer flex flex-col md:flex-row"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsBoxVisible(true);
                      }}
                    >
                      <div className="flex-shrink-0 mb-2 md:mb-0 md:mr-4">
                        {event.photos && event.photos.length > 0 ? (
                          <Image
                            src={event.photos[0]}
                            alt={event.event_name}
                            width={100}
                            height={100}
                            className="rounded-md object-cover max-w-full h-auto"
                          />
                        ) : (
                          <div className="h-24 w-24 bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-md">
                            <span className="text-gray-600 dark:text-white">No Image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-black dark:text-white">
                          {event.event_name}
                        </h3>
                        <p className="text-sm text-black dark:text-gray-300">
                          {event.event_description}
                        </p>
                        <div className="text-sm text-black dark:text-gray-400 mt-2 flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          {event.event_location?.address || "TBD"}
                        </div>
                        <div className="text-sm text-black dark:text-gray-400 mt-2 flex items-center">
                          <FaCalendarAlt className="mr-2" />
                          {event.event_date || "TBD"}
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
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay for Event Details */}
      {isBoxVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setIsBoxVisible(false)}
        ></div>
      )}

      {/* Event Details Sliding Box */}
        <div
          className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-white mt-24 dark:bg-gray-900 shadow-lg z-50 p-4 md:p-6 transition-transform transform ${
            isBoxVisible ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="text-2xl px-2 py-1 rounded-lg hover:bg-white hover:text-black text-gray-600 dark:text-gray-300"
              onClick={() => setIsBoxVisible(false)}
            >
              {"\u00BB"}
            </button>
            <Link
              href="/eventspage"
              className="px-4 py-2  text-sm ml-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-xl hover:bg-white hover:text-black flex items-center space-x-2 transition"
            >
              <span>Copy Link </span>
              <FaLink className="transform rotate-[-45deg]" />
            </Link>

            <Link
              href="/eventspage"
              className="px-4 py-2 text-sm ml-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-xl hover:bg-white hover:text-black flex items-center space-x-2 transition"
            >
              <span>Event Page</span>
              <FaArrowRight className="transform rotate-[-45deg]" />
            </Link>
            <button
              className="text-lg ml-40 px-2 py-1  rounded-lg hover:bg-white hover:text-black font-bold text-gray-600 dark:text-gray-300"
              onClick={handlePreviousEvent}
            >
              <FaChevronUp/>
            </button>
            <button
              className="text-lg ml-64 px-2 py-1 rounded-lg hover:bg-white hover:text-black font-bold text-gray-600 dark:text-gray-300"
              onClick={handleNextEvent}
            >
           
              <FaChevronDown/>
            </button>   
          </div>
        
        <div className="border-b border-gray-300 dark:border-gray-700 mt-4"></div>

        

        {selectedEvent && (
          <>
            <div className="flex justify-center mt-4">
              {selectedEvent.photos && selectedEvent.photos.length > 0 ? (
                <Image
                  src={selectedEvent.photos[0]}
                  alt={selectedEvent.event_name}
                  width={300}
                  height={200}
                  className="rounded-md object-cover max-w-full h-auto"
                />
              ) : (
                <div className="h-48 w-72 bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-md">
                  <span className="text-gray-600 dark:text-white">No Image</span>
                </div>
              )}
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white mt-4 text-center">
              {selectedEvent.event_name}
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
