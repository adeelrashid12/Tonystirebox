import React from 'react';
import { INITIAL_TIRES } from '@/data/inventory';
import TireDetailClient from './TireDetailClient';

export function generateStaticParams() {
  const params = INITIAL_TIRES.map((tire) => ({
    id: tire.id,
  }));
  if (params.length === 0) {
    return [{ id: 'sample' }];
  }
  return params;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <TireDetailClient tireId={resolvedParams.id} />;
}
