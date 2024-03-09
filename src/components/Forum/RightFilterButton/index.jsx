import Button from '../../shared/Button';
import styles from './index.module.css';
import dropdownIcon from '../../../images/arrowDropDown.png';

const RightFilterButton = () => {
  return (
    <form className={styles.filterForm}>
      <Button>
        Most recent
        <img src={dropdownIcon} alt='dropdown icon' />
      </Button>
      <Button>
        Informational
        <img src={dropdownIcon} alt='dropdown icon' />
      </Button>
      <Button>
        Prescriptions
        <img src={dropdownIcon} alt='dropdown icon' />
      </Button>
    </form>
  );
};

export default RightFilterButton;
