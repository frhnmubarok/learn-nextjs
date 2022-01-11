/* eslint-disable @next/next/no-img-element */
import type { InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Key, ReactChild, ReactFragment, ReactPortal, useEffect, useRef, useState } from 'react';
import AddProduct from '../components/AddProduct';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
};

const Home = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  let [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState(data);
  const [fetching, setFetching] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api-products-server.herokuapp.com/products');
      const products = await res.json();
      setProducts(products);
      setFetching(false);
      return products;
    };
    if (fetching) {
      fetchData();
    }
  }, [fetching]);

  const formatRupiah = (money: number) => {
    return new Intl.NumberFormat('us-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <Layout>
      <div className='flex justify-between items-center text-center'>
        <h1 className='text-3xl font-bold sm:px-8 lg:px-0'>All Product</h1>
        <button
          className='w-full inline-flex justify-center text-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-sm font-normal text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all ease-in-out'
          onClick={() => setIsOpen(true)}>
          <span className='mr-2'>Add Product</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
          </svg>
        </button>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
        {products.map((product: Product) => (
          <div key={product.id} className='group relative'>
            <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
              <img
                src={product.img}
                alt={product.title}
                className='w-full h-full object-center object-cover lg:w-full lg:h-full'
              />
            </div>
            <div className='mt-4 flex justify-between'>
              <div>
                <h3 className='text-sm text-gray-700'>
                  <Link href='/product/[id]' as={`/product/${product.id}`}>
                    <a>
                      <span aria-hidden='true' className='absolute inset-0' />
                      {product.title}
                    </a>
                  </Link>
                </h3>
                {/* <p className='mt-1 text-sm text-gray-500'>{product.color}</p> */}
              </div>
              <p className='text-sm font-semibold text-gray-900'>{formatRupiah(product.price)}</p>
            </div>
          </div>
        ))}
      </div>
      <AddProduct isOpen={isOpen} setIsOpen={setIsOpen} cancelButtonRef={cancelButtonRef} setFetching={setFetching} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const response = await fetch('https://api-products-server.herokuapp.com/products');
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: 10, // In seconds
  };
};

export default Home;
