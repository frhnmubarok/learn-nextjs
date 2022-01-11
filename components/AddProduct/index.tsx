import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, SaveIcon, DocumentAddIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';

type Input = {
  title: string;
  price: number;
  img: string;
  description: string;
};

const AddProduct = ({ isOpen, setIsOpen, cancelButtonRef, setFetching }: any) => {
  const [inputs, setInputs] = useState({
    title: '',
    price: 0,
    img: '',
    description: '',
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
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
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <form onSubmit={handleSubmit}>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='pl-2 pr-4 py-2'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title as='h3' className='text-xl leading-6 font-semibold text-gray-900'>
                        Add Product
                      </Dialog.Title>

                      <div className='mt-4'>
                        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                          Product Name
                        </label>
                        <input
                          type='text'
                          name='title'
                          id='title'
                          required
                          value={inputs.title || ''}
                          onChange={handleChange}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2 px-4 py-2'
                        />
                      </div>
                      <div className='mt-2'>
                        <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
                          Price
                        </label>
                        <input
                          type='number'
                          min={0}
                          name='price'
                          id='price'
                          required
                          value={inputs.price || ''}
                          onChange={handleChange}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2 px-4 py-2'
                        />
                      </div>
                      <div className='mt-2'>
                        <label htmlFor='img' className='block text-sm font-medium text-gray-700'>
                          Product Image
                        </label>
                        <input
                          type='text'
                          name='img'
                          id='img'
                          required
                          value={inputs.img || ''}
                          onChange={handleChange}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2 px-4 py-2'
                        />
                      </div>
                      <div className='mt-2'>
                        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                          Description
                        </label>
                        <textarea
                          name='description'
                          id='description'
                          required
                          value={inputs.description || ''}
                          onChange={handleChange}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border-2 px-4 py-2'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                  <button
                    type='submit'
                    className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'>
                    Submit
                    <SaveIcon className='h-5 w-5 ml-2' />
                  </button>
                  <button
                    type='button'
                    className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}>
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
