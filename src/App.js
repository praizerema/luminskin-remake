import logo from './logo.svg';
import './App.css';
import ExchangeRatePage from "./ExchangeRatePage"

function App() {
  return (
    <div className="App">
      <ExchangeRatePage/>
    </div>
  );
}

export default App;


// import React from "react";
// import "./App.css";
// import { client } from "./ApolloClient/client";
// import { ApolloProvider,gql} from '@apollo/client';
// import ExchangeRatesPage from './ExchangeRatePage';


// function App() {
//   client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));
//   return (
//     <ApolloProvider client={client}>
//       <div className="App">
//         <ExchangeRatesPage />
//       </div>
//     </ApolloProvider>
//   );
// }

// export default App;