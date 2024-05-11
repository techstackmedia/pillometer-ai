const defaultChatDetailsValues = {
  handleChatQAResponses: () => {},
  chats: null,
  error: null,
  err: null,
  serverError: null,
  handleChatList: () => {},
  redirectToDetails: false,
  chat: null,
  chatId: null,
  isSendingMessage: false,
};

const defaultMessagesValues = {
  handleClick: () => {},
  isloginModal: false,
  setIsLoginModal: () => {},
};

const defaultNewPostValues = {
  createNewPost: () => {},
  errorMessage: null,
  errorAltMessage: null,
  sendNewPost: () => {},
  res: null,
  err: null,
  Ref: null,
  errDetail: null,
  handleMenuToggle: () => {},
  isOpen: false,
  setIsOpen: () => {},
};

const defaultWebSocketServiceValues = {
  sendMessageToServer: () => {},
  connectionErrorMessage: null,
  connectionMessage: null,
  connectionWarnMessage: null,
  response: '',
  handleViewMoreClick: () => {},
  height: 32,
  handleChange: () => {},
  handleNewSocketConnection: () => {},
  startListening: () => {},
  stopListening: () => {},
  handleTextToSpeech: () => {},
  value: '',
  viewMore: false,
  transcript: '',
  uniqueArray: [],
  valueLength: 0,
  listening: false,
  newPostData: null,
  transcription: '',
  setHeight: () => {},
  setValue: () => {},
  connectWebSocket: () => {},
  isWebSocketConnected: false,
  handleInputChange: () => {},
  selectedSymptoms: [],
  mySymptoms: '',
  isSent: false,
  setIsSent: () => {},
  newResponse: null,
  requestHistory: [],
  responseHistory: [],
};

const defaultAuthForgotPassswordResetValues = {
  handleForgotPasswordSubmit: () => {},
  handleEmailChange: () => {},
  forgotPasswordErrorMessage: null,
  forgotPasswordSuccessMessage: null,
  forgotPasswordErrorAltMessage: null,
};

const defaultAuthProfileValues = {
  profile: null,
  handleProfileSubmit: () => {},
  updateProfile: () => {},
  firstName: '',
  lastName: '',
  phoneNumber: '',
  profession: '',
  discover: '',
  keepUpWithCommunity: false,
  handleFirstNameChange: () => {},
  handleLastNameChange: () => {},
  handlePhoneNumberChange: () => {},
  handleProfessionChange: () => {},
  handleDiscoverChange: () => {},
  handleCommunityCheckboxChange: () => {},
  navigatePage: () => {},
  isCurrentPage: false,
  errorMessage: null,
  profileResponse: null,
  getProfile: () => {},
  profileError: null,
  userType: null,
  firstMessage: null,
  selectedOption: '',
  handleOptionChange: () => {},
  handleFormClick: () => {},
  secondMessage: null,
};

const defaultAuthSignupValues = {
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

const defaultAuthResetPasswordValues = {
  password: '',
  resetMessage: null,
  resetPasswordErrorMessage: null,
  resetPasswordErrorAltMessage: null,
  resetPasswordSuccessMessage: null,
  handleResetPasswordSubmit: () => {},
  handlePasswordChange: () => {},
};

const defaultAuthSigninValues = {
  email: '',
  password: '',
  keepSignedIn: false,
  signinError: null,
  errorMessage: null,
  isSigningIn: false,
  handleEmailChange: () => {},
  handlePasswordChange: () => {},
  handleLoginCheckboxChange: () => {},
  handleSigninSubmit: () => {},
  togglePasswordVisibility: () => {},
  showPassword: false,
};

const defaultNetworkStatusValues = {
  internetConnection: null,
};

export {
  defaultChatDetailsValues,
  defaultMessagesValues,
  defaultNewPostValues,
  defaultWebSocketServiceValues,
  defaultAuthForgotPassswordResetValues,
  defaultAuthProfileValues,
  defaultAuthSignupValues,
  defaultAuthResetPasswordValues,
  defaultAuthSigninValues,
  defaultNetworkStatusValues,
};
