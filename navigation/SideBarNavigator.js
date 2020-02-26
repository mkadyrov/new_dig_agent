import * as React from 'react';
import { createDrawerNavigator } from  '@react-navigation/drawer';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AbonentScreen from '../screens/AbonentScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HelpScreen from '../screens/HelpScreen';
import LoginScreen from '../screens/LoginScreen';

import ComplaintsNewScreen from '../screens/ComplaintsNewScreen';
import ComplaintsProcessScreen from '../screens/ComplaintsProcessScreen';
import ComplaintsProcessedScreen from '../screens/ComplaintsProcessedScreen';
import ComplaintsFailedScreen from '../screens/ComplaintsFailedScreen';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Login';

export default function SideBarNavigator({ navigation, route }) {

    return (
        <Drawer.Navigator
          initialRouteName={INITIAL_ROUTE_NAME} drawerStyle={{backgroundColor: '#343434'}}
          drawerContentOptions={{
            activeTintColor: 'yellow',
            inactiveTintColor:'#fff'
          }}
          drawerItemStyle>
            <Drawer.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    title: 'Авторизация',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
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
                name="Abonent"
                component={AbonentScreen}
                options={{
                    title: 'Абонент',
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
                name="ComplaintsNewScreen"
                component={ComplaintsNewScreen}
                options={{
                    title: 'Новые жалобы',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="ComplaintsProcessScreen"
                component={ComplaintsProcessScreen}
                options={{
                    title: 'В процессе',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="ComplaintsProcessedScreen"
                component={ComplaintsProcessedScreen}
                options={{
                    title: 'Обработанные',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
                }}
            />

            <Drawer.Screen
                name="ComplaintsFailedScreen"
                component={ComplaintsFailedScreen}
                options={{
                    title: 'Проваленные',
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
