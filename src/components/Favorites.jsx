import { useContext, useEffect, useState } from "react";
import FavCard from "./Card";
import styles from '../styles/card.module.css';
import { getFavorites } from "../services/getFavorites";
import AuthContext from "../context/authContext";

export default function Favorites() {
    const { userId } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites()
            .then(data => {
                const filteredData = data.filter((favorite) => favorite._ownerId === userId)
                setFavorites(filteredData)
            })
            .catch(error => console.error("Failed to fetch favorites:", error));

    }, []);

    return (
        <div className={styles.cardContainer}>
            {favorites.length > 0 && favorites.map((favorite) => <FavCard key={favorite._id} favorite={favorite} />)}
        </div>
    );
};
