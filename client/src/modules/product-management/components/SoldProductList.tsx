import ReadOnlyProductCard from './ReadOnlyProductCard';
import {useQuery} from '@apollo/client';
import {GET_ALL_SOLD_PRODUCTS} from '@/core/graphql/product';
import {IMyProductData} from '../interfaces/product.interface';
import {NoDataAvailable} from '@/components/emptyState/EmptyState';
import { Loader2 } from 'lucide-react';

export default function SoldProductList() {
  const {data, loading} = useQuery(GET_ALL_SOLD_PRODUCTS);
  if(loading){
    return <Loader2 className="text-primary h-4 w-4 animate-spin" />
  }
  if (data.getAllSoldProducts.length===0) {
    return <NoDataAvailable />;
  }
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
      {data.getAllSoldProducts.map(
        (purchasedProduct: {product: IMyProductData}) => (
          <ReadOnlyProductCard
            key={purchasedProduct.product.id}
            product={purchasedProduct.product}
          />
        ),
      )}
    </div>
  );
}
