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


function App() {

  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll} = useBasket();

  return (
      <>
        {location.pathname === "/" ? <HomeNavbar
          cartItems={cartItems}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          onAdd={onAdd}
          />
          : <OtherNavbar
          cartItems={cartItems}
          onDelete={onDelete}
          onRemove={onRemove}
          onDeleteAll={onDeleteAll}
          onAdd={onAdd}
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
      </>
  );
}

export default App;