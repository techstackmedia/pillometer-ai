import { createContext, useEffect, useState } from 'react';
import { BASE_AUTH_URL } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { token } from '../../../constants';
import { defaultAuthProfileValues } from '../../defaultValues';

const AuthProfileContext = createContext(defaultAuthProfileValues);

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
  const [profileError, setProfileError] = useState(null);
  const [firstMessage, setFirstMessage] = useState(null);
  const [secondMessage, setSecondMessage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();

  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const navigatePage = () => {
    if (firstName && lastName) {
      setIsCurrentPage(true);
    } else {
      setFirstMessage('First Name and Last Name Required');
      setTimeout(() => {
        setFirstMessage(null);
      }, 3000);
    }
  };

  const handleFormClick = () => {
    if (!selectedOption) {
      setSecondMessage('Select one of the checkbox options');
      setTimeout(() => {
        setSecondMessage(null);
      }, 3000);
    }
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

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const getProfile = async () => {
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
      } else {
        setProfileError(data.details);
      }
    } catch (e) {
      setProfileError(e.message);
    }
  };

  useEffect(() => {
    if (profileResponse) {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userType = profileResponse?.user_type;

  const updateProfile = async (profileData) => {
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
        setProfile(data?.details);
        navigate('/', { state: { profile: data?.details } });
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        mobile_number: phoneNumber,
        profession: profession,
        app_discovery: discover,
        user_type: selectedOption,
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
    navigatePage,
    isCurrentPage,
    errorMessage,
    profileResponse,
    getProfile,
    profileError,
    userType,
    firstMessage,
    selectedOption,
    handleOptionChange,
    handleFormClick,
    secondMessage,
  };

  return (
    <AuthProfileContext.Provider value={values}>
      {children}
    </AuthProfileContext.Provider>
  );
};

export { AuthProfileContext, AuthProfileProvider };
