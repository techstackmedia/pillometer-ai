import Content from '../Content';
import infoIcon from '../../../images/infoIcon.png';
// import oopsIcon from '../../../images/oops.png';
import styles from './index.module.css';
import Card from '../Card';
// import { useContext } from 'react';
// import { NewPostContext } from '../../../context/Chat/NewPost';
// import { ChatDetailContext } from '../../../context/ChatDetail';

const Alert = ({ children, sx }) => {
  // const errorMessage = useContext(NewPostContext);
  // const serverError = useContext(ChatDetailContext);
  // const err = useContext(ChatDetailContext);
  return (
    <Card cn={`${styles.alert}`} styles={sx}>
      <img
        src={
          // errorMessage && serverError && errorMessage && err
          //   ? oopsIcon
            // : 
            infoIcon
        }
        alt='info icon'
        width={24}
        height={24}
      />
      <Content cn={`paragraph ${styles.paragraph}`}>{children}</Content>
    </Card>
  );
};

export default Alert;
