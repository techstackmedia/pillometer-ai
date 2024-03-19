const truncateWords = (text, wordsLength) => {
  const words = text.split(' ');

  if (words.length <= wordsLength) {
    return text;
  }
  const truncatedText = words.slice(0, wordsLength).join(' ');
  return truncatedText + '...';
};

export default truncateWords;
