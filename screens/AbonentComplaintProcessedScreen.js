import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
import { Icon } from 'native-base';

import Copy from "../components/Copy";

class AbonentComplaintProcessedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      statusLoad: false,
      categoryes: [
        { name: 'Комфорт', id: 1 },
        { name: 'Сервис', id: 2 },
        { name: 'Процедуры', id: 3 },
        { name: 'Персонал', id: 4 },
      ],
      item: {
        type: '1',
        phone: '7702 430 2021',
        rate: 1.5,
        time: '01:34',
        tab: 'Д',
        user: 'Досаев Ержан',
        name: 'Ахметов Бауржан Ермекович',
        iin: '781210400357',
        category: 2,
        complaints: [
          { text: 'Не компетентность персонала' },
          { text: 'Время ожидания в очереди' },
          { text: 'Отсутствие условий для лиц с ограниченными возможностями' },
        ],
        comment: 'Ужасное поведение менеджера, грубит, тянет время, неуч. Примите меры!',
        photo: '',
        tab: 'Д',
      },
    };
    this.complaints = [];
    this.data = {};
    AsyncStorage.getItem('idC').then((vl) => {
      console.log(vl);
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value !== '') {
        fetch(`https://api2.digitalagent.kz/api/reviews/${this.props.route.params.item._id}`,
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
            result.review.categories.forEach((item) => {
              item.criterias.forEach((item2) => {
                this.complaints.push(item2.nameRu);
              })
            });
            this.setState({statusLoad: true});
          },
          (error) => {}
        );
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} title='Завершенные' />
        {this.state.statusLoad &&
        <ScrollView>
          <View style={styles.containerScreen}>
            <Text style={[styles.label, {borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>Обработал(-a)</Text>
            <View style={[styles.value, {flexDirection: 'row'}]}>
              <View style={styles.tab}><Text style={styles.tabvalue}>{this.data.review.Operator[0] ? String(this.data.review.Operator[0].name).trim().slice(0, 1) : ''}</Text></View>
              <Text style={[styles.value, {marginTop: 5}]}>{this.data.review.Operator[0] ? String(this.data.review.Operator[0].name).trim() : ''}</Text>
            </View>
            <Text style={styles.label}>Абонент</Text>
            <Text style={styles.value}>{this.data.User.phone.mobile ? this.data.User.phone.mobile : ''}</Text>
            <Text style={styles.label}>ФИО</Text>
            <Text style={styles.value}>{this.data.User.name ? this.data.User.name : ''}</Text>
            <Text style={styles.label}>ИИН</Text>
            <Text style={styles.value}></Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{this.data.User?.email}</Text>
            <Text style={styles.label}>Оценка</Text>
            <View style={styles.rates}>
              <Image style={styles.star} source={this.data.review.rate >= 1 ? this.data.review.rate === 1 || this.data.review.rate > 1.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
              <Image style={styles.star} source={this.data.review.rate >= 2 ? this.data.review.rate === 2 || this.data.review.rate > 2.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
              <Image style={styles.star} source={this.data.review.rate >= 3 ? this.data.review.rate === 3 || this.data.review.rate > 3.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
              <Image style={styles.star} source={this.data.review.rate >= 4 ? this.data.review.rate === 4 || this.data.review.rate > 4.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
              <Image style={styles.star} source={this.data.review.rate >= 5 ? this.data.review.rate === 5 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
            </View>
            <Text style={styles.label}>Категория</Text>
            <View style={styles.categoryBlock}>
              {this.data.review.categories.map((category, index) =>
                <View key={index} style={styles.category}>
                  <View key={index}>
                    <Image style={styles.catImg} source={'https://api2.digitalagent.kz/' + (category.image)} />
                  </View>
                  <Text style={styles.categoryText}>{category.nameRu}</Text>
                </View>
              )}
            </View>
            <Text style={styles.label}>Жалобы</Text>
            <View style={styles.complaintBlock}>
              {this.complaints.map((complaint, index) =>
                <View key={index} style={styles.complaint}>
                  <Text style={styles.complaintText}>{complaint}</Text>
                </View>
              )}
            </View>
            <Text style={styles.label}>Комментарий</Text>
            <Text style={styles.value}>{this.data.review.text}</Text>
            <Text style={styles.label}>Фотография</Text>
            <Image style={styles.photo} source={require('../assets/images/image.jpg')} />
            <Copy />
          </View>
        </ScrollView>
        }
      </View>
    );
  }
}

export default AbonentComplaintProcessedScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerScreen: {
    padding: 20,
  },
  label: {
    fontSize: 13,
    color: '#999',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDD',
    paddingBottom: 10,
    paddingTop: 15,
    marginTop: 20,
  },
  valueRow: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 15,
  },
  valueRowText: {
    fontSize: 15,
    color: '#333',
  },
  valueRowTab: {
    borderRadius: 30,
    width: 30,
    height: 30,
    backgroundColor: '#E8E8E8',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 3,
    position: 'absolute',
    right: 0,
    bottom: 15,
  },
  value: {
    fontSize: 15,
    color: '#333',
  },
  tab: {
      backgroundColor: '#E8E8E8',
      borderRadius: 24,
      width: 24,
      height: 24,
      marginRight: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 3,
      marginTop: 6,
  },
  tabvalue: {
    fontSize: 10,
  },
  rates: {
    width: '40%',
    height: 15,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },
  star: {
    width: 24,
    height: 24,
    marginRight: 5,
    marginTop: -1,
  },
  categoryBlock: {
    width: '100%',
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  category: {
    width: '25%',
    padding: 5,
    color: '#333',
  },
  categoryTab:{
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  catImg: {
    width: 30,
  },
  categoryText: {
    fontSize: 9,
    color: '#333',
    width: '100%',
    textAlign: 'center',
    paddingTop: 5,
  },
  on: {
    borderColor: '#FFC53D',
    backgroundColor: '#FFF',
  },
  onText: {
    color: '#FFC53D',
  },
  complaintBlock: {
    width: '100%',
    paddingBottom: 20,
  },
  complaint: {
    width: '100%',
    marginTop: 15,
  },
  complaintText: {
    fontSize: 13,
    color: '#444',
  },
  photo: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
  callBlock: {
    width: '100%',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDD',
    padding: 20,
  },
  callButton: {
    backgroundColor: '#FEC63F',
    flexDirection: 'row',
  },
  callText: {
    width: '65%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 13,
  },
  callTime: {
    width: '35%',
    borderLeftWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E8AD2B',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  callIcon:{
    fontSize: 22,
    paddingRight: 10,
  },
  callTimeText: {
    fontSize: 13,
  }
});
