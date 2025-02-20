import AllAvailableProductList from "../components/AllAvailableProductList";

export default function AllProductsPage() {
  return (
    <section className="flex h-full w-full flex-col gap-8 p-4">
      <header className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <h1 className="text-primary text-2xl font-bold">All Available Products</h1>
          <p className="text-primary text-base font-normal">
            Buy or rent available products from others
          </p>
        </div>
      </header>
      <AllAvailableProductList />
    </section>
  );
}
