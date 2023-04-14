import { ButtonProps } from "./button.types";

const Button = (props: ButtonProps) => {
  return (
    <button
      className="dark:bg-slate-800 p-4 rounded-lg h-14 mx-2 border-2 bg-slate-500 hover:bg-slate-600 active:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-300 text-slate-50"
      {...props}
    >
      {props.text}
    </button>
  );
};

export default Button;
