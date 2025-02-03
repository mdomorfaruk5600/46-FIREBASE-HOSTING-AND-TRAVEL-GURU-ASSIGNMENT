import React, { createContext, useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Review from './components/Review/Review';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/RequireAuth';
import RequireAuth from './components/PrivateRoute/RequireAuth';
import Inventory from './components/Inventory/Inventory';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <h3>Logged In User Email: {loggedInUser.email}</h3>
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Shop/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/orders' element={<RequireAuth><Inventory/></RequireAuth>} />
        <Route path='/review' element ={<Review/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/shipment' element={
          <RequireAuth>
            <Shipment/>
          </RequireAuth>
      } />
        </Routes>
     </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
