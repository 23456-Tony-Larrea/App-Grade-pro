import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL, GRAPHQL } from "../url/api_url";

const client = new ApolloClient({
  uri: `${API_URL}${GRAPHQL}`,
  cache: new InMemoryCache(),
});

export default client;
