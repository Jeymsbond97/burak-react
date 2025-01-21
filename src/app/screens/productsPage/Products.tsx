import  MonetizationOnIcon  from "@mui/icons-material/MonetizationOn"
import RemoveRedEyeIcon from  "@mui/icons-material/RemoveRedEye"
import { Container, Stack, Box, Button} from "@mui/material"
import React from "react"
import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import Badge from "@mui/material/Badge"
import  ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from  "@mui/icons-material/ArrowForward"
import SearchIcon from  "@mui/icons-material/Search"



const  products = [
    {productName: "Cutlet", imagePath: "img/cutlet.webp"},
    {productName: "Kebab", imagePath: "img/kebab-fresh.webp"},
    {productName: "Kebab", imagePath: "img/kebab.webp"},
    {productName: "Lavash", imagePath: "img/lavash.webp"},
    {productName: "Lavash", imagePath: "img/lavash.webp"},
    {productName: "Cutlet", imagePath: "img/cutlet.webp"},
    {productName: "Kebab", imagePath: "img/kebab.webp"},
    {productName: "Kebab", imagePath: "img/kebab-fresh.webp"},
]

export default  function Products() {
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
                                placeholder="type here" />
                                <button className="search-button">
                                    Search <SearchIcon/>
                                </button>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack className="dishes-filter-section">
                        <Stack className="dishes-filter-box">
                            <Button variant="contained" color="primary" className="order">
                                New
                            </Button>
                            <Button variant="contained" color ="secondary" className="order">
                                Price
                            </Button>
                            <Button variant="contained" color="secondary" className="order">
                                View
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className="list-category-section">
                        <Stack className="product-category">
                            <div className="category-main">
                                <Button variant="contained" color="secondary" className="order">
                                    OTHER
                                </Button>
                                <Button variant="contained" color ="secondary" className="order">
                                    DESERT
                                </Button>
                                <Button variant="contained" color="secondary" className="order">
                                    DRINK
                                </Button>
                                <Button variant="contained" color="secondary" className="order">
                                    SALAD
                                </Button>
                                <Button variant="contained" color="primary" className="order">
                                    DISH
                                </Button>
                            </div>
                        </Stack>

                        <Stack className="product-wrapper">
                        {products.length !== 0 ? (
                            products.map((product, index) => {
                                return (
                                    <Stack key={index} className="product-card">
                                        <Stack className="product-img" sx={{background: `url(${product.imagePath})`}}>
                                            <div className="product-sale">Large size</div>
                                            <Button className="shop-btn">
                                                <img src={"/icons/shopping-cart.svg"} alt="" style={{display:"flex"}} />
                                            </Button>
                                            <Button className="view-btn" sx={{right: "40px"}}>
                                                <Badge badgeContent ={20} color="secondary">
                                                    <RemoveRedEyeIcon sx ={{color: 20 > 0 ? "gray" : "white",}} />
                                                </Badge>
                                            </Button>
                                        </Stack>
                                        <Box className="product-descs">
                                            <span className="product-title">
                                                {product.productName}
                                            </span>
                                            <div className="product-desc">
                                                <MonetizationOnIcon/>
                                                {12}
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
                        <Pagination count={3} page={1} renderItem={(item)=>(
                            <PaginationItem components={{previous: ArrowBackIcon, next: ArrowForwardIcon,}}{...item} color="secondary" />
                        ) } />
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