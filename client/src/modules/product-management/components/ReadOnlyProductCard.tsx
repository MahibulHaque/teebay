import { useState } from 'react';
import {IMyProductData} from '../interfaces/product.interface';
import {getCategoryText, getProductRentalPeriodText} from '../helpers/enumToText';

interface IReadOnlyProductCardProps {
  product: IMyProductData;
}

export default function ReadOnlyProductCard({
  product,
}: Readonly<IReadOnlyProductCardProps>) {
  const [showFullDescription, setShowFullDescription] = useState<boolean>(
    product.description.length < 100,
  );

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const productCategoryTexts = () => {
    const texts: string[] = [];
    product.categories.forEach(category => {
      const text = getCategoryText(category);
      texts.push(text);
    });
    return texts;
  };
  return (
    <div className="bg-background text-foreground flex w-full flex-col gap-2 rounded-md p-4 shadow">
      <div className="mb-2 flex items-start justify-between">
        <h2 className="text-xl font-semibold">{product.title}</h2>
      </div>
      <p className="mb-2 text-sm text-gray-600">
        {productCategoryTexts().join(', ')}
      </p>
      <div className="mb-2 flex items-center justify-start gap-2">
        <p className="font-bold">${product.price.toFixed(2)}</p>
        <div className="bg-border h-full w-[2px]"></div>
        <p className="font-bold">
          Rental: ${product.rentalPrice.toFixed(2)} /{' '}
          {getProductRentalPeriodText(product.rentalPeriod)}
        </p>
      </div>
      <p className="mb-2 text-sm">
        {showFullDescription
          ? product.description
          : `${product.description.slice(0, 100)}...`}
        {product.description.length > 100 && (
          <button
            onClick={toggleDescription}
            className="ml-1 text-blue-500 hover:text-blue-700">
            {showFullDescription ? 'See less' : 'See more'}
          </button>
        )}
      </p>
    </div>
  );
}
