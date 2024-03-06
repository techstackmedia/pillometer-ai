import styles from './index.module.css';

const Input = ({ type, placeholder, name, value, onChange, sx, cn }) => {
  return (
    <div className={styles.inputContainer}>
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

      <label htmlFor={name} className={styles['input-label']}>
        {placeholder}
      </label>
    </div>
  );
};

export default Input;

Input.defaultProps = {
  type: 'button',
  placeholder: 'Optional',
  cn: null,
};
