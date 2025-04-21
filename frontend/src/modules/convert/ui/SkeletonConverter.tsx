// components/SkeletonConverter.tsx
import CardContainer from '@/components/CardContainer';
import React from 'react';

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`bg-gray-300/30 animate-pulse rounded ${className}`}></div>
);

const SkeletonConverter = () => {
  return (
    <CardContainer>
      <div className="container mx-auto">
        <h2 className="title-1 mb-8 text-center">Cotizador de Criptomonedas</h2>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SkeletonBox className="h-10 w-full flex-1" />
            <SkeletonBox className="h-10 w-full flex-1" />
            <SkeletonBox className="h-10 w-10" />
            <SkeletonBox className="h-10 w-full flex-1" />
          </div>
          <div className="flex flex-col items-center justify-center mt-4 gap-4">
            <SkeletonBox className="h-10 w-40" />
            <SkeletonBox className="h-6 w-24" />
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export default SkeletonConverter;
