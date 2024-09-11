import React, { useContext } from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';

const Layout = ({ children }) => {
    const { isAuthenticated,role } = useContext(AuthContext);
    const navigate = useNavigate()
    const url = window.location.href
    console.log(role,isAuthenticated,url)
    if(isAuthenticated===true&&role.length==0&&url!="http://localhost:3000/auth/role"){
      navigate("/auth/role")
    }
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;
