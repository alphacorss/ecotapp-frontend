import { Loader2 } from 'lucide-react';
import React from 'react';
import './Loader.css';

const Loader = (props: any) => {
  return <Loader2 size={24} className="animate-spin" {...props} />;
};

export const PageLoader = () => {
  return (
    <div className="w-full h-[100svh] grid place-content-center">
      <span className="loader"></span>
      <p className="text-primary-300 text-xs text-center font-[500]">Please wait</p>
    </div>
  );
};

export default Loader;
