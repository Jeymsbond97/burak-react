import TabPanel  from "@mui/lab/TabPanel";
import { Box, Stack} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";

import { useSelector } from "react-redux";
import {createSelector} from "reselect";
import { retrievePausedOrders} from "./selector";
import { Messages, serverApi } from "../../../libs/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order";
import { Product } from "../../../libs/types/product";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { T } from "../../../libs/types/common";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../libs/enums/order.enum";
import OrderService from "../../services/OrderService";

/**  REDUX SLICE & SELECTOR  **/
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({pausedOrders}),
);

interface ProcessOrdersProps {
    setValue: (input: string) => void;
}


export default function PausedOrders(props: ProcessOrdersProps) {
    const { setValue } = props;
    const { pausedOrders} = useSelector(pausedOrdersRetriever);
    const {authMember, setOrderBuilder} = useGlobals();

    /**   HANDLER   **/

const deleteOrderHandler = async (e: T) => {
    try{
        if(!authMember) throw new Error(Messages.error2);
        const orderId = e.target.value;
        const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.DELETE,
        };

        const confirmation = window.confirm("Do you want to delete the order?");
        if(confirmation){
            const order = new OrderService();
            await order.updateOrder(input);

            // REBUILD
            setOrderBuilder(new Date());

        }
    }
    catch(err){
        console.log(err);
        sweetErrorHandling(err).then();
    }
};

const processOrderHandler = async (e: T) => {
    try{
        if(!authMember) throw new Error(Messages.error2);
        //PAYMENT PROCESS

        const orderId = e.target.value;
        const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.PROCESS,
        };

        const confirmation = window.confirm("Do you want to proceed with payment?");
        if(confirmation){
            const order = new OrderService();
            await order.updateOrder(input);

            // FORWARD PROCESS
            setValue("2");
            setOrderBuilder(new Date());

        }
    }
    catch(err){
        console.log(err);
        sweetErrorHandling(err).then();
    }
};


    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order)=> {
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
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    color="secondary"
                                    className="cancel-button"
                                    onClick={deleteOrderHandler}
                                    >
                                        CANCEL
                                </Button>
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    color="success"
                                    className="pay-button"
                                    onClick={processOrderHandler}
                                    >
                                        PAYMENT
                                </Button>
                            </Box>
                        </Box>
                    )
                })}

                {!pausedOrders || (pausedOrders.length === 0 && (
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <img
                            src={"/icons/noimage-list.svg"}
                            style={{ width: 300, height: 300 }} alt=""
                            />
                        </Box>
                ))}
            </Stack>
        </TabPanel>
    )
}