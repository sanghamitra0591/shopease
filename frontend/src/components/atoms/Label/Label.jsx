import './Label.css';

const Label = ({ 
  htmlFor, 
  children, 
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`label ${className}`}
      {...props}
    >
      {children}
      {required && <span className="label__required">*</span>}
    </label>
  );
};

export default Label;