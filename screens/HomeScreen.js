import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
//import Text from "react-native-web/src/exports/Text";
import RateHomeBlock from "../components/RateHomeBlock";
import Copy from "../components/Copy";
var base64 = require('base-64');

import { Icon } from 'native-base';
import moment from "moment";

class HomeScreen extends React.Component {

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
        fetch("https://api2.digitalagent.kz/api/admin",
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
            this.data.reviews.inProcessReviews = this.data.reviews.inProcessReviews.map(item=> {
              item.timer = Math.floor(parseFloat(moment(item.createdAt).add(5,"minutes").format("x"))) - Math.floor(parseFloat(moment().format("x")));
              return item;
            });
            this.setState({statusLoad: true});
            console.log(result);
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
          <CustomHeader navigation={this.props.navigation} title="" />
          {this.state.statusLoad &&
            <ScrollView>
              <View style={styles.containerScreen}>
                <Text style={[styles.topTitle, {paddingBottom: 0}]}>Добро пожаловать</Text>
                <Text style={[styles.topTitle, {fontSize: 19}]}>{String(this.data.userName).trim()}!</Text>
                <View style={styles.companyRate}>
                  <Text style={styles.nameCompany}>{this.data.serviceProvider.nameRu}</Text>
                  <View style={styles.companyRateCont}>
                    <View style={styles.companyRateBlock}>
                      <Image style={styles.companyImg} source={require('../assets/images/star.png')} />
                      <Text style={styles.companyRateText}>{this.data.serviceProvider.rate.toFixed(1)}</Text>
                    </View>
                    <View style={styles.companyRateBlock}>
                      <Text style={styles.companyRateLink} onPress={() => this.props.navigation.navigate('Details')}>Подробнее</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.complaintCont}>
                  <View style={styles.complaintBlockL}>
                    <View style={styles.complaintBlock}>
                      <Text style={styles.complaintText}>Активные</Text>
                      <View style={styles.complaintCounts}>
                        <Image style={{ width: 30, height: 25, }} source={require('../assets/images/2.png')} />
                        <Text style={styles.complaintCount}>{this.data.total.inProcess}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.complaintBlockR}>
                    <View style={styles.complaintBlock}>
                      <Text style={styles.complaintText}>Обработано</Text>
                      <View style={styles.complaintCounts}>
                        <Image style={{ width: 30, height: 25, }} source={require('../assets/images/3.png')} />
                        <Text style={styles.complaintCount}>{this.data.total.resolved}</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <RateHomeBlock navigation={this.props.navigation} data={this.data.reviews.inProcessReviews} title="Активные" type="2" link="ComplaintsProcessScreen" sublink="AbonentComplaintProcessScreen" />
                <RateHomeBlock navigation={this.props.navigation} data={this.data.reviews.resolvedReviews} title="Завершенные" type="3" link="ComplaintsProcessedScreen" sublink="AbonentComplaintProcessedScreen" />
                <Copy />
              </View>
            </ScrollView>
          }
        </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    height: '100%',
  },
  containerScreen: {
    padding: 20,
  },
  topTitle: {
    fontSize: 20,
    paddingBottom: 10,
    textAlign: 'left',
  },
  companyRate: {
    paddingTop: 0,
    marginTop: 15,
  },
  nameCompany: {
    fontSize: 13,
    textAlign: 'left',
    color: '#777',
  },
  companyRateCont: {
    flexDirection: 'row',
  },
  companyImg: {
    marginRight: 10,
  },
  companyRateText: {
    fontSize: 17,
  },
  companyRateBlock: {
    paddingTop: 15,
    paddingBottom: 10,
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyRateLink: {
    width: '100%',
    fontSize: 11,
    textAlign: 'left',
    color: '#FAAD14',
  },
  complaintCont: {
    flexDirection: 'row',
    marginTop: 20,
  },
  complaintBlock: {
    width: '100%',
    backgroundColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 3,
  },
  complaintBlockL: {
    width: '50%',
    paddingRight: 10,
  },
  complaintBlockR: {
    width: '50%',
    paddingLeft: 10,
  },
  complaintText: {
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
  },
  complaintCounts: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
  },
  complaintCount: {
    fontSize: 25,
    paddingLeft: 10,
    color: '#555',
    fontWeight: 'bold',
  }
});
