import * as React from 'react';
import { AsyncStorage, StyleSheet, Button, View, Text, Image, ScrollView } from 'react-native';
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
      activeInterval: 1,
      statusLoad: false,
    };
    this.chart = {
      week: {
        values: [],
        keys: [],
      },
      month: {
        values: [],
        keys: [],
      },
      year: {
        values: [],
        keys: [],
      },
      months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      weeks: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    };
    this.data = {};
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((value) => {
      if (value !== '') {
        fetch("https://api2.digitalagent.kz/api/admin/rating",
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
            Object.keys(this.data.avgRatingsPerTimeInterval.monthlyRating).map((item) => {
              this.chart.month.keys.push(item);
              this.chart.month.values.push(Number(this.data.avgRatingsPerTimeInterval.monthlyRating[`${item}`].toFixed(1)));
            });
            Object.keys(this.data.avgRatingsPerTimeInterval.yearlyRating).map((item) => {
              this.chart.year.keys.push(this.chart.months[Number(item) - 1]);
              this.chart.year.values.push(Number(this.data.avgRatingsPerTimeInterval.yearlyRating[`${item}`].toFixed(1)));
            });
            Object.keys(this.data.avgRatingsPerTimeInterval.weeklyRating).map((item) => {
              this.chart.week.keys.push(this.chart.weeks[Number(item) - 1]);
              this.chart.week.values.push(Number(this.data.avgRatingsPerTimeInterval.weeklyRating[`${item}`].toFixed(1)));
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
        {this.state.statusLoad &&
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
                  <Text style={styles.rate}>{this.data.rate.toFixed(1)}</Text>
                  <View style={styles.ratesBlock}>
                    <View style={styles.rates}>
                      <Image style={styles.star} source={this.data.rate >= 1 ? this.data.rate === 1 || this.data.rate > 1.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                      <Image style={styles.star} source={this.data.rate >= 2 ? this.data.rate === 2 || this.data.rate > 2.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                      <Image style={styles.star} source={this.data.rate >= 3 ? this.data.rate === 3 || this.data.rate > 3.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                      <Image style={styles.star} source={this.data.rate >= 4 ? this.data.rate === 4 || this.data.rate > 4.9 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                      <Image style={styles.star} source={this.data.rate >= 5 ? this.data.rate === 5 ? require('../assets/images/stars.png') : require('../assets/images/stars2.png') : require('../assets/images/stars-gray.png')} />
                    </View>
                  </View>
                  <View style={styles.rateCounts}>
                    <Icon name="people" style={styles.rateIcon} />
                    <Text style={styles.rateCountsText}>{this.data.totalReviews} оценили</Text>
                  </View>
                </View>
                <View style={styles.rateBlockR}>
                  {Object.keys(this.data.ratesCountByGroup).map((item, index) =>
                    <RatesDetailsScreen key={index} name={item} val={this.data.ratesCountByGroup[`${item}`]} counts={this.data.totalReviews} />
                  )}
                </View>
              </View>
              <View style={styles.rateBlockTitleSelect}>
                <Text style={[styles.rateBlockTitle, {width: '30%'}]}>Рейтинг за:</Text>
                <View style={styles.rateBlockTitleTabs}>
                  {Object.keys(this.data.avgRatingsPerTimeInterval.weeklyRating).length > 0 &&
                    <Text onPress={() => this.setActive(1)} style={[styles.rateBlockTitleTab, this.state.activeInterval == 1 ? styles.active : null]}>Неделю</Text>
                  }
                  {Object.keys(this.data.avgRatingsPerTimeInterval.monthlyRating).length > 0 &&
                    <Text onPress={() => this.setActive(2)} style={[styles.rateBlockTitleTab, this.state.activeInterval == 2 ? styles.active : null]}>Месяц</Text>
                  }
                  {Object.keys(this.data.avgRatingsPerTimeInterval.yearlyRating).length > 0 &&
                    <Text onPress={() => this.setActive(3)} style={[styles.rateBlockTitleTab, this.state.activeInterval == 3 ? styles.active : null]}>Год</Text>
                  }
                </View>
              </View>

              {this.state.activeInterval == 1 && Object.keys(this.data.avgRatingsPerTimeInterval.weeklyRating).length > 0 &&
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
              {this.data.topServiceProviders.map((item, index) =>
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableRow1}>{index + 1}</Text>
                  <Text style={styles.tableRow2}>{item.nameRu}</Text>
                  <View style={styles.tableRow3}>
                    <Text style={styles.tableRow2Text}>{item.rate.toFixed(1)}</Text>
                  </View>
                </View>
              )}
              <Copy />
            </View>
          </ScrollView>
        }
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
    justifyContent: 'flex-start',
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
    paddingLeft: 10,
  },
  tableHead2: {
    width: '60%',
    color: '#777',
    fontSize: 13,
    textAlign: 'center',
  },
  tableHead3: {
    width: '25%',
    color: '#777',
    fontSize: 13,
    textAlign: 'right',
    paddingRight: 10,
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
    paddingLeft: 10,
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
    paddingRight: 10,
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
