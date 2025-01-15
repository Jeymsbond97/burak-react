import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

export function HomeNavbar() {
    const authMember = null;
    return (
        <div className="home-navbar">
          <Container className="navbar-container" sx={{ mt: "55px", height: "642px" }}>
            <Stack className="menu" >
               <Box>
                <NavLink to="/" className="custom-link">
                    <img className="brand-logo" src="/icons/burak.svg"/>
                </NavLink>
               </Box>
               <Stack className="links">
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
                            <Button variant="contained" className="login-button">Login</Button>
                        </Box>
                    ) : (
                        <img className="user-avatar" src={"/icons/default-user.svg"} aria-haspopup={"true"}/>
                    )}
               </Stack>
            </Stack>
            <Stack>Detail</Stack>
          </Container>
        </div>
    )
}