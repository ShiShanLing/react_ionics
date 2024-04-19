import * as React from "react";
import { useRoutes } from 'react-router-dom'

import Tabbar from '../views/Tabbar'
import Home from '../pages/Home'
import SubmitOrderPage from '../pages/SubmitOrder/SubmitOrder'
import PayPage from '../pages/PayPage/PayPage'
export default function Index() {
    const element = useRoutes(
        [
            {
                path: '/',
                element: <Home/>,
                children:[
                    {
                        path:'SubmitOrderPage',
                        element:<SubmitOrderPage/>
                    },
                    {
                        path:"PayPage",
                        element:<PayPage/>
                    }
                ]
            },
            {
                path: 'Login',
                element: <Login/>,
            },
        ]
    )
    return element
}