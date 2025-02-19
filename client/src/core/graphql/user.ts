import {gql} from '@apollo/client';

export const GET_LOGGED_USER_INFO = gql`
  query LoggedInUserInfo {
    getLoggedInUser {
      id
      email
      firstName
      lastName
      phone
      address
    }
  }
`;
