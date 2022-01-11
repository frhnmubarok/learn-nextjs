/* eslint-disable @next/next/no-img-element */
import { TrashIcon } from '@heroicons/react/outline';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import AddProduct from '../components/AddProduct';
import Layout from '../components/Layout';

type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
};

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  let [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState(data);
  const [fetching, setFetching] = useState<boolean>(false);
  const cancelButtonRef = useRef<null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'https://api-products-server.herokuapp.com/products'
      );
      const products = await res.json();
      setProducts(products);
      setFetching(false);
      return products;
    };
    if (fetching) {
      fetchData();
    }
  }, [fetching]);

  const formatDollar = (money: number) => {
    return new Intl.NumberFormat('us-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(money);
  };

  const onDeleteHandle = (id: number) => {
    const deleteProduct = async () => {
      return fetch(`https://api-products-server.herokuapp.com/products/${id}`, {
        method: 'DELETE',
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

    toast.promise(deleteProduct(), {
      loading: 'Deleting...',
      success: <b>Product successfully Deleted !</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between text-center">
        <h1 className="text-3xl font-bold sm:px-8 lg:px-0">All Product</h1>
        <button
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-normal text-center text-white transition-all ease-in-out border border-transparent rounded-md shadow-sm bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setIsOpen(true)}
        >
          <span className="mr-2">Add Product</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product: Product) => (
          <div key={product.id} className="relative group">
            <div className="w-full overflow-hidden bg-gray-200 rounded-md min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                src={product.img}
                alt={product.title}
                className="object-cover object-center w-full h-full lg:w-full lg:h-full"
              />
            </div>
            <div className="flex justify-between mt-4">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link href="/product/[id]" as={`/product/${product.id}`}>
                    <a>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </Link>
                </h3>
                {/* <p className='mt-1 text-sm text-gray-500'>{product.color}</p> */}
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatDollar(product.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDeleteHandle(product.id)}
              className="absolute hidden p-2 rounded-md top-3 right-3 group-hover:block bg-rose-500"
            >
              <TrashIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}
      </div>
      <AddProduct
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        cancelButtonRef={cancelButtonRef}
        setFetching={setFetching}
      />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const response = await fetch(
    'https://api-products-server.herokuapp.com/products'
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 1, // In seconds
  };
};

export default Home;
