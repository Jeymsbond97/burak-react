import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useEffect, useState } from "react";

export default function HomeNavbar() {
    const authMember = null;
    const [count, setCount ] = useState<number>(0);
    const [value, setvalue] = useState<boolean>(true);

    useEffect( () => {
        console.log("componentDidMount"); // DATA FETCH;
        setCount(count + 1);

        return () => {
            console.log("componentWillUnMount")
        };
    }, [value] );

    // Handlers

    const buttonHandler = () =>{
        setvalue(!value);
    }

    return (
        <div className="home-navbar">
            <Container className="navbar-container" sx={{ mt: "55px", height: "642px" }}>
                <Stack className="menu" >
                <Box>
                    <NavLink to="/" className="custom-link">
                        <img className="brand-logo" src="/icons/burak.svg" alt=""/>
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
                        <Basket/>
                        {!authMember ? (
                            <Box>
                                <Button variant="contained" className="login-button">Login</Button>
                            </Box>
                        ) : (
                            <img className="user-avatar" src={"/icons/default-user.svg"} alt="" aria-haspopup={"true"}/>
                        )}
                </Stack>
            </Stack>
            <Stack className="header-frame">
                <Stack className="detail">
                    <Box className="head-main-txt">
                        World's Most Delicious Cousine
                    </Box>
                    <Box className = "wel-txt">
                        The Choice, not just a choice
                    </Box>
                    <Box className= "service-txt">
                        {count} hours service
                    </Box>
                    <Box className="signup">
                        {!authMember ? (
                            <Button variant="contained" className="signup-button"onClick={buttonHandler}  >SIGN UP</Button>
                        ) : null}
                    </Box>
                </Stack>
                <Stack className="logo-frame">
                    <div className="logo-img"></div>
                </Stack>
            </Stack>
          </Container>
        </div>
    )
}