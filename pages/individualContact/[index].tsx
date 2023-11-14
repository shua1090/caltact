// pages/individualContact/[index].tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      {userData ? (
        <div>
          {Object.entries(userData).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default DynamicContactPage;
