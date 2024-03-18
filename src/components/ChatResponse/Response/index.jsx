import Content from '../../shared/Content';
import styles from './index.module.css';
import logo from '../../../logo.svg';
import CopyIcon from '../CopyIcon';
import { useLocation } from 'react-router-dom';
import QAIcon from '../QAIcon';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';

const Response = ({ message, reference_no, newRes }) => {
  const { pathname } = useLocation();
  const [textCopied, setTextCopied] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const handleCopy = () => {
    setTextCopied(true);
    setTimeout(() => {
      setTextCopied(null);
    }, [3000]);
    navigator.clipboard
      .writeText(message)
      .then(() => {
        console.log('Text copied to clipboard:', message);
      })
      .catch((error) => {
        console.error('Error copying text:', error);
      });
  };
  console.log(textCopied);

  return (
    <div className={styles.chatResponse}>
      <img src={logo} alt='user profile' className={styles.userProfileImage} />
      <div className={styles.chatResponseCol}>
        <Content cn={`paragraph ${styles.chatResponseParagraph}`}>
          <Markdown remarkPlugins={[remarkGfm]}>{message}</Markdown>
        </Content>
        {newRes && (
          <Content cn={`paragraph ${styles.chatResponseParagraph}`}>
            <Markdown remarkPlugins={[remarkGfm]}>{newRes}</Markdown>
          </Content>
        )}
        {pathname !== '/community' ? (
          <QAIcon
            reference_no={reference_no}
            message={message}
            handleCopy={handleCopy}
            textCopied={textCopied}
          />
        ) : (
          <CopyIcon message={message} handleCopy={handleCopy} />
        )}
      </div>
    </div>
  );
};

export default Response;
