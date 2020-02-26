import * as React from 'react';
import { StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import RateHomeAbonent from "../components/RateHomeAbonent";
import Copy from "../components/Copy";

class ComplaintsProcessScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      abonents: [
        { phone: '7702 430 2021', rate: 1.5, time: '01:34', tab: 'A' },
        { phone: '7702 430 2021', rate: 2.5, time: '01:34', tab: 'A' },
        { phone: '7702 430 2021', rate: 3.5, time: '01:34', tab: 'A' },
        { phone: '7702 430 2021', rate: 4.4, time: '01:34', tab: 'A' },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} title="В процессе" />
        <ScrollView>
          <View style={styles.containerScreen}>
            <Text style={styles.topTitle}>В процессе</Text>
            <Text style={styles.topTitleText}>Нет данных</Text>
            <View style={styles.tableHead}>
              <Text style={styles.tableHead1}>Абонент</Text>
              <Text style={styles.tableHead2}>Рейтинг</Text>
              <Text style={styles.tableHead3}></Text>
            </View>
            <View style={styles.tables}>
              {this.state.abonents.map((item, index) =>
                <RateHomeAbonent key={index} navigation={this.props.navigation} abonent={item} type="2" />
              )}
            </View>
            <Copy />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ComplaintsProcessScreen;

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
    borderBottomWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'solid',
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
