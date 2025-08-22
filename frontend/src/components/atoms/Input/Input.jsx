import './Input.css';

const Input = ({ 
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  error,
  ...props 
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'input--error' : ''}`}
        {...props}
      />
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};

export default Input;