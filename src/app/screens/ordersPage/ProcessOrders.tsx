import moment from "moment";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import {createSelector} from "reselect";
import { retrieveProcessOrders} from "./selector";
import { Messages, serverApi } from "../../../libs/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order";
import { Product } from "../../../libs/types/product";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../libs/enums/order.enum";
import { T } from "../../../libs/types/common";
import { useGlobals } from "../../hooks/useGlobals";

/**  REDUX SLICE & SELECTOR  **/
const processOrdersRetriever = createSelector(
    retrieveProcessOrders,
    (processOrders) => ({processOrders}),
);

interface FinishOrdersProps {
    setValue: (input: string) => void;
}

export default function ProcessOrders(props: FinishOrdersProps) {
    const { setValue } = props;
    const {authMember, setOrderBuilder} = useGlobals()
    const { processOrders} = useSelector(processOrdersRetriever);


     /**   HANDLER   **/

const finishOrderHandler = async (e: T) => {
    try{
        if(!authMember) throw new Error(Messages.error2);
        const orderId = e.target.value;
        const input: OrderUpdateInput = {
            orderId: orderId,
            orderStatus: OrderStatus.FINISH,
        };

        const confirmation = window.confirm("Have you received your order?");
        if(confirmation){
            const order = new OrderService();
            await order.updateOrder(input);

            // FORWARD FINISH
            setValue("3");
            setOrderBuilder(new Date());

        }
    }
    catch(err){
        console.log(err);
        sweetErrorHandling(err).then();
    }
};

    return (
    <TabPanel value={"2"}>
    <Stack>
        {processOrders?.map((order: Order)=> {
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
            <img
                src={imagePath}
                className="order-dish-img" alt=""
            />
            <p className="title-dish">{product.productName}</p>
            <Box className="price-box">
                <p>${item.itemPrice}</p>
                <img src={"/icons/close.svg"} alt=""/>
                <p>{item.itemQuantity}</p>
                <img src={"/icons/pause.svg"}  alt=""/>
                <p style={{ marginLeft: "15px" }}>${item.itemQuantity * item.itemPrice}</p>
            </Box>
            </Box>
            );
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
            <p className="data-compl">
            {moment().format("YY-MM-DD HH:mm")}
            </p>
            <Button value={order._id} onClick={finishOrderHandler} variant="contained" className="verify-button-process">
                Verify to Fulfil
            </Button>
        </Box>
        </Box>
        );
        })}

{!processOrders || (processOrders.length === 0 && (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }} alt=""
            />
        </Box>
        ))}
    </Stack>
    </TabPanel>
    );
}
// function setOrderBuilder(arg0: Date) {
//     throw new Error("Function not implemented.");
// }

