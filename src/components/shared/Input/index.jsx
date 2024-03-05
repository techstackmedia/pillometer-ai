import styles from './index.module.css';

const Input = ({ type, placeholder, className, name, value, onChange, sx }) => {
  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        style={sx}
      />
    </div>
  );
};

export default Input;

Input.defaultProps = {
  type: 'button',
  placeholder: 'Optional',
};
