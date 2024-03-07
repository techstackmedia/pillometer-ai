import { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
import styles from './index.module.css';

const Input = ({ type, placeholder, name, value, onChange, sx, cn }) => {
  // const { pathname } = useLocation();
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);

  useEffect(() => {
    const newRows = value.split('\n').length;
    setRows(newRows > 1 ? newRows : 1);
  }, [value]);

  // Scroll textarea to the bottom when value changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [value]);

  const inputElement =
    type === 'textarea' ? (
      <textarea
        ref={textareaRef}
        placeholder={placeholder}
        className={cn === null && `${styles.input} ${styles['input-field']}`}
        name={name}
        id={name}
        value={value}
        rows={rows}
        onChange={onChange}
        style={sx}
        autoFocus
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className={cn === null && `${styles.input} ${styles['input-field']}`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        style={sx}
      />
    );

  return (
    <div className={styles.inputContainer}>
      {inputElement}
      {/* {pathname === '/' ? null : (
        <label htmlFor={name} className={styles['input-label']}>
          {placeholder}
        </label>
      )} */}
      {
        <label htmlFor={name} className={styles['input-label']}>
          {type === 'textarea'
            ? //   <img
              //   src={micIcon}
              //   width={16}
              //   height={16}
              //   alt='mic icon'
              //   title='Click for voice Note Option'
              // />
              'Click for voice note option'
            : placeholder}
        </label>
      }
    </div>
  );
};

export default Input;

Input.defaultProps = {
  type: 'button',
  placeholder: 'Optional',
  cn: null,
};
