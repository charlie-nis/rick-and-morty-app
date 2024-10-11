type TProps = {
  message: string;
};

const ErrorMessage: React.FC<TProps> = ({ message }) => {
  return <div className="text-red-500 text-center w-full">{message}</div>;
};

export default ErrorMessage;
