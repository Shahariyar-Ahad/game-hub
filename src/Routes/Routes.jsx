import { createBrowserRouter } from "react-router";
import MainLayout from "../Mainlayout/MainLayout";
import Home from "../Pages/Home";

const router =createBrowserRouter([{
path:'/',
element:<MainLayout></MainLayout>,
children:[
    {path:'/',
    element:<Home></Home>,
    }

]

}]) 

console.log(router)
export default router