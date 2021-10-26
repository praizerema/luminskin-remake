import React, { Component } from 'react';
import { Link } from "react-router-dom";
import  CartImg from "../images/download-cart.png"

function NavBar({onClick, itemNo}){
return(
    <div className="px-12 py-2 mb-16 bg-gray-50 border-solid border-t-2 border-b-2 border-gray-100 w-full fixed top-0 left-0">
        <div className="flex justify-between content-center items-center">
            <div className="flex justify-between items-center space-x-6">
            <img src="https://store.luminskin.com/_next/static/images/logo-20c2cb1d9d2bb6d2139d0e5cec3103bd.png" alt="Lumin Logo" className="h-12 mr-8"/>
            <Link to ="/">Shop</Link>
            <Link to ="/">Learn</Link>

            </div>
            <div className="flex justify-between space-x-6">
                <Link to="/">
                Account</Link>
                <div onClick={onClick} className="relative flex"><img src={CartImg} alt="" className="h-6"/><span className="absolute -top-2.5 -right-3 text-sm">{itemNo}</span></div>
            </div>
        </div>
    </div>
)
}

export default NavBar;