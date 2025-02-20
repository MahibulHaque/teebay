import {Button} from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {useCreateProductRentalRecordMutation} from '@/core/store/api/productManagementApi';
import {CalendarIcon, Loader2} from 'lucide-react';
import {useEffect, useState} from 'react';
import {Calendar} from '@/components/ui/calendar';
import {format} from 'date-fns';

import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';
import {toast} from 'sonner';
import {useNavigate} from 'react-router';

interface IRentProductModalProps {
  productId: string;
  productTitle: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function RentProductModal({
  productId,
  productTitle,
  isOpen,
  setIsOpen,
}: Readonly<IRentProductModalProps>) {
  const navigate = useNavigate();
  const [createRentalRecord, {isLoading, isSuccess}] =
    useCreateProductRentalRecordMutation();
  const [rentedFrom, setRentedFrom] = useState<Date>();
  const [rentedTill, setRentedTill] = useState<Date>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isSuccess) {
      toast('Product rented successfully');
      navigate('/all-products');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleSubmit = async () => {
    if (!rentedFrom || !rentedTill) {
      setError('Please select both dates');
      return;
    }

    const startDate = new Date(rentedFrom);
    const endDate = new Date(rentedTill);

    if (startDate >= endDate) {
      setError('End date must be after start date');
      return;
    }

    try {
      await createRentalRecord({
        productId,
        productTitle,
        rentedFrom: rentedFrom.toISOString(),
        rentedTill: rentedTill.toISOString(),
      });
    } catch (error) {
      if (error) {
        toast('Failed to create rental record of the product');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rent Product</DialogTitle>
          <DialogDescription>
            Provide the neccessary rent period details. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 py-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !rentedFrom && 'text-muted-foreground',
                )}>
                <CalendarIcon />
                {rentedFrom ? (
                  format(rentedFrom, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={rentedFrom}
                onSelect={setRentedFrom}
                initialFocus
                disabled={date => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !rentedTill && 'text-muted-foreground',
                )}>
                <CalendarIcon />
                {rentedTill ? (
                  format(rentedTill, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={rentedTill}
                onSelect={setRentedTill}
                disabled={date => date < new Date()}
                initialFocus

              />
            </PopoverContent>
          </Popover>
          {error && (
            <div className="text-destructive col-span-4 text-center text-sm">
              {error}
            </div>
          )}
        </div>
        <DialogFooter className="flex items-center justify-end gap-4">
          <Button
            variant={'secondary'}
            onClick={() => {
              setIsOpen(false);
            }}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {isLoading && <Loader2 className="h-2 w-2 animate-spin" />}Save
            changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
