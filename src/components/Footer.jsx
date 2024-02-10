import React  from 'react';

const Footer = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '18px' }}>
            <a href='https://www.github.com/nickhoefle'>
                <img src={'/icons/github-mark.png'} height="40px"/>
            </a>
            <a href="/jsondata">JSON</a>
        </div>
    );
};

export default Footer;