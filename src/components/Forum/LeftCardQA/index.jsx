import QuestionList from '../../QuestionList';
import styles from './index.module.css';

const LeftCardQA = () => {
  return (
    <div className={`${styles['scroll-hidden']} ${styles.questions}`}>
      <QuestionList />
    </div>
  );
};

export default LeftCardQA;
