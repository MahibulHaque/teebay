import {EnumProductCategory} from '@/core/enums/productCategory.enum';
import {EnumProductRentalPeriod} from '@/core/enums/productRentalPeriod.enum';
import * as z from 'zod';

export const productTitleSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(255, "Title can't be more than 255 characters"),
});

export const productDescriptionSchema = z.object({
  description: z.string().min(3).max(1000),
});

export const productCategoriesSchema = z.object({
  categories: z.nativeEnum(EnumProductCategory).array().min(1, "Please select at least one category"),
});

export const productPriceSchema = z.object({
  price: z.number(),
  rentalPrice: z.number(),
  rentalPeriod: z.nativeEnum(EnumProductRentalPeriod),
});

export const createProductFormSchema = productTitleSchema
  .merge(productDescriptionSchema)
  .merge(productCategoriesSchema)
  .merge(productPriceSchema);

export type CreateProductFormData = z.infer<typeof createProductFormSchema>;
