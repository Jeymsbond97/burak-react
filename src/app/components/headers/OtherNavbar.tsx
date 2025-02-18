import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../libs/types/search";

interface OtherNavbarProps{
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, setLoginOpen } = props;
    const authMember = null;
    return  (
        <div className="other-navbar">
            <Container className="navbar-container" sx={{ mt: "55px" }}>
                <Stack className="menu" >
                    <Box>
                        <NavLink to="/" className="custom-link">
                            <img className="brand-logo" src="/icons/burak.svg" alt=""/>
                        </NavLink>
                    </Box>
                    <Stack className="links">
                        <Box className={"hover-line"} >
                            <NavLink to="/" className="custom-link">
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
                        <Basket
                            cartItems={cartItems}
                            onDelete={onDelete}
                            onRemove={onRemove}
                            onDeleteAll={onDeleteAll}
                            onAdd={onAdd}
                            />

                        {!authMember ? (
                            <Box>
                                <Button
                                    variant="contained"
                                    className="login-button"
                                    onClick={() => setLoginOpen(true)}
                                    >
                                        Login
                                </Button>
                            </Box>
                        ) : (
                            <img className="user-avatar" src={"/icons/default-user.svg"} alt="" aria-haspopup={"true"}/>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}