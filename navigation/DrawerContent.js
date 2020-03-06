import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'native-base';
import DrawerContentComponent from "../components/DrawerContentComponent";
export default function DrawerContent({ navigation, route }) {

    return (
        <DrawerContentComponent navigation={navigation} route={route}/>
    );
};
