import {EnumProductCategory} from '@/core/enums/productCategory.enum';
import {EnumProductRentalPeriod} from '@/core/enums/productRentalPeriod.enum';

export interface IMyProductData {
  id: string;
  title: string;
  description: string;
  price: number;
  rentalPrice: number;
  rentalPeriod: EnumProductRentalPeriod;
  categories: EnumProductCategory[];
  createdAt: Date;
}

export interface ICreateNewProductPayload {
  title: string;
  description: string;
  price: number;
  rentalPrice: number;
  rentalPeriod: EnumProductRentalPeriod;
  categories: EnumProductCategory[];
}

export interface IEditProductPayload {
  productId: string;
  title: string;
  description: string;
  price: number;
  rentalPrice: number;
  rentalPeriod: EnumProductRentalPeriod;
  categories: EnumProductCategory[];
}
export interface IDeleteProduct {
  productId: string;
}
