import {gql} from '@apollo/client';

export const GET_CREATED_AVAILABLE_PRODUCTS = gql`
  query GetCreatedProducts {
    getCreatedProducts {
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
        title
        description
        price
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
        categories
        createdAt
        updatedAt
      }
    }
  }
`;
