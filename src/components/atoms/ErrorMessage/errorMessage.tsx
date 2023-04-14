import { ErrorMessageProps } from "./errorMessage.types";

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{error}</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
    </div>
  );
};
export default ErrorMessage;
