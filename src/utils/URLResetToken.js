const resetToken = () => {
  const url = window.location.href;
  const tokenStartIndex = url.indexOf('token=') + 'token='.length;
  const tokenEncoded = url.substring(tokenStartIndex);
  const token = decodeURIComponent(tokenEncoded);
  return token;
};

export default resetToken;
