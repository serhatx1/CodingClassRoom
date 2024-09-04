import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import photo from "../img/logo.png";
import "./Header.css";
import { Search } from './Search';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getActivePage = () => {
        switch (location.pathname) {
            case '/login':
                return 'Login Page';
            case '/':
                return 'Register Page';
            case '/billing':
                return 'Billing';
            default:
                return 'Register Page';
        }
    };

    const handleClick = (page) => {
        switch (page) {
            case 'Login Page':
                navigate('/login');
                break;
            case 'Register Page':
                navigate('/');
                break;
            case 'Billing':
                navigate('/billing');
                break;
            default:
                break;
        }
    };

    const activePage = getActivePage();

    return (
        <div className='HeaderContainer'>
            <div className='HeaderBanner'>
                <img onClick={()=>navigate("/")} src={photo} alt="logo" />
                <div className='HeaderMiddleContainer'>
                    <div
                        className={`HeaderMiddle ${activePage === 'Login Page' ? 'active' : ''}`}
                        onClick={() => handleClick('Login Page')}
                    >
                        Login Page
                    </div>
                    <div
                        className={`HeaderMiddle ${activePage === 'Register Page' ? 'active' : ''}`}
                        onClick={() => handleClick('Register Page')}
                    >
                        Register Page
                    </div>
                    <div
                        className={`HeaderMiddle ${activePage === 'Billing' ? 'active' : ''}`}
                        onClick={() => handleClick('Billing')}
                    >
                        Billing
                    </div>
                </div>
            </div>
            <div className='HeaderRightest'>
                <Search />
            </div>
        </div>
    );
};

export default Header;
