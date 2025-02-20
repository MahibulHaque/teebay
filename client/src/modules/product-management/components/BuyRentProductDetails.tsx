import {useEffect, useState} from 'react';
import {IMyProductData} from '../interfaces/product.interface';
import {
  getCategoryText,
  getProductRentalPeriodText,
} from '../helpers/enumToText';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useCreateProductPurchaseRecordMutation} from '@/core/store/api/productManagementApi';
import {toast} from 'sonner';
import {useNavigate} from 'react-router';
import {Loader2} from 'lucide-react';
import RentProductModal from './RentProductModal';

interface IBuyRentProductDetailsProps {
  product: IMyProductData;
}

export default function BuyRentProductDetails({
  product,
}: Readonly<IBuyRentProductDetailsProps>) {
  const navigate = useNavigate();
  const [
    createPurchaseRecordFn,
    {
      isLoading: isLoadingCreatePurchaseRecord,
      isSuccess: isSuccessCreatePurchaseRecord,
    },
  ] = useCreateProductPurchaseRecordMutation();
  const [showBuyDialog, setShowBuyDialog] = useState<boolean>(false);
  const [showRentDialog, setShowRentDialog] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccessCreatePurchaseRecord) {
      toast('Product successful');
      navigate('/all-products');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreatePurchaseRecord]);

  const productCategoryTexts = () => {
    const texts: string[] = [];
    product.categories.forEach(category => {
      const text = getCategoryText(category);
      texts.push(text);
    });
    return texts;
  };

  const handleBuyProduct = async () => {
    try {
      await createPurchaseRecordFn({
        productId: product.id,
        productTitle: product.title,
      });
    } catch (error) {
      if (error) {
        toast('Failed purchase the following product');
      }
    }
  };
  return (
    <>
      <div className="flex min-w-[600px] flex-col items-start justify-center gap-4 rounded-md p-4 shadow">
        <h2 className="text-2xl font-semibold">{product.title}</h2>
        <p className="text-md mb-2 text-gray-600">
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
        <p className="mb-2 text-base">{product.description}</p>
        <div className="flex w-full items-center justify-end gap-4">
          <Button variant={'secondary'} onClick={() => setShowRentDialog(true)}>
            Rent
          </Button>
          <Button variant={'default'} onClick={() => setShowBuyDialog(true)}>
            Buy
          </Button>
        </div>
      </div>
      <RentProductModal
        isOpen={showRentDialog}
        setIsOpen={setShowRentDialog}
        productId={product.id}
        productTitle={product.title}></RentProductModal>

      <Dialog
        open={showBuyDialog}
        onOpenChange={open => {
          setShowBuyDialog(open);
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy the product?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently change the
              record of the product and the product will be bought by you.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowBuyDialog(false);
              }}
              disabled={isLoadingCreatePurchaseRecord}>
              Close
            </Button>

            <Button
              type="button"
              variant={'default'}
              onClick={handleBuyProduct}
              disabled={isLoadingCreatePurchaseRecord}>
              {isLoadingCreatePurchaseRecord && (
                <Loader2 className="h-2 w-2 animate-spin" />
              )}
              Buy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
