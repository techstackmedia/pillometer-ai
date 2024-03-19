import { symptoms, fullSymptomList } from '../../../content';
import IncompleteSymptomList from './IncompleteSymptomList';
import CompleteSymptomList from './CompleteSymptomList';
import { useContext } from 'react';
import { WebSocketContext } from '../../../context/Chat/Service';

const SymptomList = () => {
  const { viewMore } = useContext(WebSocketContext);

  return (
    <>
      {viewMore ? (
        <CompleteSymptomList fullSymptomList={fullSymptomList} />
      ) : (
        <IncompleteSymptomList symptoms={symptoms} />
      )}
    </>
  );
};

export default SymptomList;
