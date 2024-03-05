import Input from '../../shared/Input';
import styles from './index.module.css';

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
          sx={{ width: 230 }}
        />
        <Input
          type='text'
          name='lastName'
          value={lastName}
          onChange={handleLastNameChange}
          placeholder='Last Name'
          sx={{ width: 230 }}
        />
      </div>
      <Input
        type='tel'
        name='telephone'
        placeholder='Phone number'
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <Input
        type='text'
        name='profession'
        placeholder='profession'
        value={profession}
        onChange={handleProfessionChange}
      />
      <Input
        type='text'
        name='discovered'
        value={discover}
        placeholder='How did you hear about us'
        onChange={handleDiscoverChange}
      />
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
