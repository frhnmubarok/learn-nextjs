import React, { ReactChild, ReactChildren, ReactNode } from 'react';

const Layout = ({ children }: any) => {
  return (
    <div className='max-w-6xl mx-auto py-8'>
      <div className='bg-white'>
        <div className='py-4 sm:py-8 sm:px-8 lg:max-w-7xl lg:px-0'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
