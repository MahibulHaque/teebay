import {GET_ALL_RENTED_PRODUCTS} from '@/core/graphql/product';
import {useQuery} from '@apollo/client';
import {IMyProductData} from '../interfaces/product.interface';
import ReadOnlyProductCard from './ReadOnlyProductCard';
import {NoDataAvailable} from '@/components/emptyState/EmptyState';
import { Loader2 } from 'lucide-react';

export default function BorrowedProductList() {
  const {data, loading} = useQuery(GET_ALL_RENTED_PRODUCTS);
  if(loading){
    return <Loader2 className="text-primary h-4 w-4 animate-spin" />
  }
  if (data.getAllRentedProducts.length===0) {
    return <NoDataAvailable />;
  }
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
      {data.getAllRentedProducts.map(
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
