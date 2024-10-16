// const InputBox = ({
//   lable,
//   type,
//   placeholder,
//   name,
//   value,
//   bgColor = "bg-transparent",
//   onChange,
//   className = "",
//   ...props
// }) => {
//   return (
//     <div className="mb-6 flex items-start flex-col w-full">
//       <lable className="font-normal text-base">{lable}</lable>
//       <input
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={`w-full rounded-xl border px-5 py-3 text-sm outline-none focus-visible:shadow-none ${bgColor} ${className}`}
//         {...props}
//       />
//     </div>
//   );
// };

// export default InputBox;

import React, { forwardRef } from "react";

const InputBox = forwardRef(
  (
    {
      lable,
      type,
      placeholder,
      name,
      value,
      bgColor = "bg-transparent",
      onChange,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="mb-6 flex items-start flex-col w-full">
        <label className="font-normal text-base">{lable}</label>
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border px-5 py-3 text-sm outline-none focus-visible:shadow-none ${bgColor} ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default InputBox;
