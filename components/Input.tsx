import {
  ChangeEventHandler,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';

type TInput = InputHTMLAttributes<HTMLInputElement> & {
  isFocused?: boolean;
  handleChange: ChangeEventHandler;
};

const Input = ({
  type = 'text',
  name,
  value,
  id,
  required,
  isFocused = false,
  handleChange,
}: TInput) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      input.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      type={type}
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={(e) => handleChange(e)}
      className="block w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  );
};

export default Input;
