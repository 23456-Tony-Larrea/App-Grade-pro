import { gql } from "@apollo/client";

export const LOGIN_ACTIONS = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      name
      token
    }
  }
`;
