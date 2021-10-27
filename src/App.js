import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {LoadingCustom} from "./components/LoadingCustom"
function App() {
  const ProductPage = lazy(() => import("./pages/main/ProductPage"));
  const baseUrl = process.env.PUBLIC_URL;

  return (
    <BrowserRouter name ={baseUrl}>
    <Suspense fallback={ <LoadingCustom/>}>
    <Switch>
      <Route path="/" exact> <ProductPage/>
      </Route>
  </Switch>
  </Suspense>
  </BrowserRouter>
  );
}
// export const FallbackComponent  = ()=>{
//   return(
   
//   )
// }
export default App;
