import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../libs/types/screen";


const initialState: ProductPageState = {
    restaurant: null,
    choosenProduct: null,
    products: [],
};

const productsPageSlice = createSlice({
    name: "productPage",
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },
        setChoosenProduct: (state, action) => {
            state.choosenProduct = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    }
});

export const { setRestaurant, setChoosenProduct, setProducts} = productsPageSlice.actions;
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;