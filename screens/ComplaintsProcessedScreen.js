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
      page: 1,
    };
    this.countsUser = [];
    this.data = [];
    this.users = [];
    this.pages = [];
  }

  componentDidMount() {
    this.getApi(1);
  }

  getApi(page) {
    AsyncStorage.getItem('token').then((value) => {
      if (value !== '') {
        fetch(`https://api2.digitalagent.kz/api/admin/reviews?status=inProcess&page=1`,
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
            this.data = [];
            this.users = [];
            this.countsUser = [];
            result.reviews.forEach((item) => {
              if (this.users.indexOf(item.Operator._id) === -1) {
                this.users.push(item.Operator._id);
              }
            });
            this.data.reviews = result.reviews.map((item) => {
              item.User.phone.mobile = String(item.User.phone.mobile).replace(/\(/g, '').replace(/\)/g, '').replace(/\s/g, '').replace(/\+/g, '').replace(/\-/g, '');
              return item;
            });
            let pg = 0;
            if (result.total > result.pageSize) {
              pg = Math.round(result.total / result.pageSize);
            } else {
              pg = 1;
            }
            this.pages = [];
            for (let i = 0; i < pg; i += 1) {
              this.pages.push(i);
            }
            this.setState({statusLoad: true});
          },
          (error) => {}
        );
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  setPage(index) {
    if (index !== this.state.page) {
      this.getApi(index);
      this.setState({page: index});
    }
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
                  if (item.Operator._id === user && item.Operator.name && this.countsUser.indexOf(item.Operator._id) === -1) {
                    this.countsUser.push(item.Operator._id);
                    return (
                      <View>
                        <Text style={[styles.label, {marginTop: 0}]}>Сотрудник</Text>
                        <View style={[styles.value, {flexDirection: 'row'}]}>
                          <View style={styles.tab1}>
                            <Text style={styles.tab1value}>{String(item.Operator.name).trim().slice(0, 1)}</Text>
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
                            <Text style={styles.phone} onPress={() => this.props.navigation.navigate('AbonentComplaintProcessedScreen', {item: item})}>{`${String(item.User.phone.mobile).slice(0, 1)} ${String(item.User.phone.mobile).slice(1, String(item.User.phone.mobile).length)}`}</Text>
                            <View style={styles.rates}>
                              <Image style={styles.star} source={item.rate >= 1 ? item.rate === 1 || item.rate > 1.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 2 ? item.rate === 2 || item.rate > 2.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 3 ? item.rate === 3 || item.rate > 3.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 4 ? item.rate === 4 || item.rate > 4.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                              <Image style={styles.star} source={item.rate >= 5 ? item.rate === 5 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                            </View>
                            <View style={styles.time}>
                              {this.props.type != 1 &&
                                <View style={styles.tab}>
                                  <Text style={styles.tabText} onPress={() => this.props.navigation.navigate('AbonentComplaintProcessedScreen', {item: item})}>{String(item.Operator.name).trim().slice(0, 1)}</Text>
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
            <View style={styles.pagination}>
              {this.pages.map((i, index) =>
                <TouchableOpacity key={index} style={styles.paginationTab} onPress={() => this.setPage(index + 1)}>
                  <Text style={[styles.paginationText, {backgroundColor: this.state.page === (index + 1) ? '#AAA' : '#EEE'}]}>{index + 1}</Text>
                </TouchableOpacity>
              )}
            </View>
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
  pagination: {
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  paginationTab: {
    width: '20%',
    padding: 5,
  },
  paginationText: {
    width: '100%',
    backgroundColor: '#EEE',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDD',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
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
    borderRadius: 24,
    width: 24,
    height: 24,
    marginRight: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 3,
    marginTop: 6,
  },
  tab1value: {
    fontSize: 10,
  },
  tableHead: {
    flexDirection: 'row',
    paddingVertical: 10,
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
    width: 17,
    height: 17,
    marginRight: 2,
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
    paddingTop: 3,
    marginTop: 3,
  },
  tabText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 10,
  }
});
