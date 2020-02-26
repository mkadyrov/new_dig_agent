import * as React from 'react';
import {StyleSheet, Button, View, Text, Image, ScrollView} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";

import Copy from "../components/Copy";

class HelpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      select: 0,
    };
  }

  setSelect(index) {
    let select = this.state.select;
    if (index == this.state.select) {
      select = 0;
    } else {
      select = index;
    }
    this.setState({select: select});
  }

  render() {
    return (
        <View style={styles.container}>
          <CustomHeader navigation={this.props.navigation} title="Помощь" />
          <ScrollView>
            <View style={styles.containerScreen}>
              <View style={[styles.row, {marginTop: 15}]}>
                <View style={styles.rowFlex}>
                  {this.state.select == 1 &&
                    <Image style={styles.arrow} source={require('../assets/images/arrow-b.png')} />
                  }
                  {this.state.select != 1 &&
                    <Image style={styles.arrow} source={require('../assets/images/arrow-l.png')} />
                  }
                  <Text style={styles.rowText} onPress={() => this.setSelect(1)}>Как обработать жалобу</Text>
                </View>
                {this.state.select == 1 &&
                  <View style={styles.rowCont}>
                    <Text style={styles.normal}>На главной странице, в разделе <Text style={styles.bold}>Новые жалобы</Text> отображаются жалобы которые поступили от абонента на данный момент.</Text>
                    <Image style={[styles.image, {height: 354}]} source={require('../assets/images/help1.jpg')} />
                    <Text style={styles.normal}>В строке вы увидите номер абонента, рейтинг, который он поставил и оствашееся время на обработку.</Text>
                    <Image style={[styles.image, {height: 53}]} source={require('../assets/images/help2.jpg')} />
                    <Text style={styles.normal}>Если вы не успели обработать жалобу, то она автоматически переходит в раздел <Text style={styles.bold}>Проваленные</Text>.</Text>
                    <Text style={{width: '100%', height: 20}}></Text>
                    <Text style={styles.normal}>Нажав на строку новой жалобы, вы переходите на страницу с детальным описанием жалобы, где вы можете ознакомиться с какой проблемой обращается абонент.</Text>
                    <Image style={[styles.image, {height: 270}]} source={require('../assets/images/help3.jpg')} />
                    <Text style={styles.normal}>На этой странице, у вас всегда будет видна кнопка <Text style={styles.bold}>Позвонить</Text> с таймеров обратного отсчета. Этот таймер отображает, сколько времени у вас осталось чтобы обработать жалобу.</Text>
                    <Image style={[styles.image, {height: 100}]} source={require('../assets/images/help4.jpg')} />
                    <Text style={styles.normal}>Нажав на кнопку <Text style={styles.bold}>Позвонить</Text>, совершается звонок абоненту и жалоба переходит в категорию <Text style={styles.bold}>В процессе</Text></Text>
                  </View>
                }
              </View>
              <View style={styles.row}>
                <View style={styles.rowFlex}>
                {this.state.select == 2 &&
                  <Image style={styles.arrow} source={require('../assets/images/arrow-b.png')} />
                }
                {this.state.select != 2 &&
                  <Image style={styles.arrow} source={require('../assets/images/arrow-l.png')} />
                }
                  <Text style={styles.rowText} onPress={() => this.setSelect(2)}>Что такое "В процессе"</Text>
                </View>
                {this.state.select == 2 &&
                  <View style={styles.rowCont}>
                    <Text style={styles.normal}>Нет данных.</Text>
                  </View>
                }
              </View>
              <View style={styles.row}>
                <View style={styles.rowFlex}>
                {this.state.select == 3 &&
                  <Image style={styles.arrow} source={require('../assets/images/arrow-b.png')} />
                }
                {this.state.select != 3 &&
                  <Image style={styles.arrow} source={require('../assets/images/arrow-l.png')} />
                }
                  <Text style={styles.rowText} onPress={() => this.setSelect(3)}>Как жалобы попадают в "Проваленные"</Text>
                </View>
                {this.state.select == 3 &&
                  <View style={styles.rowCont}>
                    <Text style={styles.normal}>Нет данных.</Text>
                  </View>
                }
              </View>
              <View style={styles.row}>
                <View style={styles.rowFlex}>
                {this.state.select == 4 &&
                  <Image style={styles.arrow} source={require('../assets/images/arrow-b.png')} />
                }
                {this.state.select != 4 &&
                  <Image style={styles.arrow} source={require('../assets/images/arrow-l.png')} />
                }
                  <Text style={styles.rowText} onPress={() => this.setSelect(4)}>Как формируется рейтинг</Text>
                </View>
                {this.state.select == 4 &&
                  <View style={styles.rowCont}>
                    <Text style={styles.normal}>Нет данных.</Text>
                  </View>
                }
              </View>
              <Copy />
            </View>
          </ScrollView>
        </View>
    );
  }
}

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
    height: '100%',
  },
  containerScreen: {
    padding: 20,
  },
  row: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DDD',
    marginTop: 30,
    paddingBottom: 30,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  arrow: {
    width: 14,
    height: 14,
    marginTop: 7,
    marginRight: 15,
  },
  rowText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rowCont: {
    paddingTop: 20,
  },
  normal: {
    fontSize: 13,
  },
  bold: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  image: {
    width: null,
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
  },
});
