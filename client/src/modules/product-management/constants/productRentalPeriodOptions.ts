import {EnumProductRentalPeriod} from '@/core/enums/productRentalPeriod.enum';

export const productRentalPeriodOptions = [
  {value: EnumProductRentalPeriod.PER_HOUR, label: 'Hourly'},
  {
    value: EnumProductRentalPeriod.PER_DAY,
    label: 'Daily',
  },
  {
    value: EnumProductRentalPeriod.PER_WEEK,
    label: 'Weekly',
  },
];
