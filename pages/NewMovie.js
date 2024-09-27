import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';

const NewMovie = () => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSave = async () => {
        if (!name || !quantity || !price) {
            Alert.alert('Error', 'Por favor complete todos los campos requeridos.');
        } else {
            const newMovie = {
                name: name,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                image: image || null, // Optional field
                createdAt: new Date().toISOString(),
            };
            console.log('New Movie:', newMovie);
            try {
                const response = await fetch('https://letterboxdapi-yfvv.onrender.com/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMovie),
                });
    
                if (!response.ok) {
                    throw new Error('Error al guardar la película');
                }
    
                const result = await response.json();
                console.log('Save successful:', result);
                Alert.alert('Success', 'La película se guardó correctamente.');
            } catch (error) {
                console.error('Save error:', error);
                Alert.alert('Error', 'Hubo un problema al guardar la película.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Añadir Nueva Película</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la película"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Cantidad disponible"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="URL de la imagen (opcional)"
                value={image}
                onChangeText={setImage}
                placeholderTextColor="#888"
            />
            {image ? (
                <Image
                    source={{ uri: image }}
                    style={styles.previewImage}
                />
            ) : null}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Guardar Película</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#00bfff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    previewImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 8,
    },
});

export default NewMovie;
