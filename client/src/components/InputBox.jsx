const InputBox = ({
  lable,
  type,
  placeholder,
  name,
  value,
  bgColor = "bg-transparent",
  onChange,
  className = "",
}) => {
  return (
    <div className="mb-6 flex items-start flex-col w-full">
      <lable className="font-normal text-base">{lable}</lable>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border px-5 py-3 text-sm outline-none focus-visible:shadow-none ${bgColor} ${className}`}
      />
    </div>
  );
};

export default InputBox;
