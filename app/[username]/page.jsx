'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';

const ProfilePage = (props) => {
  const params = use(props.params);
  const username = params.username;
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAthleteByUsername = async (username) => {
    try {
      const response = await fetch(`https://volt-backend.vercel.app/api/athletes/username/${username}`);
      if (!response.ok) {
        throw new Error('Athlete not found');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchAthleteByUsername(username);
      setAthlete(data);
      setLoading(false);
    };

    fetchData();
  }, [username]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!athlete) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Athlete not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center text-center">
        <img
          src={athlete.profile_img || '/default-profile.png'}
          alt={athlete.name}
          className="w-32 h-32 rounded-full shadow-lg"
        />
        <h1 className="mt-4 text-2xl font-bold">{athlete.name}</h1>
        <p className="text-gray-600">@{athlete.username}</p>
        <p className="mt-2">{athlete.bio}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Followers</p>
          <p className="text-lg font-semibold">{athlete.followers_count}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Following</p>
          <p className="text-lg font-semibold">{athlete.following_count}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Clubs</h2>
        {athlete.clubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {athlete.clubs.map((club) => (
              <div
                key={club._id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold">{club.name}</h3>
                <p className="text-gray-500 text-sm">{club.description}</p>
                <p className="mt-2 text-sm">
                  Organizer: <span className="font-semibold">{club.organizer_name}</span>
                </p>
                {club.photos.length > 0 && (
                  <div className="mt-2 flex space-x-2">
                    {club.photos.slice(0, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={club.name}
                        className="w-16 h-16 rounded shadow"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No clubs joined yet.</p>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Certificates</h2>
        {athlete.certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {athlete.certificates.map((cert) => (
              <div
                key={cert._id}
                className={`p-4 border rounded-lg shadow ${
                  cert.visible ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <h3 className="text-lg font-semibold">{cert.sport}</h3>
                <p className="text-sm text-gray-500">{cert.level}</p>
                <p className="mt-2 text-sm">{cert.record}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No certificates available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;