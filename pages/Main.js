import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavoritesContext } from '../context/Favorites';
import { useFocusEffect } from '@react-navigation/native';

// Función para obtener los datos de los Pokémon
const fetchMovies = async (setMovies) => {
    try {
        const response = await fetch('https://letterboxdapi-yfvv.onrender.com/api/products');
        const data = await response.json();
        console.log({data})
        setMovies(data);
    } catch (error) {
        console.error(error);
    }
};

// Componente para mostrar una tarjeta de Pokémon
const MoviewCard = ({ movie, toggleFavorite, isFavorite }) => {
    return (
        <View style={styles.card}>
            {/* Botón para agregar a favoritos */}
            <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(movie._id)}>
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavorite ? 'red' : 'gray'}
                />
            </TouchableOpacity>

            {/* Imagen del Pokémon */}
            <Image source={{ uri: movie.image }} style={styles.movieImage} />

            {/* Nombre del Pokémon */}
            <Text style={styles.movieName}>{movie.name}</Text>

            {/* ID del Pokémon */}
            <Text style={styles.movieId}>ID: {movie._id}</Text>
        </View>
    );
};

export const MainScreeen = () => {
    const [movies, setMovies] = useState([]);
    const { favorites, toggleFavorite } = useContext(FavoritesContext); // Consumimos el contexto

    useFocusEffect(
        useCallback(() => {
            fetchMovies(setMovies); // Fetch movies when the screen is focused
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={movies}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <MoviewCard
                        movie={item}
                        toggleFavorite={toggleFavorite}
                        isFavorite={favorites.includes(item._id)}
                    />
                )}
                numColumns={2}
            />
        </View>
    );
};


//Favoritos
export const FavoritesScreen = () => {
    const { favorites, toggleFavorite } = useContext(FavoritesContext); // Consumimos el contexto
    const [movies, setMovies] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchMovies(setMovies); // Fetch movies when the screen is focused
        }, [])
    );

    console.log({movies, favorites})

    const favoriteMovies = movies.filter((movie) => favorites.includes(movie._id));
    console.log({favoriteMovies})

    return (
        <View style={styles.container}>
            {favoriteMovies.length > 0 ? (
                <FlatList
                    data={favoriteMovies}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <MoviewCard
                            movie={item}
                            toggleFavorite={toggleFavorite}
                            isFavorite={favorites.includes(item._id)}
                        />
                    )}
                    numColumns={2}
                />
            ) : (
                <Text style={styles.text}>No tienes favoritos aún</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 20,
        margin: 10,
        alignItems: 'center',
        flex: 1,
        elevation: 4,
        position: 'relative',
    },
    movieImage: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    movieName: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    movieId: {
        fontSize: 14,
        color: '#888',
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default MainScreeen;
