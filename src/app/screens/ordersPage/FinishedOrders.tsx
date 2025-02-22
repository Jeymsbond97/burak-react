import TabPanel  from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import React from "react";

import { useSelector } from "react-redux";
import {createSelector} from "reselect";
import { retrieveFinishedOrders} from "./selector";
import { serverApi } from "../../../libs/config";
import { Order, OrderItem } from "../../../libs/types/order";
import { Product } from "../../../libs/types/product";

/**  REDUX SLICE & SELECTOR  **/
const finishedOrdersRetriever = createSelector(
    retrieveFinishedOrders,
    (finishedOrders) => ({finishedOrders}),
)

export default function FinishedOrders() {
    const { finishedOrders} = useSelector(finishedOrdersRetriever)
    return (
            <TabPanel value={"3"}>
                        <Stack>
                            {finishedOrders?.map((order: Order)=> {
                                return (
                                    <Box key={order._id} className="order-main-box">
                                        <Box className="order-box-scroll">
                                            {order?.orderItems?.map((item: OrderItem)=> {
                                                const product: Product = order.productData.filter(
                                                (ele: Product) => item.productId === ele._id
                                                )[0];
                                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                                return (
                                                    <Box key={item._id} className="orders-name-price">
                                                        <img src={imagePath}
                                                        alt=""
                                                        className="order-dish-img"
                                                        />
                                                        <p className="title-dish">{product.productName}</p>
                                                        <Box className="price-box">
                                                            <p>${item.itemPrice}</p>
                                                            <img src="/icons/close.svg" alt="" />
                                                            <p>{item.itemQuantity}</p>
                                                            <img src="/icons/pause.svg" alt="" />
                                                            <p style={{marginLeft: "15px"}}>${item.itemQuantity * item.itemPrice}</p>
                                                        </Box>
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                        <Box className="total-price-box">
                                            <Box className="box-total">
                                                <p>Product price</p>
                                                <p>${order.orderTotal - order.orderDelivery}</p>
                                                <img src={"/icons/plus.svg"} style={{ marginLeft: "12px" }} alt="" />
                                                <p>delivery cost</p>
                                                <p>${order.orderDelivery}</p>
                                                <img
                                                src={"/icons/pause.svg"}
                                                style={{ marginLeft: "12px" }} alt=""
                                                />
                                                <p>Total</p>
                                                <p>${order.orderTotal}</p>
                                            </Box>
                                        </Box>
                                    </Box>
                                )
                            })}

                            {!finishedOrders || (finishedOrders.length === 0 && (
                                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                                        <img
                                        src={"/icons/noimage-list.svg"}
                                        style={{ width: 300, height: 300 }} alt=""
                                        />
                                    </Box>
                            ))}

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