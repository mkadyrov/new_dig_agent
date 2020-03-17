import React from 'react';
import { View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import styles from './styles';
import { NavigationActions } from 'react-navigation';

const CustomHeader = ({ navigation, title }) => {
  if (title == '') {
    return (<Header
      containerStyle={[styles.container]}
      leftComponent={<Icon name="menu" style={[styles.icon]} onPress={() => navigation.openDrawer()} />}
      centerComponent={<Image style={{height: 30, width: 80, marginLeft: -15}} source={require('../../assets/images/logo.png')} />}
    />);
  } else {
    return (<Header
      containerStyle={[styles.container]}
      leftComponent={<Icon name="arrow-back" style={[styles.icon]} onPress={() => navigation.goBack()} />}
      centerComponent={<Text style={[styles.text]}>{title}</Text>}
    />);
  }
};

export default CustomHeader;
