import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import {Todo, Welcome} from './components';

const router= createBrowserRouter(
  createRoutesFromElements
  (<Route path="/" element={<Home/>}>
    <Route path='' element={<Welcome/>}/>
    <Route path='todo' element={<Todo/>}/>
  </Route>)
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
