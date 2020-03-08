import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import CountDown from "react-native-countdown-component";

class RateHomeAbonent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  getM(item) {
    return false;
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.link, {item: this.props.data})}>
        <View style={styles.container}>
          <Text style={styles.phone}>{this.props.data.User.phone.work}</Text>
          <View style={styles.rates}>
            <Image style={styles.star} source={this.props.data.rate >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
            <Image style={styles.star} source={this.props.data.rate >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
            <Image style={styles.star} source={this.props.data.rate >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
            <Image style={styles.star} source={this.props.data.rate >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
            <Image style={styles.star} source={this.props.data.rate >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
          </View>
          <CountDown
              until={this.props.data.timer}
              size={10}
              timeToShow={["M","S"]}
              timeLabels={{d: 'Days', h: 'Hours', m: '', s: ''}}
          />
          <View style={styles.time}>
            {this.getM(this.props.data) && this.props.type == 2 || this.props.type == 3 &&
              <View style={styles.tab}>
                <Text style={styles.tabText}>
                  {this.props.data.ContactPerson.name.slice(0, 1)}
                </Text>
              </View>
            }
            {!this.getM(this.props.data) && this.props.type == 2  &&
              <View style={styles.tabTimeout}>
                <Image source={require('../assets/images/crown.png')} style={{width: 15, height: 10, marginTop: -5}}/>
              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default RateHomeAbonent;

const styles = StyleSheet.create({
  container: {
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
    width: '35%',
    height: 30,
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
  },
  rates: {
    width: '35%',
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
  tabTimeout: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#d91414',
    paddingTop: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
  }
});
