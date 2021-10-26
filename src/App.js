import React, { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductPage from "./pages/main/ProductPage"
import NavBar from "./components/NavBar"
import { defaultDataIdFromObject } from "@apollo/client";

function App() {
  const ProductPage = lazy(() => import("./pages/main/ProductPage"));
  const baseUrl = process.env.PUBLIC_URL;

  return (
    <BrowserRouter name ={baseUrl}>
    <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route path="/" exact> <ProductPage/>
      </Route>
  </Switch>
  </Suspense>
  </BrowserRouter>
  );
}

export default App;
