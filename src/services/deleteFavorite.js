
export const deleteFavorite = async (favorite, token) => {

    const hasConfirmed = confirm(`Are you sure you want to delete ${favorite.LocalizedName} ${favorite.Country.LocalizedName}`)
    if (hasConfirmed) {
        try {
            const response = await fetch(`https://localhost:3030/data/favorites/${favorite._id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    'X-Authorization': token,
                },
                body: JSON.stringify(favorite)
            });
            const result = await response.json();


        } catch (err) {
            console.error(`Error: ${err.message}`)
        }
    }
}