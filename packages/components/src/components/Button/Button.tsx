import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.PropsWithChildren {
  url?: string;
  target?: string;
  onNavigate?: (url: string, target?: string) => void;
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  label,
  onClick,
  onNavigate,
  target,
  url,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onNavigate && url) {
      event.preventDefault();
      onNavigate(url, target);
    }
    onClick && onClick(event);
  };

  const button = (
    <button data-url={url} data-target={target} onClick={handleClick} {...props}>
      {label ? label : children}
    </button>
  );

  return url ? (
    <a href={url} target={target}>
      {button}
    </a>
  ) : (
    button
  );
};

export default Button;
