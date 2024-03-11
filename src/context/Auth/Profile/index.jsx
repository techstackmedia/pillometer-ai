import React, { createContext, useState } from 'react';
import { BASE_AUTH_URL } from '../../../constants';

const AuthProfileContext = createContext();

const AuthProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [discover, setDiscover] = useState('');
  const [keepUpWithCommunity, setKeepUpWithCommunity] = useState(false);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleProfessionChange = (e) => {
    setProfession(e.target.value);
  };

  const handleDiscoverChange = (e) => {
    setDiscover(e.target.value);
  };

  const handleCommunityCheckboxChange = (e) => {
    setKeepUpWithCommunity(e.target.checked);
  };

  const updateProfile = async (token, profileData) => {
    try {
      const response = await fetch(`${BASE_AUTH_URL}/complete-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authentication: `token ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.details);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleProfileSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await updateProfile(token, {
        first_name: firstName,
        last_name: lastName,
        mobile_number: phoneNumber,
        profession: profession,
        app_discovery: discover,
      });
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  return (
    <AuthProfileContext.Provider
      value={{
        profile,
        handleProfileSubmit,
        updateProfile,
        firstName,
        lastName,
        phoneNumber,
        profession,
        discover,
        keepUpWithCommunity,
        handleFirstNameChange,
        handleLastNameChange,
        handlePhoneNumberChange,
        handleProfessionChange,
        handleDiscoverChange,
        handleCommunityCheckboxChange,
      }}
    >
      {children}
    </AuthProfileContext.Provider>
  );
};

export { AuthProfileContext, AuthProfileProvider };
