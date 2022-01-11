import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  Fragment,
  MutableRefObject,
  SetStateAction,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { SaveIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import Input from '../Input';

type Input = {
  title: string;
  price: number;
  img: string;
  description: string;
};

type TAddProduct = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cancelButtonRef: MutableRefObject<null>;
  setFetching: Dispatch<SetStateAction<boolean>>;
};

const AddProduct = ({
  isOpen,
  setIsOpen,
  cancelButtonRef,
  setFetching,
}: TAddProduct) => {
  const [inputs, setInputs] = useState<Input>({} as Input);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = event.target.name;
    const value: string = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const postProduct = async () => {
      return fetch('https://api-products-server.herokuapp.com/products', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
          setFetching(true);
          response.json();
          setIsOpen(false);
        })
        .then((json) => console.log(json));
    };

    toast.promise(postProduct(), {
      loading: 'Submitting...',
      success: <b>Product successfully submitted !</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="py-2 pl-2 pr-4">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900"
                      >
                        Add Product
                      </Dialog.Title>

                      <div className="mt-4">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Name
                        </label>
                        <Input
                          type="text"
                          name="title"
                          id="title"
                          required={true}
                          value={inputs.title || ''}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <Input
                          type="number"
                          min={0}
                          name="price"
                          id="price"
                          required
                          value={inputs.price || ''}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="img"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Image
                        </label>
                        <Input
                          type="text"
                          min={0}
                          name="img"
                          id="img"
                          required
                          value={inputs.img || ''}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="mt-2">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          required
                          value={inputs.description || ''}
                          onChange={handleChange}
                          className="block w-full px-4 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit
                    <SaveIcon className="w-5 h-5 ml-2" />
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddProduct;
