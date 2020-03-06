import * as React from 'react';
import {AsyncStorage, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
import DetailsScreen from "../screens/DetailsScreen";

class DrawerContentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.user = {};
    }
    componentDidMount() {
        AsyncStorage.getItem('token').then((value) => {
            if (value !== '') {
                fetch("https://api2.digitalagent.kz/api/admin/profile",
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
                            this.user = result?.user;
                        },
                        (error) => {}
                    );
            } else {
                // this.props.this.props.navigation.navigate('Login');
            }
        });
    }
    render() {

        return (
            <View>
                <View style={styles.userBlock}>
                    <View style={styles.userBlockTabName}>
                        <Text style={styles.userBlockTabNameText}>АК</Text>
                    </View>
                    <View>
                        <Text style={styles.userBlockName}>{this.user?.name}</Text>
                        <Text style={styles.userBlockSubName}>{this.user?.position}</Text>
                    </View>
                </View>
                <View style={styles.menuBlock}>
                    <View style={styles.menuBlockTab}>
                        <Icon name="person" style={styles.menuBlockTabIcon}/>
                        <Text style={styles.menuBlockTabText}
                              onPress={() => this.props.navigation.navigate('ProfileScreen')}>Профиль</Text>
                    </View>
                    <View style={styles.menuBlockTab}>
                        <Icon name="ios-timer" style={styles.menuBlockTabIcon}/>
                        <Text style={styles.menuBlockTabText}
                              onPress={() => this.props.navigation.navigate('HistoryScreen')}>История</Text>
                    </View>
                    <View style={styles.menuBlockTab}>
                        <Icon name="ios-help-circle-outline" style={styles.menuBlockTabIcon}/>
                        <Text style={styles.menuBlockTabText}
                              onPress={() => this.props.navigation.navigate('HelpScreen')}>Помощь</Text>
                    </View>
                    <View style={styles.menuBlockTab}>
                        <Icon name="exit" style={styles.menuBlockTabIcon}/>
                        <Text style={styles.menuBlockTabText} onPress={() => this.props.navigation.navigate('Login')}>Выход</Text>
                    </View>
                </View>
            </View>
        );
    };
}
export default DrawerContentComponent;
const styles = StyleSheet.create({
    userBlock: {
        width: '100%',
        padding: 20,
        backgroundColor: '#343434',
        flexDirection: 'row',
    },
    userBlockTabName: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFC53D',
    },
    userBlockTabNameText: {
        fontSize: 13,
    },
    userBlockName: {
        fontSize: 12,
        paddingLeft: 15,
        color: '#FFF',
        paddingTop: 1,
    },
    userBlockSubName: {
        fontSize: 10,
        paddingLeft: 15,
        color: '#FFF',
    },
    menuBlock: {
        padding: 20,
    },
    menuBlockTab: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DDD',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 15,
    },
    menuBlockTabIcon: {
        color: '#FFC53D',
        fontSize: 25,
        marginRight: 10,
        width: 25,
    },
    menuBlockTabText: {
        fontSize: 13,
        color: '#444',
    }
});
