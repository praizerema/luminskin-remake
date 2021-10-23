import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
// import {client} from "./ApolloClient/client"
import { RestLink } from "apollo-link-rest";
// import { HttpLink } from "apollo-link-http";
// const httpLink = new HttpLink({
//   uri: "https://48p1r2roz4.sse.codesandbox.io",
// });

 const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://pangaea-interviews.now.sh/api/graphql",
});
client
  .query({
    query: gql`
      query GetProducts {
        products {
          id
          title
          image_url
price(
  currency: USD
  )
product_options{
    title
prefix
suffix
options{
    id
    value
}
  
}
        }
      }
    `
  })
  .then(result => console.log(result));
  client
  .query({
    query: gql`
    query GetCurrency {
      currency
    }
    `}).then(result => console.log(result));
  

ReactDOM.render(
  <ApolloProvider client={client}>
  <App />
</ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
