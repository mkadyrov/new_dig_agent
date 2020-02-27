import * as React from 'react';
import {StyleSheet, Button, View, Text, Image, ScrollView, TextInput} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
import { Icon } from 'native-base';

import Copy from "../components/Copy";

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Алиев Арсен Калимулдаевич',
        tab: 'A',
        position: 'Руководитель отдела',
        phone: '+7 747 345 23 14',
        mobile: ['+7 747 345 23 14', '+7 747 345 23 14'],
        email: 'a.aliyev@gmail.com',
        company: 'Отделение №3, ЦОН Бостандыкского района, г.Алматы',
        contact: [
          {name: 'Досаев Серик Бахытович', tab: 'Д'},
          {name: 'Рахматулла Димаш Еркенулы', tab: 'Р'},
        ],
      },
      passRecover: false,
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <CustomHeader navigation={this.props.navigation} title="Профиль" />
          <ScrollView>
            <Image style={styles.image} source={require('../assets/images/image.jpg')} />
            <View style={styles.containerScreen}>
              <Text style={[styles.label, {marginTop: 0}]}>ФИО</Text>
              <View style={[styles.value, {flexDirection: 'row'}]}>
                <View style={styles.tab}><Text style={styles.value}>{this.state.user.tab}</Text></View>
                <Text style={[styles.value, {marginTop: 5}]}>{this.state.user.name}</Text>
              </View>
              <Text style={styles.label}>Должность</Text>
              <Text style={styles.value}>{this.state.user.position}</Text>
              <Text style={styles.label}>Раб. телефон</Text>
              <Text style={styles.value}>{this.state.user.phone}</Text>
              <Text style={styles.label}>Моб. телефон</Text>
              {this.state.user.mobile.map((mob, index2) =>
                <Text key={index2} style={styles.value}>{this.state.user.phone}</Text>
              )}
              <Text style={styles.label}>Электронная почта</Text>
              <Text style={styles.value}>{this.state.user.email}</Text>
              <Text style={styles.label}>Организация</Text>
              <Text style={styles.value}>{this.state.user.company}</Text>
              <View style={styles.line}></View>
              <Text style={styles.label}>Контактные лица</Text>
              {this.state.user.contact.map((contact, index3) =>
                <View key={index3} style={[styles.value, {flexDirection: 'row', marginBottom: 10,}]}>
                  <View style={styles.tab}><Text style={styles.value}>{contact.tab}</Text></View>
                  <Text style={[styles.value, {marginTop: 5}]}>{contact.name}</Text>
                </View>
              )}
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
                  <Icon name="ios-lock" style={[styles.iconPass, {top: 160}]} />
                  <TextInput style={styles.input} placeholder='Старый пароль' />
                  <TextInput style={styles.input} placeholder='Новый пароль' />
                  <TextInput style={styles.input} placeholder='Повторите новый пароль' />
                  <Text style={styles.button} onPress={() => this.setState({passRecover: false})}>Сохранить</Text>
                </View>
              }
              <Copy />
            </View>
          </ScrollView>
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
});
