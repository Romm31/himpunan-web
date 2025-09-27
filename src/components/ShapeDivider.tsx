import React from 'react';
import { useRouter } from 'next/router';

const ShapeDivider: React.FC = () => {
  const router = useRouter();

  // Hanya tampilkan ShapeDivider di homepage
  if (router.pathname !== '/') {
    return null;
  }

  return (
    <div className="relative -mt-12 md:-mt-20 lg:-mt-24 z-10">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-auto"
      >
        {/* Fill sesuai dengan warna background HeroSlider */}
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-current text-gray-900" 
        ></path>
      </svg>
    </div>
  );
};

export default ShapeDivider;