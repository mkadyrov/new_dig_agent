import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';
import * as scale from 'd3-scale';

const Labels = ({ x, y, bandwidth, data }) => (
    data.map((value, index) => (
      <Text
        key={index}
        x={x(index) + (bandwidth / 2)}
        y={value < 3 ? y(value) - 10 : y(value) + 15}
        fontSize={10}
        fill={value >= 3 ? '#FFF' : '#000'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}>
          {value}
      </Text>
    ))
);

class BarChartExample extends React.Component {

  constructor(props) {
    super(props);
    this.width = '100%';
    this.scroll = false;
    if (this.props.data.length > 12) {
      this.width  = 600;
      this.scroll = true;
    }
  }

  render() {
    return (
      <View>
        <ScrollView horizontal={this.scroll}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', width: this.width, height: 200, paddingVertical: 16}}>
              <BarChart
                style={{ flex: 1 }}
                data={this.props.data}
                svg={{ fill: 'rgba(255, 197, 61, 0.8)' }}
                contentInset={{ top: 10, bottom: 0 }}
                spacing={0.2}
                gridMin={0} >
                  <Grid direction={Grid.Direction.HORIZONTAL}/>
                  <Labels />
              </BarChart>
            </View>
            <View style={{marginTop: 0, width: this.width}}>
              <XAxis
                  data={this.props.keys}
                  xAccessor={ ({ item }) => item }
                  scale={scale.scaleBand}
                  formatLabel={ (value, index) => value}
                  svg={{fontSize: 10, fill: '#333'}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

}

export default BarChartExample;
