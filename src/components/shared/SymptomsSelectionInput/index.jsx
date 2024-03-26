import { useContext } from 'react';
import Content from '../../shared/Content';
import styles from './index.module.css';
import { AuthProfileContext } from '../../../context/Auth/Profile';
import logo from '../../../logo.svg';

const SymptomsSelectionInput = ({ children, cn, sx }) => {
  const { profileResponse } = useContext(AuthProfileContext);
  const userType = profileResponse?.user_type;
  const healthConsultant = userType === 'health_consultant';
  return (
    <>
      <div
        className={styles['symptom-heading']}
        style={{
          marginTop: healthConsultant ? 0 : 45,
          marginBottom: healthConsultant ? 45 : undefined,
        }}
      >
        {healthConsultant ? (
          <img src={logo} alt='pillometer logo' className='logo' />
        ) : null}
        {healthConsultant ? (
          <Content cn={`paragraph ${styles.font}`}>
            {`Good afternoon, ${profileResponse?.first_name} 🌤️`}
          </Content>
        ) : null}
        <Content cn={`heading ${styles.heading}`}>
          {healthConsultant
            ? 'How can I be of help?'
            : 'What symptoms are you experiencing?'}
        </Content>
        {healthConsultant ? null : (
          <Content cn={`paragraph ${styles.paragraph}`}>
            You can select more than one option
          </Content>
        )}
      </div>
      <div className={cn} style={sx}>
        {children}
      </div>
    </>
  );
};

export default SymptomsSelectionInput;
