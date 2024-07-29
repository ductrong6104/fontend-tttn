// components/Input.js
import PropTypes from 'prop-types';

const InputCustome = ({ type, name, value, onChange, placeholder, className, required, readOnly, min }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border-2 p-2 rounded-md w-full ${className}`}
      required={required}
      readOnly={readOnly}
      min={min}
    />
  );
};

InputCustome.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};


export default InputCustome;
