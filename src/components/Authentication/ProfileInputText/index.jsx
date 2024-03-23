import Input from '../../shared/Input';
import styles from './index.module.css';
import dropdownIcon from '../../../images/arrowDropDown.png';
import nigeriaFlag from '../../../images/nigeriaFlag.png';
import Content from '../../shared/Content';
import Logo from '../../../logo.svg';
import { useContext } from 'react';
import { AuthProfileContext } from '../../../context/Auth/Profile';
import Button from '../../shared/Button';

const ProfileInputText = () => {
  const {
    discover,
    lastName,
    firstName,
    profession,
    phoneNumber,
    keepUpWithCommunity,
    handleDiscoverChange,
    handleLastNameChange,
    handleFirstNameChange,
    handleProfessionChange,
    handlePhoneNumberChange,
    handleCommunityCheckboxChange,
    navigateToNextPage,
  } = useContext(AuthProfileContext);
  return (
    <>
      <div className='authMain'>
        <img src={Logo} alt='logo' className='logo' />
        <Content cn='heading'>Let's Get You Started</Content>
        <Content cn={`paragraph ${styles.info}`}>
          This information will help us curate a personalized experience
        </Content>
      </div>
      <div className={styles.header}>
        <img src={Logo} alt='logo' className='logo' />
        <Content cn='heading'>Help us know you better</Content>
      </div>
      <div className={styles.firstLastNameRow}>
        <Input
          type='text'
          name='firstName'
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder='First Name'
        />
        <Input
          type='text'
          name='lastName'
          value={lastName}
          onChange={handleLastNameChange}
          placeholder='Last Name'
        />
      </div>
      <div className={styles.dropdownInput}>
        <Input
          type='tel'
          name='telephone'
          placeholder='Phone number'
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <div className={styles.phoneNumberCode}>
          <img src={nigeriaFlag} alt='nigeria flag icon' />
          <span className={styles.countryCode}>+234</span>
          <img
            className={styles.dropdownCountryCode}
            src={dropdownIcon}
            alt='dropdown icon'
          />
        </div>
      </div>
      <div className={styles.dropdownInput}>
        <Input
          type='text'
          name='profession'
          placeholder='Profession'
          value={profession}
          onChange={handleProfessionChange}
        />
        <img src={dropdownIcon} alt='dropdown icon' />
      </div>
      <div className={styles.dropdownInput}>
        <Input
          type='text'
          name='discovered'
          value={discover}
          placeholder='How did you hear about us'
          onChange={handleDiscoverChange}
        />
        <img src={dropdownIcon} alt='dropdown icon' />
      </div>
      <label className={`paragraph ${styles.checkbox}`}>
        <input
          type='checkbox'
          checked={keepUpWithCommunity}
          onChange={handleCommunityCheckboxChange}
        />
        <span>
          Allow sharing of conversations with pillometer.ai for community
          learning and system improvement.
        </span>
      </label>
      <Button navigateToNextPage={navigateToNextPage}>Proceed</Button>
    </>
  );
};

export default ProfileInputText;
