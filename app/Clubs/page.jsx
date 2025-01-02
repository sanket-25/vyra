'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const ListedClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('https://volt-backend.vercel.app/api/clubs/listed');
        if (!response.ok) {
          throw new Error('Failed to fetch clubs');
        }
        const data = await response.json();
        setClubs(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center dark:text-white h-screen">
        <div className="text-lg text-gray-600 dark:text-white">Loading clubs...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#ededed] dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mt-24 text-center dark:text-white text-gray-800 mb-10">
        Explore Listed Clubs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clubs.map((club) => (
          <div
            key={club.club_id}
            className="border hover:scale-105 p-6 hover:shadow-lg hover:border-red-400 border-gray-300 text-black p-4 rounded shadow-sm hover:shadow-md transition rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            {/* Club Image */}
            {club.club_img && club.club_img.length > 0 ? (
              <Image
                src={club.club_img[0]}
                alt={club.name}
                width={300}
                height={200}
                className="rounded-t-lg object-cover"
              />
            ) : (
              <div className="h-48 bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-t-lg">
                <span className="text-gray-600 dark:text-white">No Image</span>
              </div>
            )}

            {/* Club Details */}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {club.name}
              </h3>
              <p className="text-sm text-black dark:text-white line-clamp-2 mb-4">
                {club.description || 'No description available'}
              </p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 dark:text-gray-400">🏅</span>
                <span className="text-sm text-black dark:text-white">
                  <strong>Sports Taught:</strong>{' '}
                  {club.sports_taught.join(', ') || 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 dark:text-gray-400">📍</span>
                <span className="text-sm text-black dark:text-white">
                  <strong>Location:</strong>{' '}
                  {club.location?.address || 'Location not specified'}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 dark:text-gray-400">📞</span>
                <span className="text-sm text-black dark:text-white">
                  <strong>Contact:</strong>{' '}
                  {club.contact_numbers.length > 0
                    ? club.contact_numbers.join(', ')
                    : 'No contact info'}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-500 dark:text-gray-400">👥</span>
                <span className="text-sm text-black dark:text-white">
                  <strong>Members:</strong> {club.member_count}
                </span>
              </div>
              <div className="text-sm text-black dark:text-white">
                <strong>Created At:</strong>{' '}
                {new Date(club.created_at).toLocaleDateString()}
              </div>
            </div>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition mt-4">
              Join Club
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListedClubsPage;
