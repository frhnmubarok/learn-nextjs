import React from 'react';
import Layout from '../../components/Layout';

const ProductDetail = ({ product }: any) => {
  return (
    <Layout>
      <h1 className='text-3xl font-bold sm:px-8 lg:px-0'>Detail Product</h1>
      <h1>{product.title}</h1>
    </Layout>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get products
  const res = await fetch('https://api-products-server.herokuapp.com/products');
  const products = await res.json();

  // Get the paths we want to pre-render based on products
  const paths = products.map((product: any) => ({
    params: { id: product.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps({ params }: any) {
  // params contains the product `id`.
  // If the route is like /products/1, then params.id is 1
  const res = await fetch(`https://api-products-server.herokuapp.com/products/${params.id}`);
  const product = await res.json();

  // Pass product data to the page via props
  return {
    props: {
      product,
    },
    revalidate: 10, // In seconds
  };
}

export default ProductDetail;
