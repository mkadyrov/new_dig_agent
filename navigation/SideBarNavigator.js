import * as React from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from  '@react-navigation/drawer';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HelpScreen from '../screens/HelpScreen';
import LoginScreen from '../screens/LoginScreen';

import ComplaintsProcessScreen from '../screens/ComplaintsProcessScreen';
import ComplaintsProcessedScreen from '../screens/ComplaintsProcessedScreen';

import AbonentComplaintProcessScreen from '../screens/AbonentComplaintProcessScreen';
import AbonentComplaintProcessedScreen from '../screens/AbonentComplaintProcessedScreen';

import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function SideBarNavigator({ navigation, route }) {

    return (
        <Drawer.Navigator
          initialRouteName={INITIAL_ROUTE_NAME} drawerStyle={{backgroundColor: '#FFFFFF'}}
          drawerContentOptions={{
            activeTintColor: 'yellow',
            inactiveTintColor:'#fff'
          }}
          drawerItemStyle
          drawerContent={DrawerContent}>

            <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Вход',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
                    gestureEnabled: false,
                }}
            />

            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Главная',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
                }}
            />

            <Drawer.Screen
                name="Details"
                component={DetailsScreen}
                options={{
                    title: 'Рейтинг услогодателя',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Профиль',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="HistoryScreen"
                component={HistoryScreen}
                options={{
                    title: 'История',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="HelpScreen"
                component={HelpScreen}
                options={{
                    title: 'Помощь',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />


            <Drawer.Screen
                name="ComplaintsProcessScreen"
                component={ComplaintsProcessScreen}
                options={{
                    title: 'Активные',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="ComplaintsProcessedScreen"
                component={ComplaintsProcessedScreen}
                options={{
                    title: 'Завершенные',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="AbonentComplaintProcessScreen"
                component={AbonentComplaintProcessScreen}
                options={{
                    title: 'Активные',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="AbonentComplaintProcessedScreen"
                component={AbonentComplaintProcessedScreen}
                options={{
                    title: 'Обработанная жалоба',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

        </Drawer.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

    switch (routeName) {
        case 'Home':
            return 'How to get started';
        case 'Links':
            return 'Links to learn more';
    }
}
