import * as React from 'react';
import {StyleSheet, Button, View, Text, Image, ScrollView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import Copy from "../components/Copy";

class HistoryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.data = {
     "history": [
     {
     "_id": "5e5ce5c88c1ca30418e5c785",
     "reviewId": "5e5ce3908c1ca30418e5c76f",
     "type": 3,
     "createdAt": "2020-03-02T10:54:00.110Z",
     "updatedAt": "2020-03-02T10:54:00.110Z",
     "__v": 0,
     "User": {
     "_id": "5dfdc4cf752d0d1160fbdd29",
     "phone": {
     "mobile": [
     "87784442",
    "875454"
     ],
    "work": "2141245457",
     "inner": "123"
     },
     "name": "Test User 1",
     "email": "parasat_99_99@mail.ru"
     }
     },
     {
     "_id": "5e5ce5c88c1ca30418e5c786",
     "reviewId": "5e5ce3908c1ca30418e5c76f",
     "type": 2,
     "createdAt": "2020-03-02T10:54:00.110Z",
     "updatedAt": "2020-03-02T10:54:00.110Z",
     "__v": 0,
     "User": {
     "_id": "5dfdc4cf752d0d1160fbdd29",
     "phone": {
     "mobile": [
     "87784442",
    "875454"
     ],
    "work": "2141245457",
     "inner": "123"
     },
     "name": "Test User 1",
     "email": "parasat_99_99@mail.ru"
     }
     },
     {
     "_id": "5e5ce5b48c1ca30418e5c783",
     "reviewId": "5e5ce5b48c1ca30418e5c77e",
     "type": 1,
     "createdAt": "2020-03-02T10:53:40.123Z",
     "updatedAt": "2020-03-02T10:53:40.123Z",
     "__v": 0,
     "User": {
     "_id": "5dfdc4cf752d0d1160fbdd29",
     "phone": {
     "mobile": [
     "87784442",
    "875454"
     ],
    "work": "2141245457",
     "inner": "123"
     },
     "name": "Test User 1",
     "email": "parasat_99_99@mail.ru"
     }
     },
     {
     "_id": "5e5ce5758c1ca30418e5c777",
     "reviewId": "5e5ce3908c1ca30418e5c76f",
     "type": 1,
     "createdAt": "2020-03-02T10:52:37.391Z",
     "updatedAt": "2020-03-02T10:52:37.391Z",
     "__v": 0,
     "User": {
     "_id": "5dfdc4cf752d0d1160fbdd29",
     "phone": {
     "mobile": [
     "87784442",
    "875454"
     ],
     "work": "2141245457",
     "inner": "123"
     },
     "name": "Test User 1",
     "email": "parasat_99_99@mail.ru"
     }
     },
     {
     "_id": "5e5ce5758c1ca30418e5c776",
     "reviewId": "5e5ce3908c1ca30418e5c76f",
     "type": 4,
     "createdAt": "2020-03-02T10:52:37.390Z",
     "updatedAt": "2020-03-02T10:52:37.390Z",
     "__v": 0,
     "User": {
     "_id": "5dfdc4cf752d0d1160fbdd29",
     "phone": {
     "mobile": [
     "87784442",
    "875454"
     ],
     "work": "2141245457",
     "inner": "123"
     },
     "name": "Test User 1",
     "email": "parasat_99_99@mail.ru"
     }
     },
     {
     "_id": "5e5ce3908c1ca30418e5c774",
     "reviewId": "5e5ce3908c1ca30418e5c76f",
     "type": 1,
     "createdAt": "2020-03-02T10:44:32.471Z",
     "updatedAt": "2020-03-02T10:44:32.471Z",
     "__v": 0,
     "User": {
     "_id": "5dfdc4cf752d0d1160fbdd29",
     "phone": {
     "mobile": [
     "87784442",
    "875454"
     ],
    "work": "2141245457",
     "inner": "123"
     },
     "name": "Test User 1",
     "email": "parasat_99_99@mail.ru"
     }
     }
     ],
     "pageSize": 20,
     "total": 6,
     "currentPage": 1
    };
  }

  getTime(time) {
    const parse = time.split('T');
    const data = parse[0].split('-');
    return `${data[2]}.${data[1]}.${data[0]}, ${parse[1].slice(0, 5)}`;
  }

  render() {
    return (
        <View style={styles.container}>
          <CustomHeader navigation={this.props.navigation} title="История" />
          <ScrollView>
            <View style={styles.containerScreen}>
              {this.data.history.map((item, index) =>
                <View key={index} style={styles.row}>
                  <View style={styles.left}>
                    {item.type == 0 &&
                      <Image style={styles.statusImg} source={require('../assets/images/1.png')} />
                    }
                    {item.type == 1 &&
                      <Image style={styles.statusImg} source={require('../assets/images/2.png')} />
                    }
                    {item.type == 2 &&
                      <Image style={styles.statusImg} source={require('../assets/images/3.png')} />
                    }
                    {item.type == 3 &&
                      <Image style={styles.statusImg} source={require('../assets/images/5.png')} />
                    }
                    {item.type == 4 &&
                      <Image style={styles.statusImg} source={require('../assets/images/6.png')} />
                    }
                    {(index + 1) != this.data.history.length &&
                      <View style={styles.statusLine}></View>
                    }
                  </View>
                  <View style={styles.right}>
                    {item.type == 0 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>Новая жалоба от</Text>
                        <Text style={styles.boldText}>{item.User.phone.work}</Text>
                        <Text style={styles.dateText}>{this.getTime(item.createdAt)}</Text>
                      </View>
                    }
                    {item.type == 1 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Жалоба от <Text style={styles.boldText}>{item.User.phone.work}</Text> получила статус
                        </Text>
                        <Text style={styles.boldText}>В процессе</Text>
                        <Text style={styles.dateText}>{this.getTime(item.createdAt)}</Text>
                      </View>
                    }
                    {item.type == 2 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Жалоба от <Text style={styles.boldText}>{item.User.phone.work}</Text> получила статус
                        </Text>
                        <Text style={styles.boldText}>Обработанные</Text>
                        <Text style={styles.dateText}>{this.getTime(item.createdAt)}</Text>
                      </View>
                    }
                    {item.type == 3 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Абонент <Text style={styles.boldText}>{item.User.phone.work}</Text> потвердил что жалоба
                        </Text>
                        <Text style={styles.normalText}>решена</Text>
                        <Text style={styles.dateText}>{this.getTime(item.createdAt)}</Text>
                      </View>
                    }
                    {item.type == 4 &&
                      <View style={styles.rightTitle}>
                        <Text style={styles.normalText}>
                          Абонент <Text style={styles.boldText}>{item.User.phone.work}</Text> потвердил что жалоба
                        </Text>
                        <Text style={styles.normalText}>не решена</Text>
                        <Text style={styles.dateText}>{this.getTime(item.createdAt)}</Text>
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
