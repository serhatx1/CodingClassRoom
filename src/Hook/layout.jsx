import React from 'react';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

const Layout = ({ children }) => {
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
