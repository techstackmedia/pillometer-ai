import Content from '../../shared/Content';
import styles from './index.module.css';
import logo from '../../../logo.svg';
import CopyIcon from '../CopyIcon';
import { useLocation } from 'react-router-dom';
import QAIcon from '../QAIcon';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useContext, useEffect, useRef, useState } from 'react';
import truncateWords from '../../../utils/truncateWords';
import { WebSocketContext } from '../../../context/Chat/Service';
import { NewPostContext } from '../../../context/Chat/NewPost';

const Response = ({ message, reference_no }) => {
  const { isSent, newResponse } = useContext(WebSocketContext);
  const { pathname } = useLocation();
  const containerRef = useRef(null);
  const [textCopied, setTextCopied] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const { res } = useContext(NewPostContext);
  // const [errorMessage, setErrorMessage] = useState(null);
  const handleCopy = () => {
    setTextCopied(true);
    setTimeout(() => {
      setTextCopied(null);
    }, [3000]);
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setSuccessMessage(`Text copied: ${truncateWords(message, 4)}`);
      })
      .catch((error) => {
        console.error('Error copying text:', error);
      });
  };

  useEffect(() => {
    if (isSent) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isSent, res]);

  return (
    <div ref={containerRef} className={styles.chatResponse}>
      <img src={logo} alt='user profile' className={styles.userProfileImage} />
      <div className={styles.chatResponseCol}>
        <Content cn={`paragraph ${styles.chatResponseParagraph}`}>
          {(res) && (
            <Markdown remarkPlugins={[remarkGfm]}>
              {typeof message === 'string'
                ? message.trim() || newResponse?.message
                : null}
            </Markdown>
          )}
        </Content>
        {pathname !== '/community' ? (
          <QAIcon
            reference_no={reference_no}
            message={message}
            handleCopy={handleCopy}
            textCopied={textCopied}
            successMessage={successMessage}
          />
        ) : (
          <CopyIcon
            message={message}
            handleCopy={handleCopy}
            successMessage={successMessage}
            textCopied={textCopied}
          />
        )}
      </div>
    </div>
  );
};

export default Response;
