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

export { defaultSigninValues, defaultSignupValues };
