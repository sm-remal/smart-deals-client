import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then(() => {
                alert("Sign Out Successfully")
            })
            .catch(error => {
                console.log(error?.message);
            })
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        
                        <li><NavLink to={"/"}>Home</NavLink></li>
                        <li><NavLink to={"/allProducts"}>All Products</NavLink></li>

                        {
                            user && <>
                                <li><NavLink to={"/myProducts"}>My Products</NavLink></li>
                                <li><NavLink to={"/myBids"}>My Bids</NavLink></li>
                                <li><NavLink to={"/createProduct"}>create Product</NavLink></li>
                            </>
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Smart<span className='text-primary'>Deals</span></a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/allProducts"}>All Products</NavLink></li>

                    {
                        user && <>
                            <li><NavLink to={"/myProducts"}>My Products</NavLink></li>
                            <li><NavLink to={"/myBids"}>My Bids</NavLink></li>
                            <li><NavLink to={"/createProduct"}>create Product</NavLink></li>
                        </>
                    }

                </ul>
            </div>
            <div className="navbar-end flex gap-3">
                {
                    user ? <Link onClick={handleSignOut} to={"/login"} className="btn btn-primary">Sign Out</Link> : <>
                        <Link to={"/login"} className="btn btn-primary">Login</Link>
                        <Link to={"/signup"} className="btn btn-primary">Sign Up</Link>
                    </>
                }


            </div>
        </div>
    );
};

export default Navbar;