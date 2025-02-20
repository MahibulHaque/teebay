export const createProductFormSteps = [
  {
    title: 'Step 1',
    name: 'Product Title',
    fields: ['title'],
  },
  {
    title: 'Step 2',
    name: 'Product Description',
    fields: ['description'],
  },
  {
    title: 'Step 3',
    name: 'Product Categories',
    fields: ['categories'],
  },
  {
    title: 'Step 4',
    name: 'Product Pricing',
    fields: ['price', 'rentalPrice', 'rentalPeriod'],
  },
] as const;
