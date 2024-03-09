import { symptoms, fullSymptomList } from '../../../content';
import IncompleteSymptomList from './IncompleteSymptomList';
import CompleteSymptomList from './CompleteSymptomList';

const SymptomList = ({ viewMore }) => {
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
