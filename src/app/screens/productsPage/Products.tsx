import  MonetizationOnIcon  from "@mui/icons-material/MonetizationOn"
import RemoveRedEyeIcon from  "@mui/icons-material/RemoveRedEye"
import { Container, Stack, Box, Button} from "@mui/material"
import React, { ChangeEvent, useEffect, useState } from "react"
import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import Badge from "@mui/material/Badge"
import  ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from  "@mui/icons-material/ArrowForward"
import SearchIcon from  "@mui/icons-material/Search"


import { useDispatch, useSelector} from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../libs/types/product"
import { setProducts } from "./slice"
import { retrieveProducts } from "./selector"
import { createSelector } from "reselect"
import ProductService from "../../services/ProductService"
import { ProductCollection } from "../../../libs/enums/product.enum"
import { serverApi } from "../../../libs/config"
import { useHistory } from "react-router-dom"

/**  REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data))
});

const productsRetriever = createSelector(
    retrieveProducts,
    (products) => ({products}),
)


export default function Products() {
const {setProducts} = actionDispatch(useDispatch());
const {products} = useSelector(productsRetriever);
const [ productSearch, setProductSearch ] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: " ",
});

const [searchText, setSearchText] = useState<string>("");
const history = useHistory();

useEffect(() => {
    const product = new ProductService()
    product.getProducts(productSearch)
    .then((date) => setProducts(date))
    .catch((err) => console.log(err))
}, [productSearch]);

useEffect(() => {
    if(searchText === ""){
        productSearch.search = "";
        setProductSearch({...productSearch});
    }
}, [searchText])

/***   HANDLERS   ***/

const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({...productSearch});
};

const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({...productSearch});
};

const searchProductHandler = () =>{
    productSearch.search = searchText;
    setProductSearch({...productSearch})
};

const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({...productSearch});
}

