import {GET_ALL_LENT_PRODUCTS} from '@/core/graphql/product';
import {useQuery} from '@apollo/client';
import ReadOnlyProductCard from './ReadOnlyProductCard';
import {IMyProductData} from '../interfaces/product.interface';
import {NoDataAvailable} from '@/components/emptyState/EmptyState';
import {Loader2} from 'lucide-react';

export default function LentProductList() {
  const {data, loading} = useQuery(GET_ALL_LENT_PRODUCTS);
  if (loading) {
    return <Loader2 className="text-primary h-4 w-4 animate-spin" />;
  }
  if (data.getAllLentProducts.length === 0) {
    return <NoDataAvailable />;
  }
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
      {data.getAllLentProducts.map(
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
