import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navigation = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className='main-navigation'>
            <button type="button" className="menu-toggle" onClick={toggleMenu}><i className="fa fa-bars"></i></button>
            <ul className={isMenuOpen ? 'menu-open' : 'menu'}>
                <li className="menu-item"><Link to="/">Home</Link></li>
                <li className="menu-item"><Link to="/news">News</Link></li>
                <li className="menu-item"><Link to="/live-cameras">Live cameras</Link></li>
                <li className="menu-item"><Link to="/photos">Photos</Link></li>
                <li className="menu-item"><Link to="/contact">Contact</Link></li>
            </ul>
        </div>


    );
};

export default Navigation;