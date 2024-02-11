import React  from 'react';

const Footer = () => {

    return (
        <div id='footerWrapper'>
            <a href='https://www.github.com/nickhoefle'>
                <img 
                    src={'/icons/github-mark.png'} 
                    height='40px'
                    alt='github-icon'
                />
            </a>
            <a 
                className='footerLink'
                href='/jsondata'
            >
                JSON
            </a>
            <a 
                className='footerLink'
                href='https://www.cbp.gov/document/stats/nationwide-encounters'
            >
                CBP.GOV
            </a>
        </div>
    );
};

export default Footer;