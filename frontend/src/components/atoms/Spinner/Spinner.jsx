import './Spinner.css';

const Spinner = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`spinner spinner--${size} ${className}`}>
      <div className="spinner__circle"></div>
    </div>
  );
};

export default Spinner;