import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements';

const NavHeader = ({title, onPress,initialRoute}) => <View style={styles.container}>
    {!initialRoute ?
    <View style={{width:40}}>
    <Icon name="keyboard-arrow-left" color="#fff" size={30} onPress={onPress}/>
    </View>:
    <View style={{width:40,marginHorizontal:5}}>
    <Icon name="menu" color="#fff" size={30} onPress={onPress}/>
    </View>
    }
    <Text style={styles.navTitle}>{title}</Text>
    </View>

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:70,
        backgroundColor:'#621FF7',
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    navTitle:{
        fontWeight:'bold',
        color:'#fff',
        fontSize:18
    }
})

export default NavHeader;