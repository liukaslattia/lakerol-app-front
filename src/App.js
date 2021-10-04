import './App.css';
import React, { useState } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

// Importing the Context Provider & Home Component
import MyContextProvider from './contexts/MyContext';
import Home from './components/Home'
import SingleProduct from './components/SingleProduct';

function App() {
  return (
    <BrowserRouter>
      <MyContextProvider>
        <Route exact path="/" component={Home} />
        
        <Route exact path="/product/:productGtin" component={SingleProduct} />

      </MyContextProvider>
    </BrowserRouter>

  );
}

export default App;
