import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {CreateProductFormData, createProductFormSchema} from '../schemas';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {EnumProductRentalPeriod} from '@/core/enums/productRentalPeriod.enum';
import {toast} from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {createProductFormSteps as steps} from '../constants/createProductFormSteps';
import {MultiSelect} from '@/components/ui/multi-select';
import {productCategoryOptions} from '../constants/productCategoryOptions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {useNavigate} from 'react-router';
import {useCreateProductMutation} from '@/core/store/api/productManagementApi';
import {ChevronLeft, ChevronRight, Loader2} from 'lucide-react';

export function ProductCreateForm() {
  const [createProductFn, {isLoading, isSuccess}] = useCreateProductMutation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isSuccess) {
      toast('Product created successfully');
      navigate('/my-products');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      rentalPrice: 0,
      rentalPeriod: EnumProductRentalPeriod.PER_DAY,
      categories: [],
    },
  });

  const processForm = async (values: CreateProductFormData) => {
    onSubmit(values);
  };

  type FieldName = keyof CreateProductFormData;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as unknown as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const onSubmit = async (values: CreateProductFormData) => {
    try {
      await createProductFn(values);
    } catch (error) {
      if (error) {
        toast('Failed to create new product');
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <div
                className={`group flex flex-col border-l-4 py-2 pl-4 hover:border-slate-800 md:border-t-4 md:border-l-0 md:pt-4 md:pb-0 md:pl-0 ${
                  currentStep === index
                    ? 'border-primary'
                    : currentStep > index
                      ? 'border-primary/60'
                      : 'border-slate-200'
                }`}>
                <span className="text-sm font-medium">{step.title}</span>
                <span className="text-sm">{step.name}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{steps[currentStep].name}</CardTitle>
          <CardDescription>
            Please fill in the information below to proceed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(processForm)}
              className="space-y-8">
              {currentStep === 0 && (
                <FormField
                  control={form.control}
                  name="title"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {currentStep === 1 && (
                <FormField
                  control={form.control}
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {currentStep === 2 && (
                <FormField
                  control={form.control}
                  name="categories"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <MultiSelect
                        options={productCategoryOptions}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {currentStep === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="price"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter price"
                            value={Number(field.value)}
                            onChange={e =>
                              field.onChange(Number(e.target.value) || 1)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rentalPrice"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Rental Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter rental price"
                            value={Number(field.value)}
                            onChange={e =>
                              field.onChange(Number(e.target.value) || 1)
                            }
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
                            <SelectItem value={EnumProductRentalPeriod.PER_DAY}>
                              Per day
                            </SelectItem>
                            <SelectItem
                              value={EnumProductRentalPeriod.PER_HOUR}>
                              Per hour
                            </SelectItem>
                            <SelectItem
                              value={EnumProductRentalPeriod.PER_WEEK}>
                              Per week
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={prev} disabled={currentStep === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button
            onClick={
              currentStep === steps.length - 1
                ? form.handleSubmit(processForm)
                : next
            }>
            {currentStep === steps.length - 1 ? (
              <>
                {isLoading && <Loader2 className="h-2 w-2 animate-spin" />}
                Submit
              </>
            ) : (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
