import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
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
      statusLoad: false,
    };
    this.data = {};
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value !== '') {
        fetch("http://188.166.223.192:6000/api/admin/reviews?status=inProcess&page=1",
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
        <CustomHeader navigation={this.props.navigation} title="В процессе" />
        {this.state.statusLoad &&
          <ScrollView>
            <View style={styles.containerScreen}>
              <Text style={styles.topTitle}>
                <Image style={{ width: 25, height: 20, }} source={require('../assets/images/2.png')} /> В процессе
              </Text>
              <Text style={styles.topTitleText}>Нет данных</Text>
              <View style={styles.tableHead}>
                <Text style={styles.tableHead1}>Абонент</Text>
                <Text style={styles.tableHead2}>Рейтинг</Text>
                <Text style={styles.tableHead3}></Text>
              </View>
              <View style={styles.tables}>
                {this.data.reviews.map((item, index) =>
                  <View style={styles.abonentCont}>
                    <Text style={styles.phone} onPress={() => this.props.navigation.navigate('AbonentComplaintProcessScreen')}>7777777777</Text>
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
                          <Text style={styles.tabText} onPress={() => this.props.navigation.navigate('AbonentComplaintProcessScreen')}>А</Text>
                        </View>
                      }
                    </View>
                  </View>
                )}
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
