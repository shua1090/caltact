import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DynamicContactPage = () => {
  const router = useRouter();
  const { index } = router.query;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch('/api/getContacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            email: localStorage.getItem('email'),
            index
          })
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.contacts);
        } else if (response.status === 401) {
          // Unauthorized, redirect user to login page
          window.location.href = '/signin';
        } else {
          // Handle other error cases as needed
          console.error('Failed to fetch user:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (index) {
      fetchUserData();
    }
  }, [index]);

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-green-900">
          {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
        </h1>
        {userData && (
          <>
            <p className="text-gray-700 mb-2">Email: {userData.email}</p>
            <p className="text-gray-700 mb-2">Phone: {userData.phone}</p>
            <img
              src={userData.profilePhotoURL}
              alt="Profile"
              className="mb-4 rounded-full w-32 h-32 mx-auto"
            />
            <p className="text-gray-700 mb-2">Instagram: {userData.instagram}</p>
            <p className="text-gray-700 mb-2">Snapchat: {userData.snapChat}</p>
            <p className="text-gray-700 mb-2">Discord: {userData.discord}</p>
            <p className="text-gray-700 mb-2">LinkedIn: {userData.linkedin}</p>
            <div className="text-center mt-4">
              <Link href="/" className="text-blue-500 underline hover:text-blue-700">
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicContactPage;
