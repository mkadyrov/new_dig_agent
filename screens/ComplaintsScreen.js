import * as React from 'react';
import { StyleSheet, Button, View, Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import RateHomeAbonent from "../components/RateHomeAbonent";
import Copy from "../components/Copy";

class ComplaintsScreen extends React.Component {

  constructor({ route, navigation }) {
    super({ route, navigation });
    this.state = {
      abonents: [
        { phone: '7702 430 2021', rate: 1.5, time: '01:34', tab: 'A' },
        { phone: '7702 430 2021', rate: 2.5, time: '01:34', tab: 'A' },
        { phone: '7702 430 2021', rate: 3.5, time: '01:34', tab: 'A' },
        { phone: '7702 430 2021', rate: route.params.name, time: '01:34', tab: 'A' },
      ],
    };
    console.log(this.props.navigation);
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation}/>
        <View style={styles.containerScreen}>
          <Text style={styles.topTitle}>1</Text>
          <Text style={styles.topTitleText}>
            Список новых жалоб от абонента, с установленным рейтингом и количеством времени, за которое необходимо позвонить.
          </Text>
          <View style={styles.tableHead}>
            <Text style={styles.tableHead1}>Абонент</Text>
            <Text style={styles.tableHead2}>Рейтинг</Text>
            <Text style={styles.tableHead3}>Время</Text>
          </View>
          <View style={styles.tables}>
            {this.state.abonents.map((item, index) =>
              <RateHomeAbonent key={index} navigation={this.props.navigation} abonent={item} type="1" />
            )}
          </View>
          <Copy />
        </View>
      </View>
    );
  }
}

export default ComplaintsScreen;

const styles = StyleSheet.create({
  container: {

  },
  containerScreen: {
    padding: 20,
  },
  topTitle: {
    fontSize: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  topTitleText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#777',
    backgroundColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
  },
  tableHead: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'solid',
    backgroundColor: '#E8E8E8',
    marginTop: 15,
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
