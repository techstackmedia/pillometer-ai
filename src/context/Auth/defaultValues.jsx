const defaultSigninValues = {
  email: '',
  password: '',
  keepSignedIn: false,
  isSigningIn: false,
  signinError: null,
  showPassword: false,
  successMessage: null,
  errorMessage: null,
  handleEmailChange: () => {},
  handlePasswordChange: () => {},
  handleLoginCheckboxChange: () => {},
  handleSubmit: () => {},
  togglePasswordVisibility: () => {},
};

const defaultSignupValues = {
  emailReg: '',
  passwordReg: '',
  keepSignedup: false,
  signupError: null,
  errorMessageReg: null,
  isSignup: false,
  handleEmailChangeReg: () => {},
  handlePasswordChangeReg: () => {},
  handleCheckboxChangeReg: () => {},
  handleSignupSubmit: () => {},
  togglePasswordVisibilityReg: () => {},
  showPasswordReg: false,
  successMessageReg: null,
};

const defaultProfileValues = {
  profile: null,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  profession: '',
  discover: '',
  keepUpWithCommunity: false,
  errorMessage: null,
  handleProfileSubmit: () => {},
  updateProfile: () => {},
  handleFirstNameChange: () => {},
  handleLastNameChange: () => {},
  handlePhoneNumberChange: () => {},
  handleProfessionChange: () => {},
  handleDiscoverChange: () => {},
  handleCommunityCheckboxChange: () => {},
  navigateToNextPage: () => {},
  isCurrentPage: false,
};

export { defaultSigninValues, defaultSignupValues, defaultProfileValues };
