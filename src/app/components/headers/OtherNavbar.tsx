import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../libs/config";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps{
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onRemove: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    setSignupOpen: (isOpen: boolean) => void;
    setLoginOpen: (isOpen: boolean) => void;
    handleCloseLogout: () =>void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) =>void;
    anchorEl: HTMLElement | null;
    handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
    const { cartItems, onAdd, onRemove, onDelete, onDeleteAll,
        setLoginOpen, handleCloseLogout, handleLogoutClick, anchorEl, handleLogoutRequest } = props;
    const {authMember} = useGlobals();
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
                            <img className="user-avatar"
                                src={ authMember?.memberImage
                                ? `${serverApi}/${authMember?.memberImage}`
                                : "/icons/default-user.svg"}
                                alt=""
                                aria-haspopup={"true"}
                                onClick={handleLogoutClick}
                                />
                        )}
                            <Menu
                                id="account-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseLogout}
                                onClick={handleCloseLogout}
                                PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                    <MenuItem onClick={handleLogoutRequest}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" style={{ color: 'blue' }} />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                            </Menu>
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}