import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import SigninButton from '../Buttons/SigninButton';
import RegisterButton from '../Buttons/RegisterButton';
import Brand from './Brand';
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Logout from '../Buttons/Logout';
import SearchBar from './SearchBar';
import UserProfileDropDown from './HeaderComponents/UserProfileDropDown';
import AdminProfileDropDown from './HeaderComponents/AdminProfileDropDown';

//header of the webpage, aka top navigation bar of the website
class Header extends Component {

    render() {
        //create token and check if token is present
        let accountUtilities;
        const token = localStorage.getItem("token");
        if (token) {
            //check type of user logged in to show specific information
            let accountype = jwt_decode(token, { body: true })["accountType"];
            console.log(accountype);
            let dropdown;
            if (accountype === "admin") {
                dropdown = <div class="account-dropdown-options">
                    <AdminProfileDropDown />
                </div>
            } else {
                dropdown = <div class="account-dropdown-options">
                    <UserProfileDropDown />
                </div>
            }
            //show user details when logged in
            accountUtilities =
                //if token is present, change button display to welcome, log out and cart
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <div class="dropdown">
                                <button className="navbar-welcome-message">
                                    <Link style={{ color: "#FFFFFF" }} to="/userprofile">
                                        Welcome, {jwt_decode(token, { body: true })["username"]}<br />
                                    </Link>
                                </button>
                                {dropdown}
                            </div>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                </div>
            //else display sign in or register buttons
        } else {
            accountUtilities =
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            {/* button component to handle login */}
                            <SigninButton />
                        </li>
                        <li>
                            {/* button component to handle register */}
                            <RegisterButton />
                        </li>
                    </ul>
                </div>
        }
        //displays search bar and brand
        return (
            <div>
                {/* primary navigation bar */}
                <nav className="navbar navbar-expand-sm navbar-dark mb-4">
                    <div className="container">

                        {/* brand name to refresh page */}
                        <Brand />
                        {/* search feature in nav bar */}
                        <SearchBar />

                        {accountUtilities}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header;