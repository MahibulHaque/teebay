import {Button} from '@/components/ui/button';
import MyProductList from '../components/MyProductList';
import {useNavigate} from 'react-router';

export default function MyProductsPage() {
  const navigate = useNavigate();

  const handleNavigateToAddProductPage = () => {
    navigate('/create-product');
  };

  return (
    <section className="flex h-full w-full flex-col gap-8 p-4">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-primary text-2xl font-bold">My Products</h1>
          <p className="text-primary text-base font-normal">
            Manage your available products and create new product
          </p>
        </div>
        <Button variant={'default'} onClick={handleNavigateToAddProductPage}>
          Add Product
        </Button>
      </header>
      <MyProductList />
    </section>
  );
}
