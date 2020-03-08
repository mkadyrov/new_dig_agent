import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView, TextInput } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
import { Icon } from 'native-base';

import Copy from "../components/Copy";

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      passRecover: false,
      statusLoad: false,
      block: false,
      success: false,
      successFalse: false,
      successNotTrue: false,
      newPassword: '',
      confirmPassword: '',
    };
    this.data = {};
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value !== '') {
        fetch("https://api2.digitalagent.kz/api/admin/profile",
          {
            method: 'GET',
            headers: {
              'Authorization': value,
            },
          }
        )
        .then(res => res.json())
        .then(
          (result) => {
            this.data = result;
            this.setState({statusLoad: true});
          },
          (error) => {}
        );
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  setPassword() {
    if (this.state.newPassword !== '' && this.state.confirmPassword !== '') {
      this.setState({success: false, successFalse: false, successNotTrue: false, block: true});
      if (this.state.newPassword === this.state.confirmPassword) {
        fetch("https://api2.digitalagent.kz/api/profile/password",
          {
            method: 'PUT',
            body: JSON.stringify({email: this.state.newPassword}),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({success: true, successFalse: false, successNotTrue: false});
          },
          (error) => {
            this.setState({success: false, successFalse: true, successNotTrue: false});
          }
        );
      } else {
        this.setState({success: false, successFalse: false, successNotTrue: true});
      }
    }
  }

  reset() {
    this.setState({success: false, successFalse: false, successNotTrue: false, block: false});
  }

  render() {
    return (
        <View style={styles.container}>
          <CustomHeader navigation={this.props.navigation} title="Профиль" />
          {this.state.statusLoad &&
            <ScrollView>
              <Image style={styles.image} source={require('../assets/images/image.jpg')} />
              <View style={styles.containerScreen}>
                <Text style={[styles.label, {marginTop: 0}]}>ФИО</Text>
                <View style={[styles.value, {flexDirection: 'row'}]}>
                  <View style={styles.tab}><Text style={styles.value}>{this.data.user.name.slice(0,1)}</Text></View>
                  <Text style={[styles.value, {marginTop: 5}]}>{this.data.user.name}</Text>
                </View>
                <Text style={styles.label}>Должность</Text>
                <Text style={styles.value}>{this.data.user.position}</Text>
                <Text style={styles.label}>Раб. телефон</Text>
                <Text style={styles.value}>{this.data.user.phone.work}</Text>
                <Text style={styles.label}>Моб. телефон</Text>
                {this?.data?.user?.phone?.mobile?.map((mob, index2) =>
                  <Text key={index2} style={styles.value}>{mob}</Text>
                )}
                <Text style={styles.label}>Электронная почта</Text>
                <Text style={styles.value}>{this.data.user.email}</Text>
                <Text style={styles.label}>Организация</Text>
                <Text style={styles.value}>{this.data.user.organization.nameRu}</Text>
                {this.data.contactPersons &&
                  <View>
                    <View style={styles.line}></View>
                    <Text style={styles.label}>Контактные лица</Text>
                    {this.data.contactPersons.map((contact, index3) => {
                      if (contact.name) {
                        return (
                        <View key={index3} style={[styles.value, {flexDirection: 'row', marginBottom: 10,}]}>
                          <View style={styles.tab}><Text style={styles.value}>{contact.name.slice(0,1)}</Text></View>
                          <Text style={[styles.value, {marginTop: 5}]}>{contact.name}</Text>
                        </View>
                        );
                      }
                    })}
                  </View>
                }
                {!this.state.passRecover &&
                  <Text style={styles.button} onPress={() => this.setState({passRecover: true})}>Сменить пароль</Text>
                }
                {this.state.passRecover &&
                  <Text style={styles.button} onPress={() => this.setState({passRecover: false})}>Отменить</Text>
                }
                {this.state.passRecover &&
                  <View style={styles.inputsBlock}>
                    <Icon name="ios-lock" style={[styles.iconPass, {top: 30}]} />
                    <Icon name="ios-lock" style={[styles.iconPass, {top: 95}]} />
                    <TextInput onChange={(e) => this.setState({newPassword: e.nativeEvent.text})} value={this.state.newPassword} style={styles.input} placeholder='Новый пароль' />
                    <TextInput onChange={(e) => this.setState({confirmPassword: e.nativeEvent.text})} value={this.state.confirmPassword} style={styles.input} placeholder='Повторите новый пароль' />
                    <Text style={styles.button} onPress={() => this.setPassword()}>Сохранить</Text>
                  </View>
                }
                <Copy />
              </View>
            </ScrollView>
          }
          {this.state.block === true &&
            <View style={styles.block}>
              {this.state.success === false && this.state.successFalse === false && this.state.successNotTrue === false &&
                <Image style={{ width: 80, height: 45, }} source={require('../assets/images/Pulse.gif')} />
              }
              {this.state.success === true &&
                <View style={styles.success}>
                  <Text style={styles.successText}>Пароль изменен</Text>
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
                  <Text style={styles.successText}>Пароли не совпадают</Text>
                  <Text style={styles.button} onPress={() => this.reset(true)}>Закрыть</Text>
                </View>
              }
            </View>
          }
        </View>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 170,
  },
  containerScreen: {
    padding: 20,
  },
  label: {
    width: '100%',
    paddingBottom: 10,
    fontSize: 13,
    color: '#777',
    marginTop: 30,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  tab: {
    backgroundColor: '#E8E8E8',
    borderRadius: 40,
    width: 40,
    height: 40,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#DDD',
    marginTop: 30,
  },
  inputsBlock: {
    width: '100%',
    position: 'relative',
  },
  iconPass: {
    position: 'absolute',
    left: 17,
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
    padding: 20,
  },
  success: {
    width: '100%',
  },
  successText: {
    width: '100%',
    textAlign: 'center',
  }
});
