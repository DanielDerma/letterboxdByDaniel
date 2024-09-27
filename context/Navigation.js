import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
// Pages
import { MainScreeen, FavoritesScreen } from '../pages/Main';
import Login from "../pages/Login";
import Register from '../pages/Register';
import NewMovie from '../pages/NewMovie';

// Crear los navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Libreria') {
                        iconName = 'home';
                    } else if (route.name === 'Favoritos') {
                        iconName = 'heart-outline';
                    } else if (route.name === 'Agregar Peli') {
                        iconName = 'add-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Libreria" component={MainScreeen} options={{ headerShown: false }} />
            <Tab.Screen name="Favoritos" component={FavoritesScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Agregar Peli" component={NewMovie} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

// Agregar Drawer Navigator que envuelve las tabs
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Letterboxd by Daniel"
                component={MainTabs}
            />
            <Drawer.Screen
                name="Logout"
                component={LogoutScreen}
                options={{ title: 'Cerrar Sesión' }}
            />
        </Drawer.Navigator>
    );
};

// Componente para cerrar sesión
const LogoutScreen = ({ navigation }) => {
    navigation.replace('Login')
    return (
        <></>
    );
};

// Componente de navegación principal (Stack Navigator)
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Pantallas de Login y Registro */}
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ title: 'Iniciar Sesión', headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ title: 'Registrar', headerShown: false }}
                />
                {/* Pantalla principal que incluye el Drawer Navigator */}
                <Stack.Screen
                    name="Main"
                    component={DrawerNavigator}
                    options={{
                        title: 'MainAppp',
                        headerShown: false, // Ocultar el header del Stack ya que se usa en el Drawer
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
