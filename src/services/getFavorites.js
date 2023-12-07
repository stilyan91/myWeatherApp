export const getFavorites = async () => {
    const response = await fetch('http://localhost:3030/data/favorites')
    const result = await response.json();
    return result;
}