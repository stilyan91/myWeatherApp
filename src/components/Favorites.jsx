import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavCard from "./Card";
import styles from '../styles/card.module.css';
import { getFavorites } from "../services/getFavorites";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {

        getFavorites()
            .then(data =>
                setFavorites(data))
            .catch(error => console.error("Failed to fetch favorites:", error));

    }, []);

    return (
        <div className={styles.cardContainer}>
            {favorites.length > 0 && favorites.map((favorite) => (<FavCard key={favorite._id} favorite={favorite} />))}
        </div>
    );
};
