import { InputProps } from "./input.types";

const Input = (props: InputProps) => {
  const { className, register, ...rest } = props;
  return (
    <div className="flex flex-1">
      <label className="w-full">
        <span>{props.label}</span>
        <input
          className="block w-full p-2 border-2 h-14 border-slate-200 text-slate-500 rounded-lg shadow-sm focus:outline-none  focus:ring-slate-50 focus:border-slate-200"
          {...rest}
          {...register}
        />
      </label>
    </div>
  );
};

export default Input;
