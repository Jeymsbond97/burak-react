import React from "react";
import moment from "moment";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Stack } from "@mui/material";

export default function ProcessOrders() {
    return (
    <TabPanel value={"2"}>
    <Stack>
        {[1,2].map((ele, index) => {
        return (
        <Box key={index} className="order-main-box">
        <Box className="order-box-scroll">
            {[1,2].map((ele2, index2) => {
            return (
            <Box key={index2} className="orders-name-price">
            <img
                src={"/img/kebab.webp"}
                className="order-dish-img" alt=""
            />
            <p className="title-dish">Kebab</p>
            <Box className="price-box">
                <p>$10</p>
                <img src={"/icons/close.svg"} alt=""/>
                <p>$2</p>
                <img src={"/icons/pause.svg"}  alt=""/>
                <p style={{ marginLeft: "15px" }}>$20</p>
            </Box>
            </Box>
            );
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
            <p className="data-compl">
            {moment().format("YY-MM-DD HH:mm")}
            </p>
            <Button variant="contained" className="verify-button-process">
                Verify to Fulfil
            </Button>
        </Box>
        </Box>
        );
        })}

        {false && (
        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }} alt=""
            />
        </Box>
        )}
    </Stack>
    </TabPanel>
    );
}
