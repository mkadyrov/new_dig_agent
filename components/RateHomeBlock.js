import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';

import RateHomeAbonent from "./RateHomeAbonent";

class RateHomeBlock extends React.Component {

   constructor(props) {
     super(props);
     this.state = {};
     this.abonents = [
      { phone: '7702 430 2021', rate: 1.5, time: '01:34', tab: 'A' },
      { phone: '7702 430 2021', rate: 2.5, time: '01:34', tab: 'Д' },
      { phone: '7702 430 2021', rate: 3.5, time: '01:34', tab: 'Р' },
      { phone: '7702 430 2021', rate: 4.5, time: '01:34', tab: 'A' },
    ];
   }

   render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            {this.props.type == 1 &&
              <Image style={{ width: 25, height: 20, }} source={require('../assets/images/1.png')} />
            }
            {this.props.type == 2 &&
              <Image style={{ width: 30, height: 25, }} source={require('../assets/images/2.png')} />
            }
            {this.props.type == 3 &&
              <Image style={{ width: 30, height: 25, }} source={require('../assets/images/3.png')} />
            }
            {this.props.type == 4 &&
              <Image style={{ width: 30, height: 25, }} source={require('../assets/images/4.png')} />
            }
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
          <Text style={styles.link} onPress={() => this.props.navigation.navigate(this.props.link)}>Посмотреть все</Text>
        </View>
        <View style={styles.tableHead}>
          <Text style={styles.tableHead1}>Абонент</Text>
          <Text style={styles.tableHead2}>Рейтинг</Text>
          {this.props.type == 1 &&
            <Text style={styles.tableHead3}>Время</Text>
          }
        </View>
        <View style={styles.tables}>
          {this.abonents.map((item, index) =>
            <RateHomeAbonent key={index} navigation={this.props.navigation} abonent={item} type={this.props.type} />
          )}
        </View>
      </View>
    );
  };
};

export default RateHomeBlock;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    paddingLeft: 15,
    fontSize: 14,
  },
  link: {
    width: '50%',
    fontSize: 11,
    textAlign: 'right',
    color: '#FAAD14',
    textTransform: 'uppercase',
    paddingTop: 5,
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
