import {useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useDeleteProductMutation} from '@/core/store/api/productManagementApi';
import {Loader2} from 'lucide-react';
import {toast} from 'sonner';
import {apolloClient} from '@/lib/apollo';
import {GET_CREATED_AVAILABLE_PRODUCTS} from '@/core/graphql/product';

interface IDeleteMyProductModalProps {
  productId: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
}

export default function DeleteMyProductModal({
  productId,
  isDialogOpen,
  setIsDialogOpen,
}: Readonly<IDeleteMyProductModalProps>) {
  const [deleteProductFn, {isLoading, isSuccess}] = useDeleteProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast('Product deleted successfully');
      setIsDialogOpen(false);
    }
  }, [isSuccess]);

  const handleProductDelete = async () => {
    try {
      await deleteProductFn({productId});
      await apolloClient.refetchQueries({
        include: [GET_CREATED_AVAILABLE_PRODUCTS],
      });
    } catch (error) {
      console.log(error);
      toast('Something went when trying to delete the product');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false)
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product and remove it from server.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center justify-end gap-4">
          <Button
            variant="secondary"
            onClick={handleDialogClose}
            disabled={isLoading}>
            Close
          </Button>

          <Button onClick={handleProductDelete} disabled={isLoading}>
            {isLoading && <Loader2 className="h-2 w-2 animate-spin" />}
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
