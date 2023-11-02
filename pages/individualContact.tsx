// pages/individualContact.tsx
import React from 'react';
import Link from 'next/link';
import mockUserData from '../mockUserData.js'; // Update the path accordingly

const IndividualContact = () => {
  return (
    <div>
      <h1>{mockUserData.firstName} {mockUserData.lastName}</h1>
      <p>Email: {mockUserData.email}</p>
      <p>Phone: {mockUserData.phone}</p>
      <p>Profile Photo: <img src={mockUserData.profilePhotoURL} alt="Profile" /></p>
      <p>Instagram: {mockUserData.instagram}</p>
      <p>Snapchat: {mockUserData.snapChat}</p> {/* Correct the property name to 'snapChat' */}
      <p>Discord: {mockUserData.discord}</p>
      <p>LinkedIn: {mockUserData.linkedin}</p>
      {/* Display additional user information here */}
      <Link href="/">Back to Home</Link> {/* Add a link to go back to the homepage */}
    </div>
  );
};

export default IndividualContact;
