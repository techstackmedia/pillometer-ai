import { createContext, useState } from 'react';
import { BASE_AUTH_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { defaultProfileValues } from '../defaultValues';

const AuthProfileContext = createContext(defaultProfileValues);

const AuthProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profession, setProfession] = useState('');
  const [discover, setDiscover] = useState('');
  const [keepUpWithCommunity, setKeepUpWithCommunity] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [profileResponse, setProfileResponse] = useState(null);
  const navigate = useNavigate();

  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const navigateToNextPage = () => {
    setIsCurrentPage(true);
  };

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

  const getProfile = async (token) => {
    try {
      const response = await fetch(`${BASE_AUTH_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProfileResponse(data);
      }
    } catch {}
  };

  const updateProfile = async (token, profileData) => {
    try {
      const response = await fetch(`${BASE_AUTH_URL}/complete-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.details);
        navigate('/', { state: { profile: data.details } });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
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
      setErrorMessage(error.message);
    }
  };

  const values = {
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
    navigateToNextPage,
    isCurrentPage,
    errorMessage,
    profileResponse,
    getProfile,
  };

  return (
    <AuthProfileContext.Provider value={values}>
      {children}
    </AuthProfileContext.Provider>
  );
};

export { AuthProfileContext, AuthProfileProvider };
