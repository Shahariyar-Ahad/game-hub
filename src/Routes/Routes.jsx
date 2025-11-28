import { createBrowserRouter } from "react-router";
import MainLayout from "../Mainlayout/MainLayout";
import Home from "../Pages/Home";

import MyCommunity from "../Pages/MyCommunity";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Download from "../Pages/Download";
import ALLGames from "../Pages/Allgames";
import ErrorPage from "../Pages/ErrorPage";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../Pages/NotFound";
import ForgetPassword from "../Pages/ForgetPass";

const router =createBrowserRouter([{
path:'/',
element:<MainLayout></MainLayout>,
errorElement: <NotFound></NotFound>,
children:[
    {path:'/',
    element:<Home></Home>,
    },
    {path:'/allGames',
    element:<ALLGames></ALLGames>  ,
    },
    {path:'/community',
    element:<MyCommunity></MyCommunity>  ,
    },
    
    {path:'/login',
    element:<Login></Login>,
    },
    {path:'/forgetpass',
    element:<ForgetPassword></ForgetPassword>,
    },
    {path:'/register',
    element:<Register></Register>,
    },
    {path: '/download/:id',
  element: 
    <PrivateRoute>
      <Download />
    </PrivateRoute>
  
    },
    {path:'/profile',
    element: <PrivateRoute> <Profile></Profile> </PrivateRoute>           ,
    },
    
    

]

}]) 

console.log(router)
export default router