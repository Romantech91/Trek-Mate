import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      email
      _id
    }
    token
  }
}
`;

export const SAVE_PLACE = gql`
  mutation SavePlace($input: PlaceInput!) {
    savePlace(input: $input) {
      placeId
      savedPlaces
    }
  }
`;

export const REMOVE_PLACE = gql`
  mutation RemovePlace($placeId: String!) {
    removePlace(placeId: $placeId) {
      _id
      username
      email
      placeCount
      savedPlaces {
        placeId
        savedPlaces
      }
    }
  }
`;
