/* eslint-disable react/prop-types */

const Input = ({
  label,
  type,
  placeholder,
  onChange,
  value,
  name,
  defaultValue,
  required,
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text font-bold text-sm text-[#1E1E1E]">
          {label}
        </span>
      </label>

      <input
        name={name}
        id={name}
        type={type}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="input bg-white w-[100%] text-black border-black border-[1px] focus:border-black rounded-[0.375rem] pr-12"
      />
    </div>
  );
};

export default Input;
