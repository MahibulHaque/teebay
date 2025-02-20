import {EnumProductCategory} from '@/core/enums/productCategory.enum';
import {EnumProductRentalPeriod} from '@/core/enums/productRentalPeriod.enum';
import * as z from 'zod';

export const editProductSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(1000),
  categories: z
    .nativeEnum(EnumProductCategory)
    .array()
    .min(1, 'Please select at least one category'),
  price: z.number(),
  rentalPrice: z.number(),
  rentalPeriod: z.nativeEnum(EnumProductRentalPeriod),
});
