import { createBrowserRouter } from "react-router-dom"; // Changed to 'react-router-dom'

import MainLayout from "../Mainlayout/MainLayout"
import Home from "../Pages/Home";
import PetsSupply from "../Pages/PetsSupply";
import CategoryFiltered from "../Pages/CategoryFiltered";
import ListingDetails from "../Pages/ListingDetails";
import AddListing from "../Pages/AddListing";
import Mylisting from "../Pages/Mylisting";
import Myorders from "../Pages/Myorders";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Profile";
import UpdateListing from "../Pages/UpdateListing";
import NotFound from "../Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    
    element: <MainLayout></MainLayout>,
   
    children: [
      { path: "/", element: <Home /> },

      // Pets + Products Page
      { path: "/pets-supplies", element: <PetsSupply /> },

      // Category Filter Page
      {
        path: "/category/:categoryName",
        element:<CategoryFiltered></CategoryFiltered> ,
      },

    
      {
        path: "/listing/:id",
        element:<PrivateRoute><ListingDetails></ListingDetails></PrivateRoute> 
      },

           {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing></AddListing>
            </PrivateRoute>
            
          
        ),
      },

     
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <Mylisting></Mylisting>
          </PrivateRoute>
        ),
      }, 
      {
        path: "/update-listing/:id",
        element: (
          <PrivateRoute>
            <UpdateListing></UpdateListing>
          </PrivateRoute>
        ),
      }, 
      
      

     
      {
        path: "/my-orders",
        element: (
          <PrivateRoute><Myorders></Myorders></PrivateRoute>
           
          
        ),
      },

      // Auth Pages
      { path: "/login", element: <Login></Login> },
      { path: "/register", element:<Register></Register> },

      
      {
        path: "/profile",
        element: (
        <PrivateRoute> <Profile></Profile> </PrivateRoute>
            
        
        ),
      },
      {
        path: "*",
        element: (
       <NotFound></NotFound>
            
        
        ),
      },
      
      
    ],
  },
]);

export default router;