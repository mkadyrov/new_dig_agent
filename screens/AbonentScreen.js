import * as React from 'react';
import { StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import Copy from "../components/Copy";

class AbonentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
        category: 3,
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
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation}/>
        <ScrollView>
          <View style={styles.containerScreen}>
            <Text style={[styles.label, {borderTopWidth: 0, paddingTop: 0}]}>Обрабатывает</Text>
            <View style={styles.valueRow}>
              <Text style={styles.valueRowText}>{this.state.item.user}</Text>
              <Text style={styles.valueRowTab}>{this.state.item.tab}</Text>
            </View>
            <Text style={styles.label}>Абонент</Text>
            <Text style={styles.value}>{this.state.item.phone}</Text>
            <Text style={styles.label}>ФИО</Text>
            <Text style={styles.value}>{this.state.item.name}</Text>
            <Text style={styles.label}>ИИН</Text>
            <Text style={styles.value}>{this.state.item.iin}</Text>
            <Text style={styles.label}>Оценка</Text>
            <View style={styles.rates}>
              <Image style={styles.star} source={this.state.item.rate >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
              <Image style={styles.star} source={this.state.item.rate >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
              <Image style={styles.star} source={this.state.item.rate >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
              <Image style={styles.star} source={this.state.item.rate >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
              <Image style={styles.star} source={this.state.item.rate >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
            </View>
            <Text style={styles.label}>Категория</Text>
            <View style={styles.categoryBlock}>
              {this.state.categoryes.map((category, index) =>
                <View key={index} style={[styles.category, category.id == this.state.item.category ? styles.on : null]}>
                  <Text style={[styles.categoryText, category.id == this.state.item.category ? styles.onText : null]}>{category.name}</Text>
                </View>
              )}
            </View>
            <Text style={styles.label}>Жалобы</Text>
            <View style={styles.complaintBlock}>
              {this.state.item.complaints.map((complaint, index) =>
                <View key={index} style={styles.complaint}>
                  <Text style={styles.complaintText}>{complaint.text}</Text>
                </View>
              )}
            </View>
            <Text style={styles.label}>Комментарий</Text>
            <Text style={styles.value}>{this.state.item.comment}</Text>
            <Text style={styles.label}>Фотография</Text>
            <Image style={styles.photo} source={require('../assets/images/image.jpg')} />
            <Copy />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AbonentScreen;

const styles = StyleSheet.create({
  container: {

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
    paddingTop: 15,
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
    paddingTop: 10,
    paddingBottom: 15,
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
    width: 15,
    height: 15,
    marginRight: 5,
    marginTop: -1,
  },
  categoryBlock: {
    width: '100%',
    paddingBottom: 20,
  },
  category: {
    width: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDD',
    marginTop: 15,
    padding: 10,
    color: '#333',
  },
  categoryText: {
    fontSize: 13,
    color: '#333',
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
  }
});
