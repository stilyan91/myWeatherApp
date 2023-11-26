import styleLocation from '../styles/locationsList.module.css';
import { Link } from 'react-router-dom';

const LocationListItem = ({
    location,
    onSelectLocation,

}) => {

    const clickHandler = () => {
        onSelectLocation(location);
    };

    return (
        <li
            key={location.key}
            className={styleLocation.li}
            onClick={clickHandler}
        >
            <Link to={`/${location.LocalizedName}`}>
                <div className={`table-row ${styleLocation['table-row']} `} >
                    <div className={`table-cell ${styleLocation['table-cell']}`}>Type: {location.Type}</div>
                    <div className={`table-cell ${styleLocation['table-cell']}`}>Name: {location.LocalizedName}</div>
                    <div className={`table-cell ${styleLocation['table-cell']}`}>Country: {location.Country.LocalizedName}</div>
                    <div className={`table-cell ${styleLocation['table-cell']}`}>Administrative Area: {location.AdministrativeArea.LocalizedName}</div>
                </div>
            </Link>

        </li>
    );
};

export default LocationListItem;