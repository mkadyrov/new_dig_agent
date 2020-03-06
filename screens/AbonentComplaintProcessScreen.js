import * as React from 'react';
import {AsyncStorage, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CustomHeader from "../components/CustomHeader";
import {Icon} from 'native-base';
import CountDown from 'react-native-countdown-component';
import moment from "moment";
class AbonentComplaintProcessScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statusLoad: false,
            time: '',
            timerStatus: false,
            sendButton: false,
        };
        this.complaints = [];
        this.data = {};
    }

    handleCall(tel) {
      this.setState({sendButton: true});
        Linking.openURL("tel:" + tel)
    }
    getTimer(){

        // const date = this.data.review.createdAt.split('T');
        // const date_p = date[0].split('-');
        // const time = date[1].split('.');
        // const time_p = time[0].split(':');
        // const old_date = new Date(Number(date_p[0]), Number(date_p[1]) - 1, Number(date_p[2]), Number(time_p[0]), Number(time_p[1]), Number(time_p[2]));
        // // const old_date = new Date(2020, 2, 7, 2, 51);//dssadss
        // const new_date = new Date();
        // return Math.ceil((new_date.getTime() - old_date.getTime()) / (60000));
        // console.log(this.data.createdAt) ;
        return 5;
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((value) => {
            if (value !== '') {
                fetch(`https://api2.digitalagent.kz/api/reviews/${this.props.route.params.item._id}`,
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
                            let timer = moment(this.data.review.createdAt).format("X") - moment().format("X");

                            this.data.timer= Math.floor(parseFloat(moment(this.data.review.createdAt).add(5,"minutes").format("x"))) - Math.floor(parseFloat(moment().format("x")));

                            result.review.categories.forEach((item) => {
                                item.criterias.forEach((item2) => {
                                    this.complaints.push(item2.nameRu);
                                })
                            });
                            // const date = this.data.review.createdAt.split('T');
                            // const date_p = date[0].split('-');
                            // const time = date[1].split('.');
                            // const time_p = time[0].split(':');
                            // //const old_date = new Date(Number(date_p[0]), Number(date_p[1]) - 1, Number(date_p[2]), Number(time_p[0]), Number(time_p[1]), Number(time_p[2]));
                            // const old_date = new Date(2020, 2, 6, 2, 51);//dssadss
                            // const new_date = new Date();
                            // const timer_m = Math.ceil((new_date.getTime() - old_date.getTime()) / (60000));
                            // let timeTextM = 5;
                            // let timeTextS = 59;
                            // if (timer_m > 5) {
                            //     this.setState({timerStatus: true, time: '00:00'})
                            // } else {
                            //     const timeInt = setInterval(() => {
                            //         timeTextM = `0${Math.ceil((new_date.getTime() - old_date.getTime()) / (60000))}`;
                            //         timeTextS = `${Math.ceil((new_date.getTime() - old_date.getTime()) / (6000))}`;
                            //         this.setState({time: `${timeTextM}:${timeTextS}`});
                            //     }, 1000);
                            // }
                            if (this.data.timer < 1) {
                                this.setState({timerStatus: true})
                            }
                            this.setState({statusLoad: true});
                        },
                        (error) => {
                        }
                    );
            } else {
                this.props.navigation.navigate('Login');
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomHeader navigation={this.props.navigation} title='В процессе'/>
                {this.state.statusLoad &&
                <ScrollView>
                    <View style={styles.containerScreen}>
                        <Text
                            style={[styles.label, {borderTopWidth: 0, paddingTop: 0, marginTop: 0}]}>Обрабатывает</Text>
                        <View style={[styles.value, {flexDirection: 'row'}]}>
                            <View style={styles.tab}><Text
                                style={styles.value}>{this.data.review.Operator.name ? this.data.review.Operator.name.slice(0, 1) : ''}</Text></View>
                            <Text
                                style={[styles.value, {marginTop: 5}]}>{this.data.review.Operator.name ? this.data.review.Operator.name : ''}</Text>
                        </View>
                        <Text style={styles.label}>Абонент</Text>
                        <Text style={styles.value}>{this.data.User.phone.work ? this.data.User.phone.work : ''}</Text>
                        <Text style={styles.label}>ФИО</Text>
                        <Text style={styles.value}>{this.data.User.name ? this.data.User.name : ''}</Text>
                        <Text style={styles.label}>ИИН</Text>
                        <Text style={styles.value}></Text>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{this.data.User?.email}</Text>
                        <Text style={styles.label}>Оценка</Text>
                        <View style={styles.rates}>
                            <Image style={styles.star}
                                   source={this.data.review.rate >= 1 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')}/>
                            <Image style={styles.star}
                                   source={this.data.review.rate >= 2 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')}/>
                            <Image style={styles.star}
                                   source={this.data.review.rate >= 3 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')}/>
                            <Image style={styles.star}
                                   source={this.data.review.rate >= 4 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')}/>
                            <Image style={styles.star}
                                   source={this.data.review.rate >= 5 ? require('../assets/images/star.png') : require('../assets/images/star-gray.png')}/>
                        </View>
                        <Text style={styles.label}>Категория</Text>
                        <View style={styles.categoryBlock}>
                            {this.data.review.categories.map((category, index) =>
                                <View key={index} style={styles.category}>
                                    <View key={index}>
                                        <Image style={styles.catImg}
                                               source={{url: 'https://api2.digitalagent.kz/' + category.image}}/>
                                    </View>
                                    <Text style={styles.categoryText}>{category.nameRu}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.label}>Жалобы</Text>
                        <View style={styles.complaintBlock}>
                            {this.complaints.map((complaint, index) =>
                                <View key={index} style={styles.complaint}>
                                    <Text style={styles.complaintText}>{complaint}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.label}>Комментарий</Text>
                        <Text style={styles.value}>{this.data.review.text}
                        </Text>

            <Text style={styles.label}>Фотография</Text>
            <Image style={styles.photo} source={require('../assets/images/image.jpg')} />
          </View>

          <View style={styles.callBlock}>
            {!!this.state.timerStatus &&
            <TouchableOpacity onPress={() => this.handleCall(this.data.User.phone.work)}>
              <View style={styles.callDefButton}>
                <Text style={styles.callDefText}>Позвонить</Text>
                <View style={styles.callDefTime}>
                  <Icon name="stopwatch" style={styles.callDefIcon} />
                  <CountDown
                      until={0}
                      size={10}
                      timeToShow={["M","S"]}
                      timeLabels={{d: 'Days', h: 'Hours', m: '', s: ''}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            }
            {this.state.timerStatus === false &&
            <TouchableOpacity onPress={() => this.handleCall(this.data.User.phone.work)}>

            <View style={styles.callButton}>
                <Text style={styles.callText} >Позвонить</Text>

                <View style={styles.callTime}>
                  <Icon name="stopwatch" style={styles.callIcon} />
                  {/*<Text style={styles.callTimeText}>*/}
                    {/*{this.state.time}*/}
                    <CountDown
                        until={this?.data.timer}
                        size={10}
                        timeToShow={["M","S"]}
                        timeLabels={{d: 'Days', h: 'Hours', m: '', s: ''}}
                    />
                  {/*</Text>*/}
                </View>
              </View>
            </TouchableOpacity>
            }
          </View>
          {this.state.sendButton &&
            <View style={styles.callBlock}>
              <View style={styles.callButton}>
                <Text style={[styles.callText, {width: '100%'}]}>Отправить потверждение для закрытия жалобы</Text>
              </View>
            </View>
          }
        </ScrollView>
        }
      </View>
    );
  }
}

export default AbonentComplaintProcessScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
                        },
                        containerScreen: {
                        padding: 20,
                    },
                        label: {
                        fontSize: 13,
                        color: '#999',
                        borderTopWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#DDD',
                        paddingBottom: 10,
                        paddingTop: 15,
                        marginTop: 20,
                    },
                        valueRow: {
                        flexDirection: 'row',
                        paddingTop: 10,
                        paddingBottom: 15,
                    },
                        valueRowText: {
                        fontSize: 15,
                        color: '#333',
                    },
                        valueRowTab: {
                        borderRadius: 30,
                        width: 30,
                        height: 30,
                        backgroundColor: '#E8E8E8',
                        fontSize: 11,
                        textAlign: 'center',
                        paddingTop: 3,
                        position: 'absolute',
                        right: 0,
                        bottom: 15,
                    },
                        value: {
                        fontSize: 15,
                        color: '#333',
                    },
                        tab: {
                        backgroundColor: '#E8E8E8',
                        borderRadius: 40,
                        width: 40,
                        height: 40,
                        marginRight: 15,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingTop: 5,
                    },
                        rates: {
                        width: '40%',
                        height: 15,
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 15,
                        marginBottom: 15,
                    },
                        star: {
                        width: 24,
                        height: 24,
                        marginRight: 5,
                        marginTop: -1,
                    },
                        categoryBlock: {
                        width: '100%',
                        paddingBottom: 20,
                        flexDirection: 'row',
                        flexWrap: 'nowrap'
                    },
                        category: {
                        width: '25%',
                        padding: 5,
                        color: '#333',
                    },
                        categoryTab:{
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#DDD',
                        backgroundColor: '#FFF',
                        borderRadius: 5,
                        alignItems: 'center',
                        paddingTop: 15,
                        paddingBottom: 15,
                    },
                        catImg: {
                        width: 30,
                    },
                        categoryText: {
                        fontSize: 9,
                        color: '#333',
                        width: '100%',
                        textAlign: 'center',
                        paddingTop: 5,
                    },
                        on: {
                        borderColor: '#FFC53D',
                        backgroundColor: '#FFF',
                    },
                        onText: {
                        color: '#FFC53D',
                    },
                        complaintBlock: {
                        width: '100%',
                        paddingBottom: 20,
                    },
                        complaint: {
                        width: '100%',
                        marginTop: 15,
                    },
                        complaintText: {
                        fontSize: 13,
                        color: '#444',
                    },
                        photo: {
                        width: '100%',
                        marginTop: 15,
                        marginBottom: 15,
                    },
                        callBlock: {
                        width: '100%',
                        backgroundColor: '#FFF',
                        borderTopWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#DDD',
                        padding: 20,
                    },
                        callButton: {
                        backgroundColor: '#FEC63F',
                        flexDirection: 'row',
                    },
                        callText: {
                        width: '65%',
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                        fontSize: 13,
                    },
                        callTime: {
                        width: '35%',
                        borderLeftWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#E8AD2B',
                        paddingTop: 10,
                        paddingBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    },
                        callIcon:{
                        fontSize: 22,
                        paddingRight: 10,
                    },
                        callTimeText: {
                        fontSize: 13,
                    },
                        callDefButton: {
                        backgroundColor: '#c71414',
                        flexDirection: 'row',
                    },
                        callDefTime: {
                        width: '35%',
                        borderLeftWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#FFF',
                        paddingTop: 10,
                        paddingBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    },
                        callDefText: {
                        width: '65%',
                        textAlign: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                        fontSize: 13,
                        color: '#FFF',
                    },
                        callDefIcon: {
                        fontSize: 22,
                        paddingRight: 10,
                        color: '#FFF',
                    },
                        callDefTimeText: {
                        fontSize: 13,
                        color: '#FFF',
                    },
                        });
