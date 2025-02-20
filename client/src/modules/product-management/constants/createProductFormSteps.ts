import { productCategoriesSchema, productDescriptionSchema, productPriceSchema, productTitleSchema } from "../schemas";

export const createProductFormSteps = [
  {
    title: 'Product Title',
    description: '',
    schema: productTitleSchema,
  },
  {
    title: 'Description',
    description: '',
    schema: productDescriptionSchema,
  },
  {
    title: 'Categories',
    description: '',
    schema: productCategoriesSchema,
  },
  {
    title: 'Pricing',
    description: '',
    schema: productPriceSchema,
  },
];