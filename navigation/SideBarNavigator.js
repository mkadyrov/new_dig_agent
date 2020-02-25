import * as React from 'react';
import { createDrawerNavigator } from  '@react-navigation/drawer';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function SideBarNavigator({ navigation, route }) {

    return (
        <Drawer.Navigator initialRouteName={INITIAL_ROUTE_NAME} drawerStyle={{
            backgroundColor: '#343434',
        }}
                          drawerContentOptions={{
                              activeTintColor: 'yellow',
                              inactiveTintColor:'#fff'
                          }}
        drawerItemStyle
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Get Started',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
                }}
            />
            <Drawer.Screen
                name="Links"
                component={LinksScreen}
                options={{
                    title: 'Resources',
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
