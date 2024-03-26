import { symptoms, fullSymptomList, healthConsultants } from '../../../content';
import IncompleteSymptomList from './IncompleteSymptomList';
import CompleteSymptomList from './CompleteSymptomList';
import { useContext } from 'react';
import { WebSocketContext } from '../../../context/Chat/Service';
import { AuthProfileContext } from '../../../context/Auth/Profile';

const SymptomList = () => {
  const { viewMore } = useContext(WebSocketContext);
  const { profileResponse } = useContext(AuthProfileContext);
  console.log(profileResponse);
  const userType = profileResponse?.user_type;

  return (
    <>
      {viewMore ? (
        <CompleteSymptomList fullSymptomList={fullSymptomList} />
      ) : (
        <IncompleteSymptomList
          symptoms={
            userType === 'health_consultant' ? healthConsultants : symptoms
          }
        />
      )}
    </>
  );
};

export default SymptomList;
