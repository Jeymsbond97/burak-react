/**   REACT APP STATE   **/

import { Member } from "./member";
import { Product } from "./product";

export  interface AppRootState {
    homePage: HomePageState;
    productPage: ProductPageState;
}

/** HOMEPAGE **/
export interface HomePageState{
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

export interface ProductPageState{
    restaurant: Member | null;
    choosenProduct: Product | null;
    products: Product[];
}