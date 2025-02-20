import { GET_ALL_LENT_PRODUCTS } from '@/core/graphql/product';
import { useQuery } from '@apollo/client';
import ReadOnlyProductCard from './ReadOnlyProductCard';
import { IMyProductData } from '../interfaces/product.interface';

export default function LentProductList() {
  const {data} = useQuery(GET_ALL_LENT_PRODUCTS);
  return (
    <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(450px,1fr))] gap-6">
      {data.getAllLentProducts.map((purchasedProduct: { product: IMyProductData; }) => (
        <ReadOnlyProductCard
          key={purchasedProduct.product.id}
          product={purchasedProduct.product}
        />
      ))}
    </div>
  );
}
