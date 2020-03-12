import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import RateHomeAbonent from "../components/RateHomeAbonent";
import Copy from "../components/Copy";

class ComplaintsProcessedScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      statusLoad: false,
      countsUser: [],
    };
    this.data = [];
    this.users = [];
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value !== '') {
        fetch("https://api2.digitalagent.kz/api/admin/reviews?status=inProcess&page=1",
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
            result.reviews.forEach((item) => {
              if (this.users.indexOf(item.Operator._id) === -1) {
                this.users.push(item.Operator._id);
              }
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
        <CustomHeader navigation={this.props.navigation} title="Завершенные" />
        {this.state.statusLoad &&
        <ScrollView>
          <View style={styles.containerScreen}>
            <Text style={styles.topTitle}>
              <Image style={{ width: 25, height: 20, }} source={require('../assets/images/3.png')} /> Завершенные
            </Text>
            <Text style={styles.topTitleText}>Список обработанных жалоб от абонента, с разделением на сотрудников, которые их обработали.</Text>
            {this.users.map((user, index) =>
              <View key={index} style={styles.row}>
                {this.data.reviews.map((item, index) => {
                  if (item.Operator._id === user && item.Operator.name && this.state.countsUser.indexOf(item.Operator._id) === -1) {
                    this.state.countsUser.push(item.Operator._id);
                    return (
                      <View>
                        <Text style={[styles.label, {marginTop: 0}]}>Сотрудник</Text>
                        <View style={[styles.value, {flexDirection: 'row'}]}>
                          <View style={styles.tab1}>
                            <Text style={styles.value}>{item.Operator.name.slice(0, 1)}</Text>
                          </View>
                          <Text style={[styles.value, {marginTop: 5}]}>{item.Operator.name}</Text>
                        </View>
                      </View>
                    );
                  }
                })}
                <View style={styles.tableHead}>
                  <Text style={styles.tableHead1}>Абонент</Text>
                  <Text style={styles.tableHead2}>Рейтинг</Text>
                </View>
                <View style={styles.tables}>
                  {this.data.reviews.map((item, index) => {
                    if (item.Operator._id === user && item.Operator.name) {
                      return (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AbonentComplaintProcessedScreen', {item: item})}>
                          <View key={index} style={styles.abonentCont}>
                            <Text style={styles.phone} onPress={() => this.props.navigation.navigate('AbonentComplaintProcessedScreen', {item: item})}>{item.User.phone.work}</Text>
                            <View style={styles.rates}>
                              <Image style={styles.star} source={item.rate >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                            </View>
                            <View style={styles.time}>
                              {this.props.type != 1 &&
                                <View style={styles.tab}>
                                  <Text style={styles.tabText} onPress={() => this.props.navigation.navigate('AbonentComplaintProcessedScreen', {item: item})}>{item.Operator.name.slice(0, 1)}</Text>
                                </View>
                              }
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              </View>
            )}
            <View>
            <Copy />
            </View>
          </View>
        </ScrollView>
        }
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
  tab1: {
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
  },

  abonentCont: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDD',
    marginTop: 15,
    flexDirection: 'row',
    padding: 10,
  },
  phone: {
    width: '45%',
    height: 30,
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  rates: {
    width: '40%',
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  star: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginTop: -1,
  },
  time: {
    width: '15%',
    textAlign: 'right',
    alignItems: 'flex-end',
  },
  tabTime: {
    paddingTop: 3,
    fontSize: 12,
  },
  tab: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#E8E8E8',
    paddingTop: 3,
  },
  tabText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
  }
});
