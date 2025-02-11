import React, { useEffect } from "react";
import ActiveUser from "./ActiveUser";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import "../../../css/home.css"

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes } from "./slice";
import { Product } from "../../../libs/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../libs/enums/product.enum";


/**  REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    }).then((data) => {
      setPopularDishes(data);
    }).catch((err) => console.log(err));

  }, [])
  return(
    <div className="homepage">
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisement/>
        <ActiveUser/>
        <Events/>
    </div>
  )
}
