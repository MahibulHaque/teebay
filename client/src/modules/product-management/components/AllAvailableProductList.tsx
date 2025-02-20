import { NoDataAvailable } from '@/components/emptyState/EmptyState';
import { GET_ALL_AVAILABLE_PRODUCTS } from '@/core/graphql/product';
import { useQuery } from '@apollo/client';
import { IMyProductData } from '../interfaces/product.interface';
import AvailableProductCard from './AvailableProductCard';
import { Loader2 } from 'lucide-react';

export default function AllAvailableProductList() {
  const {data, loading} = useQuery(GET_ALL_AVAILABLE_PRODUCTS);
  if(loading){
    return <Loader2 className="text-primary h-4 w-4 animate-spin" />
  }
  if (data.getAllAvailableProductsCreatedByOthers.length===0) {
    return <NoDataAvailable />;
  }
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
      {data.getAllAvailableProductsCreatedByOthers.map((createdProduct: IMyProductData) => (
        <AvailableProductCard key={createdProduct.id} product={createdProduct} />
      ))}
    </div>
  );
}
