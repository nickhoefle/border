import React  from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <div id='footerWrapper'>
            <a href='https://www.github.com/nickhoefle'>
                <img 
                    src={'/border/icons/github-mark.png'} 
                    height='35px'
                    alt='github-icon'
                />
            </a>
            <a 
                className='footerLink'
                href='https://www.cbp.gov/document/stats/nationwide-encounters'
            >
                CBP.GOV
            </a>
            <Link 
                className='footerLink'
                to='/csvdata'
            >
                CSV
            </Link>
            <Link 
                className='footerLink'
                to='/jsondata'
            >
                JSON
            </Link>
            <div id='techIcons'>
                <a href='https://www.openstreetmap.org/'>
                    <img 
                        src={'/border/icons/osm.png'} 
                        height='30px'
                        alt='osm-icon'
                    />
                </a>
                <a 
                    href='https://leafletjs.com/'
                    id='leafletIcon'
                >
                    <img 
                        src={'/border/icons/leaflet.png'} 
                        height='30px'
                        alt='leaflet-icon'
                    />
                </a>
            </div>
        </div>
    );
};

export default Footer;