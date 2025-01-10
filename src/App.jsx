import React from 'react'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Posts from './pages/Posts'
import { AddEditPosts } from './pages/AddEditPosts'
import Auth from './pages/Auth'
import PwReset from './pages/PwReset'
import 'bootstrap/dist/css/bootstrap.min.css';

import Admin from './pages/Admin'
import Header from './components/Header'
import { NotFound } from './pages/NotFound'
import { Profile } from './pages/Profile'
import { DeleteAccount } from './pages/DeleteAccount'
import { Detail } from './pages/Detail'

const router=createBrowserRouter([
  {element:<Header/>,
    children:[
      {path:'/',element:<Home/>},
      {path:'/posts',element:<Posts/>},
      {path:'/create',element:<AddEditPosts/>},
      {path:'/update/:id',element:<AddEditPosts/>},
      {path:'/auth/in',element:<Auth/>},
      {path:'/auth/up',element:<Auth/>},
      {path:'/pwreset',element:<PwReset/>},
      {path:'/profile',element:<Profile/>},
      {path:'/deleteAccount',element:<DeleteAccount/>},
      {path:'/admin',element:<Admin/>},
      {path:'*',element:<NotFound />},
      {path:'/detail/:id',element:<Detail/>}
    ]
  }
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_fetcherPersist: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }} 
)

export default function App() {
  return  <RouterProvider router={router}   future={{v7_startTransition: true}}/>
}
