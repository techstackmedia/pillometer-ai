import Content from '../../shared/Content';
import styles from './index.module.css';

const SymptomsSelectionInput = ({ children, cn, sx }) => {
  return (
    <>
      <div className={styles['symptom-heading']}>
        <Content
          cn='heading'
          sx={{ marginBlock: 0, marginTop: 45, color: '#514F6D' }}
        >
          What symptoms are you experiencing?
        </Content>
        <Content cn='paragraph' sx={{ marginTop: 5, marginBottom: 30 }}>
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
