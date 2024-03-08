const truncateWords = (text) => {
  // Split the text into an array of words
  const words = text.split(' ');

  if (words.length <= 20) {
    return text;
  }
  const truncatedText = words.slice(0, 20).join(' ');
  return truncatedText + '...';
};

export default truncateWords;
