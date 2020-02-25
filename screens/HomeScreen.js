import * as React from 'react';
import {StyleSheet, Button, View, Text, Image, ScrollView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
//import Text from "react-native-web/src/exports/Text";
import RateHomeBlock from "../components/RateHomeBlock";
import Copy from "../components/Copy";

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: { name: 'Арсен Арсен' },
      company: { name: 'Отделение №3, ЦОН Бостандыкского района, г.Алматы', rate: 3.5, },
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <CustomHeader navigation={this.props.navigation}/>
          <ScrollView>
            <View style={styles.containerScreen}>
              <Text style={styles.topTitle}>Добро пожаловать</Text>
              <Text style={styles.topTitle}>{this.state.user.name}</Text>
              <View style={styles.companyRate}>
                <Text style={styles.nameCompany}>{this.state.company.name}</Text>
                <View style={styles.companyRateCont}>
                  <View style={styles.companyRateBlock}>
                    <Image style={styles.companyImg} source={require('../assets/images/star.png')} />
                    <Text style={styles.companyRateText}>{this.state.company.rate}</Text>
                  </View>
                  <View style={styles.companyRateBlock}>
                    <Text style={styles.companyRateLink} onPress={() => this.props.navigation.navigate('Details')}>Подробнее</Text>
                  </View>
                </View>
              </View>
              <View style={styles.complaintCont}>
                <View style={styles.complaintBlockL}>
                  <View style={styles.complaintBlock}>
                    <Text style={styles.complaintText}>Новые</Text>
                    <View style={styles.complaintCounts}>
                      <Image style={{ width: 30, height: 25, }} source={require('../assets/images/1.png')} />
                      <Text style={styles.complaintCount}>12</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.complaintBlockR}>
                  <View style={styles.complaintBlock}>
                    <Text style={styles.complaintText}>В процессе</Text>
                    <View style={styles.complaintCounts}>
                      <Image style={{ width: 30, height: 25, }} source={require('../assets/images/2.png')} />
                      <Text style={styles.complaintCount}>5</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.complaintCont}>
                <View style={styles.complaintBlockL}>
                  <View style={styles.complaintBlock}>
                    <Text style={styles.complaintText}>Обработано</Text>
                    <View style={styles.complaintCounts}>
                      <Image style={{ width: 30, height: 25, }} source={require('../assets/images/3.png')} />
                      <Text style={styles.complaintCount}>58</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.complaintBlockR}>
                  <View style={styles.complaintBlock}>
                    <Text style={styles.complaintText}>Провалено</Text>
                    <View style={styles.complaintCounts}>
                      <Image style={{ width: 30, height: 25, }} source={require('../assets/images/4.png')} />
                      <Text style={styles.complaintCount}>16</Text>
                    </View>
                  </View>
                </View>
              </View>
              <RateHomeBlock navigation={this.props.navigation} title="Новые жалобы" type="1" />
              <RateHomeBlock navigation={this.props.navigation} title="В процессе" type="2" />
              <RateHomeBlock navigation={this.props.navigation} title="Обработанные" type="3" />
              <RateHomeBlock navigation={this.props.navigation} title="Проверенные" type="4" />
              <Copy />
            </View>
          </ScrollView>
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
    fontSize: 23,
    paddingBottom: 10,
    textAlign: 'center',
  },
  companyRate: {
    backgroundColor: '#FFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#DDD',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
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
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyRateLink: {
    width: '100%',
    fontSize: 11,
    textAlign: 'right',
    color: '#FAAD14',
    textTransform: 'uppercase',
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
