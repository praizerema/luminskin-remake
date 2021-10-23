import React from "react";
import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
    query GetProducts {
        products {
          id
          title
        }
      }
`;

function ExchangeRatePage() {
  const { data, loading, error } = useQuery(EXCHANGE_RATES);

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return data.products.map(({ id }) => (
    <div key={id}>
      <p>
        {id}: {"rate"}
      </p>
      <h1>good lyck
          
      </h1>
    </div>
  ));
}

export default ExchangeRatePage;