import TabPanel  from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import React from "react";



export default function FinishedOrders() {
    return (
            <TabPanel value={"3"}>
                        <Stack>
                            {[1, 2].map((ele, index)=> {
                                return (
                                    <Box key={index} className="order-main-box">
                                        <Box className="order-box-scroll">
                                            {[1,2].map((ele2, index2)=> {
                                                return (
                                                    <Box key={index2} className="orders-name-price">
                                                        <img src={"/img/kebab-fresh.webp"}
                                                        alt=""
                                                        className="order-dish-img"
                                                        />
                                                        <p className="title-dish">Kebab</p>
                                                        <Box className="price-box">
                                                            <p>$9</p>
                                                            <img src="/icons/close.svg" alt="" />
                                                            <p>2</p>
                                                            <img src="/icons/pause.svg" alt="" />
                                                            <p style={{marginLeft: "15px"}}>$24</p>
                                                        </Box>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                        <Box className="total-price-box">
                                            <Box className="box-total">
                                                <p>Product price</p>
                                                <p>$60</p>
                                                <img src={"/icons/plus.svg"} style={{ marginLeft: "12px" }} alt="" />
                                                <p>delivery cost</p>
                                                <p>$5</p>
                                                <img
                                                src={"/icons/pause.svg"}
                                                style={{ marginLeft: "12px" }} alt=""
                                                />
                                                <p>Total</p>
                                                <p>$65</p>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })}

                            {false && (
                                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                                        <img
                                        src={"/icons/noimage-list.svg"}
                                        style={{ width: 300, height: 300 }} alt=""
                                        />
                                    </Box>
                            )}

                        <Stack className="order-cards">
                            <Stack className="order-main-card">
                                <Box className="full-card">
                                    <input type="number"  placeholder="Card number 5432 2323 1221 5654"/>
                                </Box>
                                <Box className="half-card">
                                    <input type="date"  placeholder="Card number 5432 2323 1221 5654"/>
                                    <input type="number"  placeholder="CVV: 123"/>
                                </Box>
                                <Box className="full-card">
                                    <input type="text"  placeholder="Enter Your Full Name"/>
                                </Box>
                                <Box className="cards-img">
                                    <div className="card-img">
                                        <img src="/icons/western-card.svg" alt="" />
                                        <img src="/icons/master-card.svg" alt="" />
                                        <img src="/icons/paypal-card.svg" alt="" />
                                        <img src="/icons/visa-card.svg" alt="" />
                                    </div>
                                </Box>
                            </Stack>
                        </Stack>
                        </Stack>
                    </TabPanel>
        )
}