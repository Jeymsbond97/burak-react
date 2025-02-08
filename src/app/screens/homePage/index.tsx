import React, { useEffect } from "react";
import ActiveUser from "./ActiveUser";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import "../../../css/home.css"

import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {createSelector} from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../libs/types/product";


/**  REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({popularDishes}),
)

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever)
  // Selector: Store => Data;

  useEffect(() => {
    // Backend server data request => Data

    // Slice: Data => Store

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
