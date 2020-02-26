import * as React from 'react';
import {Header, ScrollView, Platform, StatusBar, StyleSheet, View, Text} from 'react-native';
import {Icon, SplashScreen} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Image} from 'react-native';
// import BottomTabNavigator from './navigation/BottomTabNavigator';
import SideBarNavigator from "./navigation/SideBarNavigator";
import useLinking from './navigation/useLinking';
import * as Constants from "expo";
import CustomHeader from "./components/CustomHeader";

const Stack = createStackNavigator();

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const {getInitialState} = useLinking(containerRef);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                    <Stack.Navigator headerMode="none">
                        <Stack.Screen name="Root" component={SideBarNavigator} options={{
                            headerStyle: {backgroundColor: '#343434'},
                            headerTitleAlign: "center",
                        }}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      marginTop: (Platform.OS === 'ios') ? 0 : 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        paddingHorizontal: 20,
        justifyContent: 'center'
    }
});
