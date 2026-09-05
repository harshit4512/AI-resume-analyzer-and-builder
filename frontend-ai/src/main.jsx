// import { StrictMode } from 'react'
// File Purpose

// This is the entry point of the React application.

// Its responsibilities are:

// Find the HTML element where React will be mounted.
// Create the React root.
// Render the root component (App).
// Wrap the application with BrowserRouter so routing works.

// This is the first JavaScript file executed when the React application starts.

import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <App />
 </BrowserRouter>
 
)
