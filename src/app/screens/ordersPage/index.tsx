import {Box, Container, Stack} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import TabContext from '@mui/lab/TabContext';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs"
import PausedOrders from "./PausedOrders"
import FinishedOrders from "./FinishedOrders";
import ProcessOrders from "./ProcessOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import "../../../css/order.css";
import { Order, OrderInquiry } from "../../../libs/types/order";
import { OrderStatus } from "../../../libs/enums/order.enum";
import OrderService from "../../services/OrderService";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const {setFinishedOrders, setPausedOrders, setProcessOrders}
  = actionDispatch(useDispatch())
  const [value, setValue] = useState('1')
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE
  })

  useEffect(() => {
    const order = new OrderService();

    order
    .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
    .then((data) => setPausedOrders(data))
    .catch((err) => console.log(err));

    order
    .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
    .then((data) => setProcessOrders(data))
    .catch((err) => console.log(err));

    order
    .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
    .then((data) => setFinishedOrders(data))
    .catch((err) => console.log(err));
  }, [orderInquiry])

  /**     HANDLER   **/

  const handleChange = (e: SyntheticEvent, newValue: string) =>{
    setValue(newValue);
  }

  return (
    <div className="order-page">
        <Container className="order-container">
          <Stack className="order-left">
              <TabContext value={value}>
                  <Box className="order-nav-frame">
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs
                          value={value}
                          onChange={handleChange}
                          aria-label="basic tabs example"
                          className="table-list"
                          >
                        <Tab label="PAUSED ORDERS" value={"1"} />
                        <Tab label="PROCESS ORDERS" value={"2"} />
                        <Tab label="FINISHED ORDERS" value={"3"} />
                      </Tabs>
                    </Box>
                  </Box>
                  <Stack className="order-main-content">
                      <PausedOrders/>
                      <ProcessOrders/>
                      <FinishedOrders/>
                    </Stack>
              </TabContext>
          </Stack>

          <Stack className="order-right">
            <Box className="order-info-box">
                <Box className="member-box">
                    <div className="order-user-img">
                      <img
                        src="/icons/default-user.svg" alt=""
                        className="order-user-avatar"
                        />
                        <div className="order-user-icon-box">
                          <img
                            src="/icons/user-badge.svg"
                            alt=""
                            className="order-user-prof-img" />
                        </div>
                    </div>
                    <span className="order-user-name">Martin</span>
                    <span className="order-user-prof">User</span>
                </Box>
                <Box className="liner"></Box>
                <Box className="location">
                  <div className="location-address">
                    <img src="/icons/location.svg" alt="" />
                    <span className="spes-address-txt"> South Korea, Jeonju </span>
                  </div>
                </Box>
            </Box>
          </Stack>
        </Container>
    </div>
  )
}
