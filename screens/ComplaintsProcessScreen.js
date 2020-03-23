import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import RateHomeAbonent from "../components/RateHomeAbonent";
import Copy from "../components/Copy";

class ComplaintsProcessScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      statusLoad: false,
    };
    this.data = {};
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
            this.data.reviews = this.data.reviews.map((item) => {
              item.User.phone.mobile = String(item.User.phone.mobile).replace(/\(/g, '').replace(/\)/g, '').replace(/\s/g, '').replace(/\+/g, '').replace(/\-/g, '');
              return item;
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

  getM(item) {
    return false;
  }

  async nav(item) {
    await AsyncStorage.setItem('idC', item._id);

    this.props.navigation.navigate('AbonentComplaintProcessScreen', {item: item._id});
    await this.props.navigation.setOptions({item: item._id});
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} title="Активные" />
        {this.state.statusLoad &&
          <ScrollView>
            <View style={styles.containerScreen}>
              <Text style={styles.topTitle}>
                <Image style={{ width: 25, height: 20, }} source={require('../assets/images/2.png')} /> Активные
              </Text>
              <View style={styles.tableHead}>
                <Text style={styles.tableHead1}>Абонент</Text>
                <Text style={styles.tableHead2}>Рейтинг</Text>
                <Text style={styles.tableHead3}>Время</Text>
              </View>
              <View style={styles.tables}>
                {this.data.reviews.map((item, index) => {
                  if (item.Operator.name) {
                    return (
                      <TouchableOpacity onPress={() => this.nav(item)}>
                      <View key={index} style={styles.abonentCont}>
                        <Text style={styles.phone}>{`${item.User.phone.mobile.slice(0, 1)} ${item.User.phone.mobile.slice(1, 4)} ${item.User.phone.mobile.slice(4, 7)} ${item.User.phone.mobile.slice(7, 9)} ${item.User.phone.mobile.slice(9, item.User.phone.mobile.length)}`}</Text>
                        <View style={styles.rates}>
                          <Image style={styles.star} source={item.rate >= 1 ? item.rate === 1 || item.rate > 1.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                          <Image style={styles.star} source={item.rate >= 2 ? item.rate === 2 || item.rate > 2.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                          <Image style={styles.star} source={item.rate >= 3 ? item.rate === 3 || item.rate > 3.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                          <Image style={styles.star} source={item.rate >= 4 ? item.rate === 4 || item.rate > 4.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                          <Image style={styles.star} source={item.rate >= 5 ? item.rate === 5 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                        </View>
                        <View style={styles.time}>
                          {this.getM(this.props.data) &&
                            <View style={styles.tab}>
                              <Text style={styles.tabText}>
                                {item.Operator.name.slice(0, 1)}
                              </Text>
                            </View>
                          }
                          {!this.getM(this.props.data) &&
                            <View style={styles.tabTimeout}>
                              <Image source={require('../assets/images/crown.png')} style={{width: 15, height: 10, marginTop: -5}}/>
                            </View>
                          }
                        </View>
                      </View>
                      </TouchableOpacity>
                    );
                  }
                })}
              </View>
              <Copy />
            </View>
          </ScrollView>
        }
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
    textAlign: 'left',
  },
  topTitleText: {
    fontSize: 12,
    textAlign: 'left',
    color: '#777',
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
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: '#E8E8E8',
    paddingTop: 2.5,
    marginTop: 3,
  },
  tabText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 10,
    position: 'relative',
    right: 1.5,
  },
  tabTimeout: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: '#d91414',
    paddingTop: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
});
