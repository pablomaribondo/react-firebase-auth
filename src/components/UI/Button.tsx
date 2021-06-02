import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  type = 'button',
  className,
  text,
  disabled,
  onClick
}) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
