import { createSelector } from "reselect";
import { AppRootState } from "../../../libs/types/screen";


const selectProductsPage = (state: AppRootState) => state.productPage

export const retrieveRestaurant = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.restaurant
);

export const retrieveChoosenProduct = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.choosenProduct
);

export const retrieveProducts = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.products
);
