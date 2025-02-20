import {EnumProductCategory} from '@/core/enums/productCategory.enum';
import {EnumProductRentalPeriod} from '@/core/enums/productRentalPeriod.enum';

export const getCategoryText = (category: EnumProductCategory) => {
  switch (category) {
    case EnumProductCategory.ELECTRONICS:
      return 'Electronics';
    case EnumProductCategory.HOME_APPLIANCES:
      return 'Home Appliances';
    case EnumProductCategory.FURNITURE:
      return 'Furniture';
    case EnumProductCategory.OUTDOOR:
      return 'Outdoor';
    case EnumProductCategory.SPORTING_GOODS:
      return 'Sporting Goods';
    case EnumProductCategory.TOYS:
      return 'TOYS';
    default:
      return '';
  }
};

export const getProductRentalPeriodText = (
  rentalPeriod: EnumProductRentalPeriod,
) => {
  switch (rentalPeriod) {
    case EnumProductRentalPeriod.PER_DAY:
      return 'Daily';

    case EnumProductRentalPeriod.PER_HOUR:
      return 'Hourly';
    case EnumProductRentalPeriod.PER_WEEK:
      return 'Weekly';
    default:
      return '';
  }
};
