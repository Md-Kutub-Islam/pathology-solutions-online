import React from "react";

function Button({
  children,
  className,
  bgColor = "bg-custom-light",
  ...props
}) {
  return (
    <button
      className={`px-9 py-2 rounded-3xl text-sm ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
