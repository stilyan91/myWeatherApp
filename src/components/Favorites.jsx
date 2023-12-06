import { useEffect, useState } from "react";
import FavCard from "./Card";
import styles from '../styles/card.module.css';

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getFavorites = async () => {
            const response = await fetch('http://localhost:3030/data/favorites')
            const result = await response.json();
            setFavorites(result)
        }
        getFavorites();
    }, []);

    return (
        <div className={styles.cardContainer}>
            {favorites && favorites.map(favorite => <FavCard favorite={favorite} />)}
        </div>
    );
};
