import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import photo from "../img/logo.png";
import "./Header.css";
import { Search } from './Search';
import { AuthContext } from '../Context/Context';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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

    const handleLogout = () => {
        localStorage.removeItem('Token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    const activePage = getActivePage();

    return (
        <div className='HeaderContainer'>
            <div className='HeaderBanner'>
                <img onClick={() => navigate("/")} src={photo} alt="logo" />
                <div className='HeaderMiddleContainer'>
                    {!isAuthenticated && (
                        <>
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
                        </>
                    )}
                    <div
                        className={`HeaderMiddle ${activePage === 'Billing' ? 'active' : ''}`}
                        onClick={() => handleClick('Billing')}
                    >
                        Billing
                    </div>
                    <div className='HeaderMiddle HeaderMiddle2 Logout'>
                    {isAuthenticated && (
                    <button className='HeaderMiddle' onClick={handleLogout}>Logout</button>
                )}
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
