import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from '../context/authContext';


const Navigation = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated } = useContext(AuthContext);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className='main-navigation'>
            <button type="button" className="menu-toggle" onClick={toggleMenu}><i className="fa fa-bars"></i></button>
            <ul className={isMenuOpen ? 'menu-open' : 'menu'}>
                <li className="menu-item"><Link to="/">Home</Link></li>
                {isAuthenticated
                    ? (
                        <>
                            <li className="menu-item"> <Link to="/login">Favorites</Link></li>
                            <li className="menu-item"> <Link to="/logout">Logout</Link></li>
                        </>

                    ) : (
                        <>
                            <li className="menu-item"><Link to="/register">Register</Link></li>
                            <li className="menu-item"> <Link to="/login">Login</Link></li>
                        </>
                    )
                }

            </ul>
        </div>
    );
};

export default Navigation;