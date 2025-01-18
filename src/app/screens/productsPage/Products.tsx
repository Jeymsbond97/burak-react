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
    {productName: "Kebab", imagePath: "img/kabab-fresh.webp"},
    {productName: "Kebab", imagePath: "img/kabab.webp"},
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
                        <Stack className="{product-category">
                            <div className="category-main">
                                <Button variant="contained" color="primary" className="order">
                                    DISH
                                </Button>
                                <Button variant="contained" color ="secondary" className="order">
                                    SALAD
                                </Button>
                                <Button variant="contained" color="secondary" className="order">
                                    DRINK
                                </Button>
                                <Button variant="contained" color="secondary" className="order">
                                    DESERT
                                </Button>
                                <Button variant="contained" color="secondary" className="order">
                                    OTHER
                                </Button>
                            </div>
                        </Stack>

                        <Stack className="product-wrapper">
                        {products.length !== 0 ? (
                            products.map((product, index) => {
                                return (
                                    <Stack key={index}>
                                        <Stack className="product-img" sx={{background: `url(${product.imagePath})`}}>
                                            <div className="product-sale">Large size</div>
                                            <Button className="shop-btn">
                                                <img src={"/icons/shopping-cart.svg"} alt="" style={{display:"flex"}} />
                                            </Button>
                                            <Button>
                                                <Badge badgeContent ={20} color="secondary">
                                                    <RemoveRedEyeIcon sx ={{color: 20 > 0 ? "gray" : "white",}} />
                                                </Badge>
                                            </Button>
                                        </Stack>
                                        <Box className="product-desc">
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
                            <img src={"/img/gurme.webp"} alt="" />
                        </Box>
                        <Box className="review-box" >
                            <img src={"/img/gurme.webp"} alt="" />
                        </Box>
                        <Box className="review-box">
                            <img src={"/img/gurme.webp"} alt="" />
                        </Box>
                    </Stack>
                </Container>
            </div>

            <div className="address">
                <Container>
                    <Stack className="address-area">
                        <Box className="tittle">Our address</Box>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127284.99733249089!2d127.02916684179687!3d35.8457338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357023430316d863%3A0xc7bc17e091c3429a!2sJeonju-si%2C%20Jeollabuk-do%2C%20South%20Korea!5e0!3m2!1sen!2sus!4v1700660482263!5m2!1sen!2sus"
                            width="1320"
                            height="500"
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