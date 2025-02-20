import { GET_ALL_RENTED_PRODUCTS } from '@/core/graphql/product';
import { useQuery } from '@apollo/client';
import { IMyProductData } from '../interfaces/product.interface';
import ReadOnlyProductCard from './ReadOnlyProductCard';

export default function BorrowedProductList() {
  const {data} = useQuery(GET_ALL_RENTED_PRODUCTS);
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
