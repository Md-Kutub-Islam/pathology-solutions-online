import React from "react";

function Button({
  children,
  className,
  bgColor = "bg-custom-light",
  text = "text-sm",
  px = "px-9",
  py = "py-2",
  ...props
}) {
  return (
    <button
      className={`${px} ${py} rounded-3xl ${text} ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
