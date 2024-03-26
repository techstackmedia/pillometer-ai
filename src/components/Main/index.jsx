import Banner from '../shared/Banner';
import Content from '../shared/Content';
import styles from './index.module.css';
import { useContext, useEffect, useState } from 'react';
import Chat from '../Chat';
import SymptomList from './SymptomList';
import SymptomButton from './SymptomButton';
import { useLocation } from 'react-router-dom';
import { AuthProfileContext } from '../../context/Auth/Profile';

const Main = () => {
  const [viewMore, setViewMore] = useState(false);
  const [browserHeight, setBrowserHeight] = useState(window.innerHeight);
  const { pathname } = useLocation();
  const { profileResponse } = useContext(AuthProfileContext);
  const userType = profileResponse?.user_type;
  const healthConsultant = userType === 'health_consultant';

  useEffect(() => {
    const handleResize = () => {
      setBrowserHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [browserHeight]);

  const handleViewMoreClick = () => {
    setViewMore((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <div className={styles.main}>
        <main className={healthConsultant && styles?.healthConsultantMain}>
          {healthConsultant ? null : (
            <Banner
              cn={pathname === '/' && browserHeight < 1033 && `${styles.dnone}`}
            >
              <div className={styles.gradientText}>
                <Content cn={`heading ${styles.heading}`}>
                  Your Ultimate Wellness Partner
                </Content>
              </div>
              <Content cn={`paragraph ${styles.paragraph}`}>
                Your medical data and health information is confidential,
                protected and secured with end-to-end encryption.
              </Content>
              <Content cn={`paragraph ${styles.paragraph}`}>
                We are in compliance with ISO 9145930 data protection law.
              </Content>
            </Banner>
          )}

          <SymptomList viewMore={viewMore} />
          <SymptomButton handleViewMoreClick={handleViewMoreClick} />
        </main>
        <Chat setViewMore={setViewMore} />
      </div>
    </>
  );
};

export default Main;
