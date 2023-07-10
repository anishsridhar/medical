import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import {useState} from 'react';
import reactDom from 'react-dom';
import { BrowserRouter,Route,Switch,Routes } from 'react-router-dom';
import Login from './login';
import Signup from './signup'


function Routers(props){

 
    return (
     <>
  
         <BrowserRouter>
    
    <Route path="/" exact component={Login} ></Route>

   
    <Route path="/signup"  component={Signup} ></Route>


 
    </BrowserRouter>

       

     </>
    );
  }
export default Routers;