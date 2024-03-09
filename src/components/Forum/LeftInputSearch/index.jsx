import { useState } from 'react';
import Input from '../../shared/Input';
import styles from './index.module.css';
import searchIcon from '../../../images/searchCommunity.png';

const LeftInputSearch = () => {
  const [textSearch, setTextSearch] = useState('');
  const handleTextChange = (e) => {
    setTextSearch(e.target.value);
  };
  return (
    <form className={styles.searchForm}>
      <Input
        type='search'
        placeholder='Search topics of interest'
        value={textSearch}
        onChange={handleTextChange}
      />
      <img className={styles.img} src={searchIcon} alt='search icon' />
    </form>
  );
};

export default LeftInputSearch;
