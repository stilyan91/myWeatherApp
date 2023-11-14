import { Link } from 'react-router-dom';
// import styles from '../styles/Footer.module.css';


const Footer = () => {
    return (
        <footer className='site-footer'>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">

                    </div>
                    <div className="col-md-3 col-md-offset-1">
                        <div className="social-links">
                            <Link to="#"><i className="fa fa-facebook"></i></Link>
                            <Link to="#"><i className="fa fa-twitter"></i></Link>
                            <Link to="#"><i className="fa fa-google-plus"></i></Link>
                            <Link to="#"><i className="fa fa-pinterest"></i></Link>
                        </div>
                    </div>
                </div>

                <p>All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;