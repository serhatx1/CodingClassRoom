// Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div>
                <p style={textStyle}>© 2024 eClassRoom. All rights reserved.</p>
            </div>
            <div style={linksContainerStyle}>
                <a
                    href="https://www.linkedin.com/in/serhat-arslann/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                >
                    LinkedIn
                </a>
                <a
                    href="https://github.com/serhatx1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                >
                    GitHub
                </a>
            </div>
        </footer>
    );
};

const footerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#282c34',
    color: '#fff',
};

const linksContainerStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
};

const textStyle = {
    margin: '0',
};

const linkStyle = {
    color: '#61dafb',
    textDecoration: 'none',
};

export default Footer;
