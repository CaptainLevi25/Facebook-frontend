import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { BrowserRouter, Route, Routes, Link, redirect, Navigate, useNavigate } from "react-router-dom";
import Login from './pages/login/Login';
import Home from './pages/home/Home.jsx';
ReactDOM.render(
 < BrowserRouter>
    <App />
 </BrowserRouter>
  ,
  document.getElementById('root')
);
