import {Button} from '@/components/ui/button';
import MyProductList from '../components/MyProductList';

export default function MyProductsPage() {
  return (
    <section className="flex h-full w-full flex-col p-4 gap-8">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-primary text-2xl font-bold">My Products</h1>
          <p className="text-primary text-base font-normal">
            Manage your available products and create new product
          </p>
        </div>
        <Button variant={'default'}>Add Product</Button>
      </header>
      <MyProductList/>
    </section>
  );
}
