import * as React from 'react';
import {StyleSheet, Button, View, Text, Image, ScrollView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import Copy from "../components/Copy";

class HistoryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      complaints: [
        {phone: '7 774 323 2323', type: 1, date: '28.03.2020', time: '14:35'},
        {phone: '7 774 323 2323', type: 2, date: '28.03.2020', time: '14:35'},
        {phone: '7 774 323 2323', type: 3, date: '28.03.2020', time: '14:35'},
        {phone: '7 774 323 2323', type: 4, date: '28.03.2020', time: '14:35'},
        {phone: '7 774 323 2323', type: 5, date: '28.03.2020', time: '14:35'},
        {phone: '7 774 323 2323', type: 6, date: '28.03.2020', time: '14:35'},
      ],
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <CustomHeader navigation={this.props.navigation} title="История" />
          <ScrollView>
            <View style={styles.containerScreen}>
              {this.state.complaints.map((item, index) =>
                <View key={index} style={styles.row}>
                  <View style={styles.left}>
                    {item.type == 1 &&
                      <Image style={styles.statusImg} source={require('../assets/images/1.png')} />
                    }
                    {item.type == 2 &&
                      <Image style={styles.statusImg} source={require('../assets/images/2.png')} />
                    }
                    {item.type == 3 &&
                      <Image style={styles.statusImg} source={require('../assets/images/3.png')} />
                    }
                    {item.type == 4 &&
                      <Image style={styles.statusImg} source={require('../assets/images/4.png')} />
                    }
                    {item.type == 5 &&
                      <Image style={styles.statusImg} source={require('../assets/images/5.png')} />
                    }
                    {item.type == 6 &&
                      <Image style={styles.statusImg} source={require('../assets/images/6.png')} />
                    }
                    {(index + 1) != this.state.complaints.length &&
                      <View style={styles.statusLine}></View>
                    }
                  </View>
                  <View style={styles.right}>
                    {item.type == 1 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>Новая жалоба от</Text>
                        <Text style={styles.boldText}>{item.phone}</Text>
                        <Text style={styles.dateText}>{item.date}, {item.time}</Text>
                      </View>
                    }
                    {item.type == 2 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Жалоба от <Text style={styles.boldText}>{item.phone}</Text> получила статус
                        </Text>
                        <Text style={styles.boldText}>В процессе</Text>
                        <Text style={styles.dateText}>{item.date}, {item.time}</Text>
                      </View>
                    }
                    {item.type == 3 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Жалоба от <Text style={styles.boldText}>{item.phone}</Text> получила статус
                        </Text>
                        <Text style={styles.boldText}>Обработанные</Text>
                        <Text style={styles.dateText}>{item.date}, {item.time}</Text>
                      </View>
                    }
                    {item.type == 4 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Жалоба от <Text style={styles.boldText}>{item.phone}</Text> получила статус
                        </Text>
                        <Text style={styles.boldText}>Проваленные</Text>
                        <Text style={styles.dateText}>{item.date}, {item.time}</Text>
                      </View>
                    }
                    {item.type == 5 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Абонент <Text style={styles.boldText}>{item.phone}</Text> потвердил что жалоба
                        </Text>
                        <Text style={styles.normalText}>решена</Text>
                        <Text style={styles.dateText}>{item.date}, {item.time}</Text>
                      </View>
                    }
                    {item.type == 6 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Абонент <Text style={styles.boldText}>{item.phone}</Text> потвердил что жалоба
                        </Text>
                        <Text style={styles.normalText}>не решена</Text>
                        <Text style={styles.dateText}>{item.date}, {item.time}</Text>
                      </View>
                    }
                  </View>
                </View>
              )}
              <Copy />
            </View>
          </ScrollView>
        </View>
    );
  }
}

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    height: '100%',
  },
  containerScreen: {
    padding: 20,
  },
  row: {
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
  },
  left: {
    width: 30,
    backgroundColor: 'transparent',
    paddingTop: 5,
  },
  statusImg: {
    width: 30,
    height: 25,
  },
  statusLine: {
    width: 15,
    height: 45,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDD',
    marginTop: 10,
  },
  right: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
  },
  normalText: {
    fontSize: 13,
  },
  boldText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#777',
    paddingTop: 5,
  }
});
