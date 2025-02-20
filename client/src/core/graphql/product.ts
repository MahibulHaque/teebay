import {gql} from '@apollo/client';

export const GET_CREATED_AVAILABLE_PRODUCTS = gql`
  query GetCreatedProducts {
    getCreatedProducts {
      id
      title
      description
      price
      rentalPrice
      rentalPeriod
      categories
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_LENT_PRODUCTS = gql`
  query GetAllLentProducts {
    getAllLentProducts {
      rentedOn
      rentedTill
      rentedByUserId
      product {
        title
        description
        price
        rentalPrice
        rentalPeriod
        categories
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_PURCHASED_PRODUCTS = gql`
  query GetAllPurchasedProducts {
    getAllPurchasedProducts {
      purchasedByUserId
      product {
        id
        title
        description
        price
        rentalPrice
        rentalPeriod
        categories
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_RENTED_PRODUCTS = gql`
  query GetAllRentedProducts {
    getAllRentedProducts {
      rentedByUserId
      rentedOn
      rentedTill
      product {
        title
        description
        price
        rentalPrice
        rentalPeriod
        categories
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_SOLD_PRODUCTS = gql`
  query GetAllSoldProducts {
    getAllSoldProducts {
      purchasedByUserId
      product {
        title
        description
        price
        rentalPrice
        rentalPeriod
        categories
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_SINGLE_AVAILABLE_PRODUCT = gql`
  query GetCreatedProductById($getCreatedProductByIdId: ID!) {
    getCreatedProductById(id: $getCreatedProductByIdId) {
      title
      description
      price
      categories
      rentalPeriod
      rentalPrice
    }
  }
`;

export const GET_ALL_AVAILABLE_PRODUCTS = gql`
  query GetAllAvailableProductsCreatedByOthers {
    getAllAvailableProductsCreatedByOthers {
      categories
      description
      id
      price
      rentalPeriod
      rentalPrice
      title
    }
  }
`;

export const GET_AVAILABLE_PRODUCT_DETAILS = gql`
  query GetAvailableProductById($getAvailableProductByIdId: ID!) {
    getAvailableProductById(id: $getAvailableProductByIdId) {
      categories
      description
      id
      price
      productAvailability
      rentalPeriod
      rentalPrice
      title
    }
  }
`;
