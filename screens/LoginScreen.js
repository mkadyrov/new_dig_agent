import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView, TextInput  } from 'react-native';
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
      position: 'center',
      email: '',
      emailRecover: '',
      password: '',
      token: '',
      success: false,
      successFalse: false,
      successNotTrue: false,
      successInvalid: false,
      block: false,
    };
  }

  setPostion(bool) {
    if (bool) {
      this.setState({position: 'flex-start'});
    } else {
      this.setState({position: 'center'});
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('token').then((value) => this.setState({token: value}));
  }

  setLogin() {
    this.refs.email.blur();
    this.refs.password.blur();
    if (this.state.email !== '' && this.state.password !== '') {
      this.setState({block: true, successFalse: false, successNotTrue: false, successInvalid: false});
      fetch("https://api2.digitalagent.kz/api/auth/signin",
        {
          method: 'POST',
          body: JSON.stringify({email: this.state.email, password: this.state.password}),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => res.json())
      .then(
        (result) => {
          this.setPostion(false);
          AsyncStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTVmNWU4MjVkYzI5ODAwNTQ4MjZhN2UiLCJleHAiOjE1ODg1Mjg1MjAsImlhdCI6MTU4MzM0NDUyMH0.8bG-smVSse2kRKj9E2qzj-WQGCrDrMWVTlgOHvJDh7A');
          AsyncStorage.setItem('token', result.token);
          this.props.navigation.navigate('Home');
          if (result.token) {
            if (result.role.name === 'operator') {
              AsyncStorage.setItem('id', result.id);
              AsyncStorage.setItem('token', result.token);
              this.props.navigation.navigate('Home');
            } else {
              this.setState({successFalse: false, successNotTrue: true, successInvalid: false})
            }
          } else {
            if (result.code === 'invalid password') {
              this.setState({successFalse: false, successNotTrue: false, successInvalid: true})
            } else {
              this.setState({successFalse: false, successNotTrue: true, successInvalid: false})
            }
          }
        },
        (error) => {
          this.setState({successFalse: true, successNotTrue: false, successInvalid: false})
        }
      )
    } else {
      this.setState({successFalse: false, successNotTrue: false, block: true, successInvalid: true})
    }
  }

  setRecover() {
    this.refs.emailRecover.blur();
    if (this.state.emailRecover) {
      this.setState({block: true, successFalse: false, successNotTrue: false, success: false});
      fetch("https://api2.digitalagent.kz/api/auth/reset",
        {
          method: 'POST',
          body: JSON.stringify({email: this.state.emailRecover}),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => res.json())
      .then(
        (result) => {
          this.setPostion(false);
          if (result.success) {
            if (result.success === true) {
              this.setState({successFalse: false, successNotTrue: false, success: true, emailRecover: ''})
            } else {
              this.setState({successFalse: true, successNotTrue: false, success: false})
            }
          } else {
            this.setState({successFalse: false, successNotTrue: true, success: false})
          }
        },
        (error) => {
          this.setState({successFalse: true, successNotTrue: false, success: false})
        }
      )
    } else {
      this.setState({successFalse: false, successNotTrue: true, success: false, block: true})
    }
  }

  reset(nav) {
    this.setState({block: false, success: false, recover: nav})
  }

  render() {
    return (
      <View style={[styles.container, {justifyContent: this.state.position}]}>
        <View style={styles.containerScreen}>
          {this.state.recover &&
            <View>
              <View style={styles.center}>
                <Image style={{ width: 40, height: 45, }} source={require('../assets/images/logoImg.png')} />
                <Text style={styles.title}>Восстановление пароля</Text>
              </View>
              <View style={styles.inputsBlock}>
                <Icon name="ios-mail" style={styles.iconEmail} />
                <TextInput ref="emailRecover" style={styles.input} onFocus={(e) => this.setPostion(true)} onBlur={(e) => this.setPostion(false)}
                  onChange={(e) => this.setState({emailRecover: e.nativeEvent.text})} value={this.state.emailRecover} placeholder='Электронная почта' />
              </View>
              <Text style={styles.button} onPress={() => this.setRecover()}>Отправить</Text>
              <Text style={styles.textButton} onPress={() => this.setState({recover: false})}>Войти</Text>
              {this.state.block === true &&
                <View style={styles.block}>
                  {this.state.success === false && this.state.successFalse === false && this.state.successNotTrue === false &&
                    <Image style={{ width: 80, height: 45, }} source={require('../assets/images/Pulse.gif')} />
                  }
                  {this.state.success === true &&
                    <View style={styles.success}>
                      <Text style={styles.successText}>Инструкция по восстановлению отправлена на указанный E-mail</Text>
                      <Text style={styles.button} onPress={() => this.reset(false)}>Закрыть</Text>
                    </View>
                  }
                  {this.state.successFalse === true &&
                    <View style={styles.success}>
                      <Text style={styles.successText}>Извините, произошла ошибка</Text>
                      <Text style={styles.button} onPress={() => this.reset(true)}>Закрыть</Text>
                    </View>
                  }
                  {this.state.successNotTrue === true &&
                    <View style={styles.success}>
                      <Text style={styles.successText}>Пользователь не найден</Text>
                      <Text style={styles.button} onPress={() => this.reset(true)}>Закрыть</Text>
                    </View>
                  }
                </View>
              }
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
                <TextInput ref="email" style={styles.input} onFocus={(e) => this.setPostion(true)} onBlur={(e) => this.setPostion(false)}
                  onChange={(e) => this.setState({email: e.nativeEvent.text})} value={this.state.email} placeholder='Электронная почта' />
                <TextInput ref="password" style={styles.input} onFocus={(e) => this.setPostion(true)} onBlur={(e) => this.setPostion(false)}
                  onChange={(e) => this.setState({password: e.nativeEvent.text})} value={this.state.password} placeholder='Пароль' />
              </View>
              <Text style={styles.button} onPress={() => this.setLogin()}>Войти</Text>
              <Text style={styles.textButton} onPress={() => this.setState({recover: true})}>Забыли пароль?</Text>
              {this.state.block === true &&
                <View style={styles.block}>
                  {this.state.successFalse === false && this.state.successNotTrue === false && this.state.successInvalid === false &&
                    <Image style={{ width: 80, height: 45, }} source={require('../assets/images/Pulse.gif')} />
                  }
                  {this.state.successFalse === true &&
                    <View style={styles.success}>
                      <Text style={styles.successText}>Извините, произошла ошибка</Text>
                      <Text style={styles.button} onPress={() => this.reset(false)}>Закрыть</Text>
                    </View>
                  }
                  {this.state.successNotTrue === true &&
                    <View style={styles.success}>
                      <Text style={styles.successText}>Пользователь не найден</Text>
                      <Text style={styles.button} onPress={() => this.reset(false)}>Закрыть</Text>
                    </View>
                  }
                  {this.state.successInvalid === true &&
                    <View style={styles.success}>
                      <Text style={styles.successText}>Неправильный E-mail или пароль</Text>
                      <Text style={styles.button} onPress={() => this.reset(false)}>Закрыть</Text>
                    </View>
                  }
                </View>
              }
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
  },
  block: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  success: {
    width: '100%',
  },
  successText: {
    width: '100%',
    textAlign: 'center',
  }
});
