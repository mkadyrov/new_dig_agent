import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
import Text from "react-native-web/src/exports/Text";

export default  function HomeScreen({ navigation }) {
  return (
      <View style={{ flex: 1, alignItems: 'center'}}>
          <CustomHeader navigation={navigation}/>
      </View>
  );
}
