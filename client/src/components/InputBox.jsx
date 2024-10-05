const InputBox = ({
  lable,
  type,
  placeholder,
  name,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className="mb-6 flex items-start flex-col">
      <lable className="font-normal text-base">{lable}</lable>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-xl border bg-transparent px-5 py-3 text-sm outline-none focus-visible:shadow-none ${className}`}
      />
    </div>
  );
};

export default InputBox;
