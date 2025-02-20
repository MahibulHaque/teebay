import {GET_CREATED_AVAILABLE_PRODUCTS} from '@/core/graphql/product';
import {useQuery} from '@apollo/client';
import MyProductCard from './MyProductCard';
import {IMyProductData} from '../interfaces/product.interface';
import {Loader2} from 'lucide-react';
import {NoDataAvailable} from '@/components/emptyState/EmptyState';

export default function MyProductList() {
  const {data, loading} = useQuery(GET_CREATED_AVAILABLE_PRODUCTS);
  if (loading) {
    return <Loader2 className="text-primary h-4 w-4 animate-spin" />;
  }
  if (data.getCreatedProducts.length===0) {
    return <NoDataAvailable />;
  }
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
      {data.getCreatedProducts.map((createdProduct: IMyProductData) => (
        <MyProductCard key={createdProduct.id} product={createdProduct} />
      ))}
    </div>
  );
}