const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
}

    return (
        <div className="products">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className="avatar-big-box">
                        <Stack className="top-content">
                            <Box className="text">Burak Restaurant</Box>
                            <Box className="search-container">
                                <input type="text"
                                className="search-input"
                                placeholder="type here"
                                value={searchText}
                                name={"singleResearch"}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter") searchProductHandler();
                                }}
                                />
                                {searchText && (
                                    <button className="clear-button" onClick={() => setSearchText("")}
                                        style={{
                                            position: "absolute",
                                            right: "110px", // Search tugmasidan oldin
                                            background: "transparent",
                                            border: "none",
                                            cursor: "pointer",
                                            fontSize: "12px",
                                            color: "#999",
                                            padding: "5px",
                                        }}>
                                        ✖
                                    </button>
                                )}
                                <button className="search-button"
                                onClick={searchProductHandler}>
                                    Search <SearchIcon/>
                                </button>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack className="dishes-filter-section">
                        <Stack className="dishes-filter-box">
                            <Button variant="contained" className="order"
                            onClick={() => searchOrderHandler("createdAt")}
                            color={productSearch.order === "createdAt" ? "primary" : "secondary"}>
                                New
                            </Button>
                            <Button variant="contained" className="order"
                            onClick={() => searchOrderHandler("productPrice")}
                            color={productSearch.order === "productPrice" ? "primary" : "secondary"}>
                                Price
                            </Button>
                            <Button variant="contained" className="order"
                            onClick={() => searchOrderHandler("productViews")}
                            color={productSearch.order === "productViews" ? "primary" : "secondary"}>
                                View
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className="list-category-section">
                        <Stack className="product-category">
                            <div className="category-main">
                                <Button variant="contained" className="order"
                                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
                                color={ productSearch.productCollection === ProductCollection.OTHER
                                ? "primary"
                                : "secondary"
                                }>
                                    OTHER
                                </Button>
                                <Button variant="contained" className="order"
                                onClick={() => searchCollectionHandler(ProductCollection.DESERT)}
                                color={ productSearch.productCollection === ProductCollection.DESERT
                                    ? "primary"
                                    : "secondary"
                                    }>
                                    DESERT
                                </Button>
                                <Button variant="contained" className="order"
                                onClick={() => searchCollectionHandler(ProductCollection.DRINK)}
                                color={ productSearch.productCollection === ProductCollection.DRINK
                                    ? "primary"
                                    : "secondary"
                                    }>
                                    DRINK
                                </Button>
                                <Button variant="contained" className="order"
                                onClick={() => searchCollectionHandler(ProductCollection.SALAD)}
                                color={ productSearch.productCollection === ProductCollection.SALAD
                                    ? "primary"
                                    : "secondary"
                                    }>
                                    SALAD
                                </Button>
                                <Button variant="contained" className="order"
                                onClick={() => searchCollectionHandler(ProductCollection.DISH)}
                                color={ productSearch.productCollection === ProductCollection.DISH
                                    ? "primary"
                                    : "secondary"
                                    }>
                                    DISH
                                </Button>
                            </div>
                        </Stack>

                        <Stack className="product-wrapper">
                        {products.length !== 0 ? (
                            products.map((product: Product) => {
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                const sizeVolume = product.productCollection === ProductCollection.DRINK
                                ? product.productVolume + " litre"
                                : product.productSize + " size";
                                return (
                                    <Stack
                                        key={product._id}
                                        className="product-card"
                                        onClick={()=> chooseDishHandler(product._id)}>
                                        <Stack className="product-img" sx={{background: `url(${imagePath})`}}>
                                            <div className="product-sale">{sizeVolume}</div>
                                            <Button className="shop-btn">
                                                <img src={"/icons/shopping-cart.svg"} alt="" style={{display:"flex"}} />
                                            </Button>
                                            <Button className="view-btn" sx={{right: "40px"}}>
                                                <Badge badgeContent ={product.productViews} color="secondary">
                                                    <RemoveRedEyeIcon sx ={{color: product.productViews === 0 ? "gray" : "white",}} />
                                                </Badge>
                                            </Button>
                                        </Stack>
                                        <Box className="product-descs">
                                            <span className="product-title">
                                                {product.productName}
                                            </span>
                                            <div className="product-desc">
                                                <MonetizationOnIcon/>
                                                {product.productPrice}
                                            </div>
                                        </Box>
                                    </Stack>
                                )
                            })
                        ) : (
                            <Box className="no-data"> Products are not available</Box>
                        ) }
                        </Stack>
                    </Stack>

                    <Stack className="pagination-section">
                        <Pagination
                            count={products.length !== 0
                                ? productSearch.page + 1
                                : productSearch.page
                            }
                            page={productSearch.page}
                            renderItem={(item)=>(
                            <PaginationItem components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,}}
                                {...item} color="secondary" />
                        ) }
                        onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className="brands-logo">
                <Container className="family-brands">
                    <Box className =" category-title"> Our Family Brands</Box>
                    <Stack className="brand-list">
                        <Box className="review-box" >
                            <img src={"/img/gurme.webp"} alt="" />
                        </Box>
                        <Box className="review-box">
                            <img src={"/img/seafood.webp"} alt="" />
                        </Box>
                        <Box className="review-box" >
                            <img src={"/img/doner.webp"} alt="" />
                        </Box>
                        <Box className="review-box">
                            <img src={"/img/sweets.webp"} alt="" />
                        </Box>
                    </Stack>
                </Container>
            </div>

            <div className="address">
                <Container>
                    <Stack className="address-area">
                        <Box className="tittle">Our address</Box>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.363734762081!2d69.2267250514616!3d41.322703307863044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b9a0a33281d%3A0x9c5015eab678e435!2z0KDQsNC50YXQvtC9!5e0!3m2!1sko!2skr!4v1655461169573!5m2!1sko!2skr"
                            height="500"
                            width="1320"
                            style={{ marginTop: "50px"}}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google map showing our restaurant address here"
                        />
                    </Stack>
                </Container>
            </div>

        </div>
    )
}