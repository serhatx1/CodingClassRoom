import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import photo from "../img/logo.png";
import "./Header.css";
import { Search } from './Search';
import { AuthContext } from '../Context/Context';
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, setIsAuthenticated, role,user} = useContext(AuthContext);
    const [userMenu,setUserMenu]=useState(false)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenu && !event.target.closest('.UserMenuContainer')) {
                setUserMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userMenu]);
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

    const handleSearchQueryChange = (query) => {
        console.log('Search query changed:', query);
    };

    const activePage = getActivePage();

    return (
        <div className='HeaderContainer'>
            <div className="HeaderSection">
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
                    <div className='HeaderMiddle HeaderMiddle2 Logout'>
                        {isAuthenticated && role === "teacher" && (
                            <div className='flex'>
                                <button className='HeaderMiddle' onClick={() => navigate("/class/create")}>Create Class</button>
                                <button className='HeaderMiddle' onClick={() => navigate("/exam/create")}>Create Exam</button>
                                <button className='HeaderMiddle' onClick={() => navigate("/class/get")}>My Classes</button>
                                <button className='HeaderMiddle' onClick={() => navigate("/exam/getAll")}>All Exams</button>
                            </div>
                        )}
                            {isAuthenticated && role === "student" && (
                            <div className='flex'>
                            <div className="HeadMiddle">
                        <button className='HeaderMiddle' onClick={() => navigate("/class/join")}>Join Class</button>

                        </div>
                            </div>
                        )}
                         
                    </div>
                </div>
            </div>
            <div className='HeaderMiddle HeaderMiddle2 Logout flex'>
            <div className='HeaderRightest'>
                <Search onSearchQueryChange={handleSearchQueryChange}/>
                </div>
                {isAuthenticated && (
                    <div className='flex'>
                     
                        <div className='UserMenuContainer'>
                            <div className='UserMenu' onClick={() => setUserMenu(!userMenu)}>
                        <h4>{user.name}</h4>
                        <FaRegUser size={25}  />

                    </div>
                    {userMenu && (
                        <div className='LogOutContainer'>
                        <div className="LogOutSection" onClick={handleLogout}>
                        <MdLogout className='UserSvg' size={30} />
                        <button className=" LogOutButton" >
                            Logout
                        </button>
                        </div>
                       
                        </div>
                    )}
                         </div>
                    </div>
                )}
                 
            </div>
           
            </div>
        </div>
    );
};

export default Header;
