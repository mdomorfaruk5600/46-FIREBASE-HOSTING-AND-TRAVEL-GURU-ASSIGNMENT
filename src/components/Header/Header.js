import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import '../Header/Header.css';
import { Link } from 'react-router-dom';
import { handleSignOut } from '../Login/LoginManager';
import { UserContext } from '../../App';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to='/shop'>Shop</Link>
                <Link to='/review'>Order Review</Link>
                <Link to='/orders'>Order History</Link>
                <a href="/">Welcome, {loggedInUser.name}</a>
                {loggedInUser.email ? <button onClick={()=>setLoggedInUser({})}>Sign out</button>:<Link to="/login">Login</Link>}
            </nav>
        </div>
    );
};

export default Header;