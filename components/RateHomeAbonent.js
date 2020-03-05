import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import { Header } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class RateHomeAbonent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.phone} onPress={() => this.props.navigation.navigate(this.props.link, {item: this.props.data})}>{this.props.data.User.phone.work}</Text>
        <View style={styles.rates}>
          <Image style={styles.star} source={this.props.data.rate >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
          <Image style={styles.star} source={this.props.data.rate >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
          <Image style={styles.star} source={this.props.data.rate >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
          <Image style={styles.star} source={this.props.data.rate >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
          <Image style={styles.star} source={this.props.data.rate >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')} />
        </View>
        <View style={styles.time}>
          {this.props.type != 1 &&
            <View style={styles.tab}>
              <Text style={styles.tabText} onPress={() => this.props.navigation.navigate(this.props.link, {item: this.props.data})}>{this.props.data.ContactPerson.name.slice(0, 1)}</Text>
            </View>
          }
        </View>
      </View>
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
