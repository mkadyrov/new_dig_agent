import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';

import RateHomeAbonent from "./RateHomeAbonent";

class RateHomeBlock extends React.Component {

   constructor(props) {
     super(props);
     this.state = {};
   }

   render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            {this.props.type == 2 &&
              <Image style={{ width: 30, height: 25, }} source={require('../assets/images/2.png')} />
            }
            {this.props.type == 3 &&
              <Image style={{ width: 30, height: 25, }} source={require('../assets/images/3.png')} />
            }
            <Text style={styles.titleText}>{this.props.title}</Text>
          </View>
          <Text style={styles.link} onPress={() => this.props.navigation.navigate(this.props.link)}>Посмотреть все</Text>
        </View>
        <View style={styles.tableHead}>
          <Text style={styles.tableHead1}>Абонент</Text>
          <Text style={styles.tableHead2}>Рейтинг</Text>
          <Text style={styles.tableHead3}>Время</Text>
        </View>
        <View style={styles.tables}>
          {this.props.data.map((item, index) => {
            if (item.User.phone && item.ContactPerson.name) {
              return (<RateHomeAbonent key={index} navigation={this.props.navigation} data={item} link={this.props.sublink} type={this.props.type} />);
            }
          })}
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
    paddingTop: 5,
  },
  tableHead: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'solid',
    marginTop: 15,
  },
  tableHead1: {
    width: '35%',
    color: '#777',
    fontSize: 13,
    textAlign: 'left',
  },
  tableHead2: {
    width: '40%',
    color: '#777',
    fontSize: 13,
  },
  tableHead3: {
    width: '25%',
    color: '#777',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 15,
  },
  tables: {
    width: '100%',
  }
});
