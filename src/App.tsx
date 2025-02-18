import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage  from './app/screens/homePage';
import ProductsPage  from './app/screens/productsPage';
import  OrdersPage  from './app/screens/ordersPage';
import  UserPage  from './app/screens/userPage';
import  HomeNavbar  from './app/components/headers/HomeNavbar';
import  OtherNavbar  from './app/components/headers/OtherNavbar';
import Footer  from './app/components/footer';
import  HelpPage  from './app/screens/helpPage';
import './css/app.css';
import "./css/navbar.css";
import "./css/footer.css"
import useBasket from './app/hooks/useBasket';
import AuthenticationModal from './app/components/auth';
import { sweetErrorHandling, sweetTopSuccessAlert } from './libs/sweetAlert';
import { Messages } from './libs/config';
import MemberService from './app/services/MemberService';
import { useGlobals } from './app/hooks/useGlobals';


function App() {

  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const {setAuthMember } = useGlobals();

  /**   HANDLERS   **/

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseLogout = () => setAnchorEl(null);

  const handleLogoutRequest = async () => {
    try{
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
    }catch(err){
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  }

  return (
      <>
        {location.pathname === "/" ? <HomeNavbar
          cartItems={cartItems}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          onAdd={onAdd}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          handleCloseLogout ={handleCloseLogout}
          anchorEl ={anchorEl}
          handleLogoutClick ={handleLogoutClick }
          handleLogoutRequest ={handleLogoutRequest}
          />
          : <OtherNavbar
          cartItems={cartItems}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          onAdd={onAdd}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          handleCloseLogout ={handleCloseLogout}
          anchorEl ={anchorEl}
          handleLogoutClick ={handleLogoutClick }
          handleLogoutRequest ={handleLogoutRequest}
          />}
        <Switch>
          <Route path="/products">
            <ProductsPage onAdd = {onAdd} />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
          <Route path="/help">
            <HelpPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer/>

        <AuthenticationModal
          signupOpen={signupOpen}
          loginOpen={loginOpen}
          handleSignupClose={handleSignupClose}
          handleLoginClose={handleLoginClose}
          />
      </>
  );
}

export default App;