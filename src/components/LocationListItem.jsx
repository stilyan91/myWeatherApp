import styleLocation from '../styles/locationsList.module.css';
import { Link, useNavigate } from 'react-router-dom';

const LocationListItem = ({
    location,
    onSelectLocation,
    forEditing,
    favoriteToEdit,
}) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        onSelectLocation(location);
        navigate('/' + location.Key, {
            state: {
                forEditing: forEditing,
                favoriteToEdit: favoriteToEdit
            }
        });
    };

    return (
        <li
            key={location.key}
            className={styleLocation.li}
            onClick={clickHandler}
        >

            <div className={`table-row ${styleLocation['table-row']} `} >
                <div className={`table-cell ${styleLocation['table-cell']}`}>Type: {location.Type}</div>
                <div className={`table-cell ${styleLocation['table-cell']}`}>Name: {location.LocalizedName}</div>
                <div className={`table-cell ${styleLocation['table-cell']}`}>Country: {location.Country.LocalizedName}</div>
                <div className={`table-cell ${styleLocation['table-cell']}`}>Administrative Area: {location.AdministrativeArea.LocalizedName}</div>
            </div>


        </li>
    );
};

export default LocationListItem;