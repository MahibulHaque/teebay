import {ProductCreateForm} from '../components/ProductCreateForm';

export default function CreateProductPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <ProductCreateForm />
      </div>
    </div>
  );
}
