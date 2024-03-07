import { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';

const Input = ({ type, placeholder, name, value, onChange, sx, cn }) => {
  const [rows, setRows] = useState(1);
  const textareaRef = useRef(null);

  useEffect(() => {
    const newRows = value.split('\n').length;
    setRows(newRows > 1 ? newRows : 1);
  }, [value]);

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
      {
        <label htmlFor={name} className={styles['input-label']}>
          {type === 'textarea' ? 'Click for voice note option' : placeholder}
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
