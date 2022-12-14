import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header className="bg-secondary mb-4 py-2 flex-row align-center">
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <Link to ="/">
                    <hi>Restaurant Reviews</hi>
                </Link>
                <nav className="text-center">
                    <Link to="/searchreviews">Search Reviews</Link>
                    {Auth.loggedIn() ? (
                        <>
                          <Link to="/profile">MY PROFILE</Link>
                          <a href="/" onClick={logout}>
                              LOGOUT
                          </a>
                        </>  
                    )   : (
                        <>
                         <Link to="/login"> LOGIN </Link>
                         <Link to="/signup"> SIGNUP</Link>
                         
                        </>
                    )}
                </nav>
            </div>
        </header>

    );
    
};

export default Header;