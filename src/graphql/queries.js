import { gql, useQuery } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts($currency: Currency!) {
    products {
      id
      title
      image_url
      price(currency: $currency)
      product_options {
        title
        prefix
        suffix
        options {
          id
          value
        }
      }
    }
  }
`;

export const GET_CURRENCY = gql`
query GetCurrency {
  currency
}
`;
