import * as React from 'react';
import { StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import RateHomeAbonent from "../components/RateHomeAbonent";
import Copy from "../components/Copy";

class ComplaintsProcessedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          name: 'Досаев Серик',
          tab: 'Д',
          abonents: [
            { phone: '7702 430 2021', rate: 1.5, time: '01:34', tab: 'A' },
            { phone: '7702 430 2021', rate: 2.5, time: '01:34', tab: 'A' },
            { phone: '7702 430 2021', rate: 3.5, time: '01:34', tab: 'A' },
            { phone: '7702 430 2021', rate: 4.4, time: '01:34', tab: 'A' },
          ],
        },
        {
          name: 'Досаев Серик',
          tab: 'Д',
          abonents: [
            { phone: '7702 430 2021', rate: 1.5, time: '01:34', tab: 'A' },
            { phone: '7702 430 2021', rate: 2.5, time: '01:34', tab: 'A' },
            { phone: '7702 430 2021', rate: 3.5, time: '01:34', tab: 'A' },
            { phone: '7702 430 2021', rate: 4.4, time: '01:34', tab: 'A' },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} title="Обработанные" />
        <ScrollView>
          <View style={styles.containerScreen}>
            <Text style={styles.topTitle}>
              <Image style={{ width: 25, height: 20, }} source={require('../assets/images/3.png')} /> Обработанные
            </Text>
            <Text style={styles.topTitleText}>Список обработанных жалоб от абонента, с разделением на сотрудников, которые их обработали.</Text>
            {this.state.items.map((item, index) =>
              <View key={index} style={styles.row}>
                <Text style={[styles.label, {marginTop: 0}]}>Сотрудник</Text>
                <View style={[styles.value, {flexDirection: 'row'}]}>
                  <View style={styles.tab}><Text style={styles.value}>{item.tab}</Text></View>
                  <Text style={[styles.value, {marginTop: 5}]}>{item.name}</Text>
                </View>
                <View style={styles.tableHead}>
                  <Text style={styles.tableHead1}>Абонент</Text>
                  <Text style={styles.tableHead2}>Рейтинг</Text>
                  <Text style={styles.tableHead3}>Время</Text>
                </View>
                <View style={styles.tables}>
                  {item.abonents.map((item2, index2) =>
                    <RateHomeAbonent key={index2} navigation={this.props.navigation} link='AbonentComplaintProcessedScreen' abonent={item2} type="3" />
                  )}
                </View>
              </View>
            )}
            <View>
            <Copy />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ComplaintsProcessedScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  containerScreen: {
    padding: 20,
  },
  topTitle: {
    fontSize: 20,
    paddingBottom: 20,
    textAlign: 'left',
  },
  topTitleText: {
    fontSize: 12,
    textAlign: 'left',
    color: '#777',
  },
  row: {
    marginTop: 30,
  },
  label: {
    width: '100%',
    paddingBottom: 10,
    fontSize: 13,
    color: '#777',
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
  tableHead: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'solid',
    paddingTop: 15,
  },
  tableHead1: {
    width: '45%',
    color: '#777',
    fontSize: 13,
    textAlign: 'left',
  },
  tableHead2: {
    width: '35%',
    color: '#777',
    fontSize: 13,
  },
  tableHead3: {
    width: '20%',
    color: '#777',
    fontSize: 13,
    textAlign: 'right',
  },
  tables: {
    width: '100%',
  }
});
