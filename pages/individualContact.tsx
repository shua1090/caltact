// pages/individualContact.tsx
import { useEffect, useState } from 'react';

const IndividualContact = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllUsers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/getContacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          email: localStorage.getItem('email')
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAllUsers(data.contacts);
        setIsLoading(false);
      } else if (response.status === 401) {
        // Unauthorized, redirect user to login page
        window.location.href = '/signin';
      } else {
        // Handle other error cases as needed
        console.error('Failed to fetch users:', response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []); // Run only once when the component mounts

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-green-900">All Users</h1>
        <ul>
          {allUsers.map((user, index) => (
            <li key={index}>
              {Object.entries(user).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IndividualContact;
