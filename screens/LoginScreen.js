import * as React from 'react';
import { StyleSheet, Button, View, Text, Image, ScrollView, TextInput  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';

import RatesDetailsScreen from "../components/RatesDetailsScreen";
import Copy from "../components/Copy";

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recover: false,
    };
    console.log(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerScreen}>
          {this.state.recover &&
            <View>
              <View style={styles.center}>
                <Image style={{ width: 40, height: 45, }} source={require('../assets/images/logoImg.png')} />
                <Text style={styles.title}>Восстановление пароля</Text>
              </View>
              <View style={styles.inputsBlock}>
                <Icon name="ios-mail" style={styles.iconEmail} />
                <TextInput style={styles.input} placeholder='Электронная почта' />
              </View>
              <Text style={styles.button} onPress={() => this.setState({recover: false})}>Отправить</Text>
              <Text style={styles.textButton} onPress={() => this.setState({recover: false})}>Войти</Text>
            </View>
          }
          {!this.state.recover &&
            <View>
              <View style={styles.center}>
                <Image style={{ width: 40, height: 45, }} source={require('../assets/images/logoImg.png')} />
                <Text style={styles.title}>Вход в матрицу</Text>
              </View>
              <View style={styles.inputsBlock}>
                <Icon name="ios-mail" style={styles.iconEmail} />
                <Icon name="ios-lock" style={styles.iconPass} />
                <TextInput style={styles.input} placeholder='Электронная почта' />
                <TextInput style={styles.input} placeholder='Пароль' />
              </View>
              <Text style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>Войти</Text>
              <Text style={styles.textButton} onPress={() => this.setState({recover: true})}>Забыли пароль?</Text>
            </View>
          }
        </View>
        <Text style={styles.copy}>© 2019 Digital Agent. Все права принадлежат народу.</Text>
      </View>
    );
  };
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  containerScreen: {
    width: '100%',
    padding: 20,
    marginTop: -30,
  },
  center: {
    alignItems: 'center',
  },
  title: {
    marginTop: 50,
    fontSize: 20,
    color: '#7C7C7C',
    marginBottom: 10,
  },
  inputsBlock: {
    width: '100%',
    position: 'relative',
  },
  iconEmail: {
    position: 'absolute',
    left: 15,
    top: 30,
    zIndex: 10,
    fontSize: 25,
    color: '#BBB',
  },
  iconPass: {
    position: 'absolute',
    left: 17,
    top: 95,
    zIndex: 10,
    fontSize: 25,
    color: '#BBB',
  },
  input: {
    borderColor: '#DDD',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '100%',
    height: 45,
    backgroundColor: '#FFF',
    marginTop: 20,
    paddingLeft: 50,
    paddingRight: 15,
  },
  button: {
    width: '100%',
    height: 45,
    backgroundColor: '#FFC53D',
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 15,
  },
  textButton: {
    width: '100%',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 13,
    color: '#777',
  },
  copy: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    paddingBottom: 15,
  }
});
