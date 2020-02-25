import React from 'react';
import { View, Image } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import styles from './styles';

const CustomHeader = ({ navigation }) => (
  <Header
    containerStyle={[styles.container]}
    leftComponent={<Icon name="menu" style={[styles.icon]} onPress={() => navigation.openDrawer()} />}
    centerComponent={<Image style={[styles.image]} source={require('../../assets/logo.png')} />}
  />
);

export default CustomHeader;
