import * as React from 'react';
import { StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
import { Icon } from 'native-base';

import BarChartExample from "../components/BarChartExample";
import RatesDetailsScreen from "../components/RatesDetailsScreen";
import Copy from "../components/Copy";

class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
      activeInterval: 1,
    };
    this.getDayCount = 32 - new Date(2020, 1, 32).getDate();
    this.dayCounts = [];
    for (let i = 1; i <= this.getDayCount; i++) {
      this.dayCounts.push(i < 10 ? `0${i}` : i);
    }
    this.chart = {
      week: {
        values: this.getRandom(7),
        keys: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      },
      month: {
        values: this.getRandom(this.getDayCount),
        keys: this.dayCounts,
      },
      year: {
        values: this.getRandom(12),
        keys: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      },
    };
  }

  getRandom(count) {
    let random = [];
    for (let i = 0; i < count; i++) {
      let rand = Math.random() * Math.floor(5);
          rand = rand.toFixed(1);
      random.push(Number(rand));
    }
    return random;
  }

  setActive(index) {
    this.setState({activeInterval: index});
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader navigation={this.props.navigation} title="Рейтинг" />
        <ScrollView>
          <View style={styles.containerScreen}>
            <Text style={styles.topTitle}>Рейтинг услугодателя</Text>
            <Text style={styles.topTitleText}>
              Отображение статистики услугодателя, в разрезе недели, месяца по сравнению с другими услугодателями и личный рейтинг.
            </Text>
            <View style={styles.ratesCont}>
              <View style={styles.rateBlock}>
                <Text style={styles.rateBlockTitleL}>Текущий рейтинг</Text>
              </View>
              <View style={styles.rateBlockR}>
                <Text style={styles.rateBlockTitleR}>Оценки</Text>
              </View>
            </View>
            <View style={styles.ratesContBlock}>
              <View style={styles.rateBlock}>
                <Text style={styles.rate}>{this.state.company.rate}</Text>
                <View style={styles.ratesBlock}>
                  <View style={styles.rates}>
                    <Image style={styles.star} source={this.state.company.rate >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                    <Image style={styles.star} source={this.state.company.rate >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                    <Image style={styles.star} source={this.state.company.rate >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                    <Image style={styles.star} source={this.state.company.rate >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                    <Image style={styles.star} source={this.state.company.rate >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
                  </View>
                </View>
                <View style={styles.rateCounts}>
                  <Icon name="people" style={styles.rateIcon} />
                  <Text style={styles.rateCountsText}>{this.state.counts} оценили</Text>
                </View>
              </View>
              <View style={styles.rateBlockR}>
                {this.state.rates.map((item, index) =>
                  <RatesDetailsScreen key={index} rate={item} counts={this.state.counts} />
                )}
              </View>
            </View>
            <View style={styles.rateBlockTitleSelect}>
              <Text style={[styles.rateBlockTitle, {width: '30%'}]}>Рейтинг за</Text>
              <View style={styles.rateBlockTitleTabs}>
                <Text onPress={() => this.setActive(1)} style={[styles.rateBlockTitleTab, this.state.activeInterval == 1 ? styles.active : null]}>Неделю</Text>
                <Text onPress={() => this.setActive(2)} style={[styles.rateBlockTitleTab, this.state.activeInterval == 2 ? styles.active : null]}>Месяц</Text>
                <Text onPress={() => this.setActive(3)} style={[styles.rateBlockTitleTab, this.state.activeInterval == 3 ? styles.active : null]}>Год</Text>
              </View>
            </View>

            {this.state.activeInterval == 1 &&
              <BarChartExample data={this.chart.week.values} keys={this.chart.week.keys} />
            }
            {this.state.activeInterval == 2 &&
              <BarChartExample data={this.chart.month.values} keys={this.chart.month.keys} />
            }
            {this.state.activeInterval == 3 &&
              <BarChartExample data={this.chart.year.values} keys={this.chart.year.keys} />
            }

            <Text style={styles.rateBlockTitle}>Рейтинг по категории</Text>
            <View style={styles.tableHead}>
              <Text style={styles.tableHead1}>N</Text>
              <Text style={styles.tableHead2}>Услугодатель</Text>
              <Text style={styles.tableHead3}>Рейтинг</Text>
            </View>
            {this.state.items.map((item, index) =>
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableRow1}>{index + 1}</Text>
                <Text style={styles.tableRow2}>{item.name}</Text>
                <View style={styles.tableRow3}>
                  <Image style={styles.starRow} source={require('../assets/images/star.png')} />
                  <Text style={styles.tableRow2Text}>{item.rate}</Text>
                </View>
              </View>
            )}
            <Copy />
          </View>
        </ScrollView>
      </View>
    );
  };
}

export default DetailsScreen;

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
    width: '55%'
  },
  rateBlockR: {
    width: '45%'
  },
  rateBlockTitleL: {
    width: '100%',
    fontSize: 13,
    textAlign: 'left',
    color: '#555',
    fontWeight: 'bold',
  },
  rateBlockTitleR: {
    width: '100%',
    fontSize: 13,
    textAlign: 'left',
    color: '#555',
    fontWeight: 'bold',
  },
  rateBlockTitle: {
    width: '100%',
    fontSize: 13,
    textAlign: 'left',
    color: '#555',
    fontWeight: 'bold',
    marginTop: 30,
  },
  rateBlockTitleSelect: {
    flexDirection: 'row',
  },
  rateBlockTitleTabs: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'flex-end',
  },
  rateBlockTitleTab: {
    fontSize: 13,
    marginTop: 25,
    paddingLeft: 15,
    color: '#999',
    paddingTop: 5,
    paddingBottom: 5,
  },
  active: {
    color: '#FFC53D',
  },
  rate: {
    width: '100%',
    fontSize: 43,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    paddingRight: 20,
    paddingTop: 0,
  },
  ratesBlock: {
    paddingRight: 20,
    paddingTop: 15,
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
    width: '100%',
    textAlign: 'left',
    paddingRight: 20,
    paddingTop: 15,
    flexDirection: 'row',
  },
  rateIcon: {
    fontSize: 22,
    color: '#777',
    paddingRight: 5,
  },
  rateCountsText: {
    fontSize: 12,
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
    width: '15%',
    color: '#777',
    fontSize: 13,
  },
  tableHead2: {
    width: '60%',
    color: '#777',
    fontSize: 13,
  },
  tableHead3: {
    width: '25%',
    color: '#777',
    fontSize: 13,
    textAlign: 'right',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    borderStyle: 'solid',
    paddingTop: 10,
    paddingBottom: 10,
  },
  tableRow1: {
    width: '15%',
    fontSize: 12,
  },
  tableRow2: {
    width: '60%',
    fontSize: 12,
  },
  tableRow3: {
    width: '25%',
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
