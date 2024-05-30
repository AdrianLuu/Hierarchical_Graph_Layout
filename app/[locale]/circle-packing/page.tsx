// pages/circle-packing.tsx
"use client";
import React from 'react';
import CirclePacking from '@/components/CirclePacking';

const CirclePackingPage: React.FC = () => {
  return (
    <div>
      <h1>Circle Packing Visualization</h1>
      <CirclePacking />
    </div>
  );
};

export default CirclePackingPage;