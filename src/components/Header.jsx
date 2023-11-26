import Navigation from './Navigation';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className="site-header">
            <div className="container">
                <Link to="/" className="branding">
                    <img src="images/logo.png" alt="" className="logo" />
                    <div className="logo-type">
                        <h1 className="site-title">MyWeatherApp</h1>
                        <small className="site-description">my weather app</small>
                    </div>
                </Link>


                <Navigation />
                <div className="mobile-navigation"></div>
            </div>
        </div>
    );
};

export default Header;