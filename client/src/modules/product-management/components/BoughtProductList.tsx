import ReadOnlyProductCard from './ReadOnlyProductCard';
import {useQuery} from '@apollo/client';
import {GET_ALL_PURCHASED_PRODUCTS} from '@/core/graphql/product';
import {IMyProductData} from '../interfaces/product.interface';
import { NoDataAvailable } from '@/components/emptyState/EmptyState';

export default function BoughtProductList() {
  const {data} = useQuery(GET_ALL_PURCHASED_PRODUCTS);
  if (!data) {
    return <NoDataAvailable />;
  }
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
      {data.getAllPurchasedProducts.map(
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
