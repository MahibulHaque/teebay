import EditMyProductForm from '../components/EditMyProductForm';
import {useQuery} from '@apollo/client';
import {GET_SINGLE_AVAILABLE_PRODUCT} from '@/core/graphql/product';
import {useParams} from 'react-router';

export default function EditProductPage() {
  const {productId} = useParams();
  const {data} = useQuery(GET_SINGLE_AVAILABLE_PRODUCT, {
    variables: {getCreatedProductByIdId: productId},
  });
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        {data && (
          <EditMyProductForm productDetail={data.getCreatedProductById} />
        )}
      </div>
    </div>
  );
}
