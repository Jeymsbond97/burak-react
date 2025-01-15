import React from 'react';
import './css/app.css';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { HomePage } from './app/screens/homePage';
import { ProductsPage } from './app/screens/productsPage';
import { OrdersPage } from './app/screens/ordersPage';
import { UserPage } from './app/screens/userPage';
import { HomeNavbar } from './app/components/headers/HomeNavbar';
import { OtherNavbar } from './app/components/headers/OtherNavbar';
import { Footer } from './app/components/footer';


function App() {

  const location = useLocation()
  console.log("location:", location)
  return (
    <Router>
      <>
       {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar/>}
        <Switch>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
          <Route path="/member-page">
            <UserPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer/>
      </>
    </Router>
  );
}

export default App;