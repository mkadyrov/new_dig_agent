import * as React from 'react';
import { StyleSheet, Button, View, Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import RatesDetailsScreen from "../components/RateHomeAbonent";
import Copy from "../components/Copy";

export default function DetailsScreen({ navigation }) {

  const state = {
    company: { name: 'Отделение №3, ЦОН Бостандыкского района, г.Алматы', rate: 3.5, },
    rates: [
      {rate: 5, counts: 34},
      {rate: 4, counts: 1},
      {rate: 3, counts: 100},
      {rate: 2, counts: 2},
      {rate: 1, counts: 50},
    ],
    counts: 241,
    items: [
      { name: 'Отделение №8 Цон Сарыаркинского района', rate: 3.5, },
      { name: 'Отделение №8 Цон Сарыаркинского района', rate: 3.5, },
      { name: 'Отделение №8 Цон Сарыаркинского района', rate: 3.5, },
    ],
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation}/>
      <View style={styles.containerScreen}>
        <Text style={styles.topTitle}>Рейтинг услугодателя</Text>
        <Text style={styles.topTitleText}>
          Отображение статистики услугодателя, в разрезе недели, месяца по сравнению с другими услугодателями и личный рейтинг.
        </Text>
        <View style={styles.ratesCont}>
          <View style={styles.rateBlock}>
            <Text style={styles.rateBlockTitleL}>Текущий рейтинг</Text>
          </View>
          <View style={styles.rateBlock}>
            <Text style={styles.rateBlockTitleR}>Оценки</Text>
          </View>
        </View>
        <View style={styles.ratesContBlock}>
          <View style={styles.rateBlock}>
            <Text style={styles.rate}>{state.company.rate}</Text>
            <View style={styles.ratesBlock}>
              <View style={styles.rates}>
                <Image style={styles.star} source={state.company.rate >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                <Image style={styles.star} source={state.company.rate >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                <Image style={styles.star} source={state.company.rate >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                <Image style={styles.star} source={state.company.rate >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                <Image style={styles.star} source={state.company.rate >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
              </View>
            </View>
            <Text style={styles.rateCounts}>Оценили 241</Text>
          </View>
          <View style={styles.rateBlock}>
            {state.rates.map((item, index) =>
              <RatesDetailsScreen key={index} rate={item} counts={state.counts} />
            )}
          </View>
        </View>
        <View style={styles.tableHead}>
          <Text style={styles.tableHead1}>Услугодатель</Text>
          <Text style={styles.tableHead2}>Рейтинг</Text>
        </View>
        {state.items.map((item, index) =>
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableRow1}>{item.name}</Text>
            <View style={styles.tableRow2}>
              <Image style={styles.starRow} source={require('../assets/images/star.png')} />
              <Text style={styles.tableRow2Text}>{item.rate}</Text>
            </View>
          </View>
        )}
        <Copy />
      </View>
    </View>
  );
}

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
  ratesCont: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
  },
  ratesContBlock: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  rateBlock: {
    width: '50%'
  },
  rateBlockTitleL: {
    width: '100%',
    fontSize: 13,
    textAlign: 'left',
    color: '#555',
  },
  rateBlockTitleR: {
    width: '100%',
    fontSize: 13,
    textAlign: 'right',
    color: '#555',
  },
  rate: {
    width: '100%',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    paddingRight: 20,
    paddingTop: 10,
  },
  ratesBlock: {
    paddingRight: 20,
    paddingTop: 20,
  },
  rates: {
    flexDirection: 'row',
  },
  star: {
    width: 17,
    height: 17,
    marginRight: 5,
    marginTop: -1,
  },
  rateCounts: {
    fontSize: 12,
    width: '100%',
    textAlign: 'left',
    paddingRight: 20,
    paddingTop: 25,
    color: '#777',
  },
  tableHead: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'solid',
  },
  tableHead1: {
    width: '70%',
    color: '#777',
    fontSize: 13,
    textAlign: 'left',
  },
  tableHead2: {
    width: '30%',
    color: '#777',
    fontSize: 13,
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'solid',
    marginTop: 15,
    padding: 10,
  },
  tableRow1: {
    width: '70%',
    fontSize: 12,
  },
  tableRow2: {
    width: '30%',
    fontSize: 12,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  starRow: {
    width: 15,
    height: 15,
    marginRight: 10,
    marginTop: 3,
  },
  tableRow2Text: {
    fontSize: 12,
  }
});
