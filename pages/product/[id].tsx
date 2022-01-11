import Image from 'next/image';
import React from 'react';
import Layout from '../../components/Layout';

type TProdouctDetail = {
  product: {
    title: string;
    img: string;
    price: number;
    description: string;
  };
};

const ProductDetail = ({
  product: { title, img, price, description },
}: TProdouctDetail) => {
  const formatDollar = (money: number) => {
    return new Intl.NumberFormat('us-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold sm:px-8 lg:px-0">
        Detail Product - {title}
      </h1>
      <div className="grid grid-cols-12 gap-8 pt-8">
        <div className="col-span-4">
          <div className="rounded-2xl">
            <div className="relative w-full overflow-hidden border border-gray-200 aspect-square rounded-2xl">
              <img
                src={img}
                alt={title}
                className="object-cover object-center w-full h-full lg:w-full lg:h-full"
              />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <h1 className="text-3xl font-semibold uppercase">{title}</h1>
          <p className="py-2 text-sm">{description}</p>
          <div className="text-2xl font-semibold">
            {' '}
            Price {formatDollar(price)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get products
  const res = await fetch('https://api-products-server.herokuapp.com/products');
  const products: { id: number }[] = await res.json();

  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { id: number } }) {
  // params contains the product `id`.
  // If the route is like /products/1, then params.id is 1
  const res = await fetch(
    `https://api-products-server.herokuapp.com/products/${params.id}`
  );
  const product = await res.json();

  // Pass product data to the page via props
  return {
    props: {
      product,
    },
    revalidate: 1, // In seconds
  };
}

export default ProductDetail;
