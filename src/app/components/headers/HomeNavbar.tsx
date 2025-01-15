import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export function HomeNavbar() {
    const authMember = null;
    return (
        <div className="home-navbar">
          <Container sx={{mt:"55px", height: "642px"}}>
            <Stack  sx={{height: "50px"}} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
               <Box>
                <NavLink to="/" className="custom-link">
                    <img style={{width: "125px", height: "30px"}} src="/icons/burak.svg"/>
                </NavLink>
               </Box>
               <Stack flexDirection={"row"} justifyContent={"space-between"} minWidth={"700px"} alignItems={"center"}>
                    <Box className={"hover-line"} >
                        <NavLink to="/" className="custom-link" activeClassName="underline">
                           Home
                        </NavLink>
                    </Box>
                    <Box className={"hover-line"} >
                        <NavLink to="/products" className="custom-link" activeClassName="underline">
                           Products
                        </NavLink>
                    </Box>
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink to="/orders" className="custom-link" activeClassName="underline">
                               Orders
                            </NavLink>
                    </Box>
                    ) : null}
                    {authMember ? (
                        <Box className={"hover-line"}>
                            <NavLink to="/member-page" className="custom-link" activeClassName="underline">
                               My Page
                            </NavLink>
                    </Box>
                    ) : null}
                    <Box className={"hover-line"}>
                        <NavLink to="/help" className="custom-link" activeClassName="underline">
                           Help
                        </NavLink>
                    </Box>
                    {/* BUSKET */}

                    {!authMember ? (
                        <Box>
                            <Button variant="contained" style={{background: "#3776CC", color: "#f8f8f8"}}>Login</Button>
                        </Box>
                    ) : (
                        <img />
                    )}
               </Stack>
            </Stack>
            <Stack>Detail</Stack>
          </Container>
        </div> 
    )
}