import Input from '../../shared/Input';
import styles from './index.module.css';
import dropdownIcon from '../../../images/arrowDropDown.png';
import nigeriaFlag from '../../../images/nigeriaFlag.png';

const Register = ({
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
}) => {
  return (
    <div>
      <div className={styles.firstLastNameRow}>
        <Input
          type='text'
          name='firstName'
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder='First Name'
          sx={{ width: 330 }}
        />
        <Input
          type='text'
          name='lastName'
          value={lastName}
          onChange={handleLastNameChange}
          placeholder='Last Name'
          sx={{ width: 330 }}
        />
      </div>
      <div className={styles.dropdownInput}>
        <Input
          type='tel'
          name='telephone'
          placeholder='Phone number'
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          sx={{ textIndent: 120 }}
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
      <label className='paragraph' style={{ display: 'flex' }}>
        <input
          type='checkbox'
          checked={keepUpWithCommunity}
          onChange={handleCommunityCheckboxChange}
        />
        <span style={{ marginLeft: 5 }}>
          Allow sharing of conversations with pillometer.ai for community
          learning and system improvement.
        </span>
      </label>
    </div>
  );
};

export default Register;
