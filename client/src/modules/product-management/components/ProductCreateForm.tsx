import React from 'react';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Stepper} from '@/components/ui/stepper';
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
import {createProductFormSteps} from '../constants/createProductFormSteps';
import {MultiSelect} from '@/components/ui/multi-select';
import {productCategoryOptions} from '../constants/productCategoryOptions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function ProductCreateForm() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<
    Partial<CreateProductFormData>
  >({});

  const createProductForm = useForm<CreateProductFormData>({
    //@ts-ignore
    resolver: zodResolver(createProductFormSteps[currentStep].schema),
    mode: 'onChange',
    defaultValues: {
      title: formData.title ?? '',
      description: formData.description ?? '',
      categories: formData.categories ?? [],
      price: 1,
      rentalPrice: 1,
      rentalPeriod: EnumProductRentalPeriod.PER_DAY,
    },
  });

  React.useEffect(() => {
    createProductForm.reset({
      ...formData,
    });
  }, [formData, createProductForm]);

  const handleNext = async () => {
    // Validate the fields in the current step
    const currentSchema = createProductFormSteps[currentStep].schema
    const fields = Object.keys(currentSchema.shape)
    const isValid = await createProductForm.trigger(fields as Array<keyof CreateProductFormData>);

    if (isValid) {
      // Save the current step's data
      const stepData = createProductForm.getValues();
      setFormData(prev => ({...prev, ...stepData}));

      // Move to next step
      setCurrentStep(prev =>
        Math.min(prev + 1, createProductFormSteps.length - 1),
      );
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleStepClick = (step: number) => {
    // Only allow going back to previous steps
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  const onSubmit = async (data: Partial<CreateProductFormData>) => {    // Combine all form data
    const finalData = {
      ...formData,
      ...data,
    };

    // Validate against complete schema
    const result = createProductFormSchema.safeParse(finalData);

    if (!result.success) {
      toast.error('Please complete all required fields');
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Form submitted successfully!');
    console.log(finalData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <FormField
              control={createProductForm.control}
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
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <FormField
              control={createProductForm.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <FormField
              control={createProductForm.control}
              name="categories"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Product Category</FormLabel>
                  <MultiSelect options={productCategoryOptions} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <FormField
              control={createProductForm.control}
              name="price"
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      id="price"
                      placeholder="Enter price"
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
              control={createProductForm.control}
              name="rentalPrice"
              render={({field}) => (
                <FormItem>
                  <FormLabel htmlFor="rentalPrice">Rental Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      id="rentalPrice"
                      placeholder="Enter rental price"
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
              control={createProductForm.control}
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
                      <SelectItem value={EnumProductRentalPeriod.PER_HOUR}>
                        Per hour
                      </SelectItem>
                      <SelectItem value={EnumProductRentalPeriod.PER_WEEK}>
                        Per week
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === createProductFormSteps.length - 1;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Multi-step Form</CardTitle>
      </CardHeader>
      <Form {...createProductForm}>
        <form onSubmit={createProductForm.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <Stepper
              steps={createProductFormSteps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
            {renderStepContent()}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}>
              Previous
            </Button>
            {isLastStep ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
