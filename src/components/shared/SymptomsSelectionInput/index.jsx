import Content from '../../shared/Content';
import styles from './index.module.css';

const SymptomsSelectionInput = ({ children, cn, sx }) => {
  return (
    <>
      <div className={styles['symptom-heading']}>
        <Content cn={`heading ${styles.heading}`}>
          What symptoms are you experiencing?
        </Content>
        <Content cn={`paragraph ${styles.paragraph}`}>
          You can select more than one option
        </Content>
      </div>
      <div className={cn} style={sx}>
        {children}
      </div>
    </>
  );
};

export default SymptomsSelectionInput;
