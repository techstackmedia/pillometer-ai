import React from 'react';

const formatMessage = (text) => {
  const paragraphs = text
    .split('/n/n')
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);

  const strongRegex = /\*\*(.*?)\*\*/g;
  paragraphs.forEach((paragraph, index) => {
    if (typeof paragraph.props.children === 'string') {
      paragraphs[index] = React.Children.toArray(
        paragraph.props.children.split(strongRegex).map((part, index) => {
          return index % 2 === 0 ? part : <strong key={index}>{part}</strong>;
        })
      );
    }
  });

  return paragraphs.map((paragraph, index) => (
    <div key={index}>{paragraph}</div>
  ));
};

export default formatMessage;
