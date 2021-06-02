import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  name,
  onChange,
  label
}) => {
  return (
    <div className="field">
      <div className="control">
        <label htmlFor={name}>{label}</label>
        <input
          required
          type={type}
          className="input"
          placeholder={placeholder}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Input;
