import React from 'react';
import BuyRentProductDetails from '../components/BuyRentProductDetails';
import {useQuery} from '@apollo/client';
import {useParams} from 'react-router';
import {GET_AVAILABLE_PRODUCT_DETAILS} from '@/core/graphql/product';
import { Loader2 } from 'lucide-react';

export default function BuyRentProductPage() {
  const {productId} = useParams();
  const {data, loading} = useQuery(GET_AVAILABLE_PRODUCT_DETAILS, {
    variables: {getAvailableProductByIdId: productId},
  });

  return (
    <section className="flex h-full w-full bg-background flex-col gap-8 p-8 items-center">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-primary text-2xl font-bold">
            Buy or Rent Product
          </h1>
          <p className="text-primary text-base font-normal">
            Choose to buy or rent a product for certain period of time
          </p>
        </div>
      </header>
      {loading && <Loader2 className='w-10 h-10 animate-spin text-primary'/>}
      {data && <BuyRentProductDetails product={data.getAvailableProductById} />}
    </section>
  );
}
