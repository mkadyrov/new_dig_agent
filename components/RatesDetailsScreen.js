import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

class RatesDetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 0,
    };
  }

  onLayout(count) {
    let wide = (count / this.props.counts) * 100;
    this.setState({width: wide + '%'});
  };

  render () {
    return (
      <View style={styles.row}>
        <Text style={styles.rate}>{this.props.name}</Text>
        <View style={styles.bar} onLayout={() => this.onLayout(this.props.val)}>
          <View style={[styles.progress, {width: this.state.width}]}></View>
          <Text style={styles.count}>{this.props.val}</Text>
        </View>
      </View>
    );
  };
};

export default RatesDetailsScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  rate: {
    width: '15%',
    height: 18,
    fontSize: 11,
    paddingRight: 10,
    color: '#999',
  },
  bar: {
    width: '55%',
    height: 18,
    flexDirection: 'row',
  },
  count: {
    width: '30%',
    height: 18,
    fontSize: 11,
    textAlign: 'right',
    paddingLeft: 0,
    color: '#444',
  },
  progress: {
    backgroundColor: '#FFC53D',
    height: 18,
  }
});
