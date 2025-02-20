import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router';
import {editProductSchema} from '../schemas/edit-product.schema';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useUpdateProductMutation} from '@/core/store/api/productManagementApi';
import {toast} from 'sonner';
import {cn} from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Button} from '@/components/ui/button';
import {Loader2} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {MultiSelect} from '@/components/ui/multi-select';
import {productCategoryOptions} from '../constants/productCategoryOptions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {productRentalPeriodOptions} from '../constants/productRentalPeriodOptions';
import {ICreateNewProductPayload} from '../interfaces/product.interface';

interface IEditMyProductFormProps {
  productDetail: ICreateNewProductPayload;
}

export default function EditMyProductForm({
  productDetail,
}: Readonly<IEditMyProductFormProps>) {
  const {productId} = useParams();

  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      title: productDetail.title,
      description: productDetail.description,
      price: productDetail.price,
      rentalPrice: productDetail.rentalPrice,
      rentalPeriod: productDetail.rentalPeriod,
      categories: productDetail.categories,
    },
  });
  const [updateProductFn, {isLoading, isSuccess}] = useUpdateProductMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast('Your product has been updated');
      navigate('/my-products');
    }
  }, [isSuccess]);

  const onSubmit = async (values: z.infer<typeof editProductSchema>) => {
    try {
      await updateProductFn({
        productId: productId as string,
        ...values,
      });
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product details');
    }
  };
  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Product Details</CardTitle>
          <CardDescription>
            Enter the required changes to update the product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter product description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categories"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={productCategoryOptions}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter product price"
                          value={Number(field.value)}
                          onChange={e => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 1;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="rentalPrice"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Rental Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter product rental price"
                            value={Number(field.value)}
                            onChange={e => {
                              const value = e.target.value
                                ? Number(e.target.value)
                                : 1;
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rentalPeriod"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Rental Price Period</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a period for price calculation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {productRentalPeriodOptions.map(option => (
                              <SelectItem
                                key={option.value}
                                value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Product
              </Button>
              <Button
                className="w-full"
                variant={'secondary'}
                disabled={isLoading}
                onClick={() => {
                  navigate('/my-products');
                }}>
                Go back
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
