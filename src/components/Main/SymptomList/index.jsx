import { symptoms, fullSymptomList } from '../../../content';
import IncompleteSymptomList from './IncompleteSymptomList';
import CompleteSymptomList from './CompleteSymptomList';

const SymptomList = ({ viewMore }) => {
  return (
    <>
      {true ? (
        <CompleteSymptomList fullSymptomList={fullSymptomList} />
      ) : (
        <IncompleteSymptomList symptoms={symptoms} />
      )}
    </>
  );
};

export default SymptomList;
