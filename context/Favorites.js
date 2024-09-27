import React, { createContext, useState } from 'react';

// Creamos el contexto
export const FavoritesContext = createContext();

// Proveedor del contexto
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Función para agregar o quitar de favoritos
    const toggleFavorite = (movieId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(movieId)
                ? prevFavorites.filter((id) => id !== movieId)
                : [...prevFavorites, movieId]
        );
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
