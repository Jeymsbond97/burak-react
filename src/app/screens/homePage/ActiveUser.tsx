import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider} from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import { retrieveTopUsers } from "./selector";


import { useSelector } from "react-redux";
import {createSelector} from "reselect";
import { serverApi } from "../../../libs/config";
import { Member } from "../../../libs/types/member";



/**  REDUX SLICE & SELECTOR  **/
const topUsersRetriever = createSelector(
    retrieveTopUsers,
    (topUsers) => ({topUsers}),
)

export default function ActiveUsers() {
    const {topUsers} = useSelector(topUsersRetriever);
        return (
        <div className={"active-users-frame"}>
        <Container>
            <Stack className={"main"}>
            <Box className={"category-title"}>Active Users</Box>
            <Stack className={"cards-frame"}>
                <CssVarsProvider>
                {topUsers.length !== 0 ? (
                    topUsers.map((ele: Member, index) => (
                    <Card key={index} variant="outlined" className="card">
                        <CardOverflow>
                        <AspectRatio ratio="1">
                            <img
                            src={`${serverApi}/${ele.memberImage}`}
                            alt='Bu yerda rasm bor'
                            style={{ height: "100%" }}
                            />
                        </AspectRatio>
                        </CardOverflow>
                        <CardOverflow>
                        <Box className="member-nickname">{ele.memberNick}</Box>
                        </CardOverflow>
                    </Card>
                    ))
                ) : (
                    <Box className="no-data">No Active Users!</Box>
                )}
                </CssVarsProvider>
            </Stack>
            </Stack>
        </Container>
        </div>
    );
}
