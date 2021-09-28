// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,View,Image,RefreshControl} from 'react-native';
import { ListItem } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import NavHeader from '../Components/NavHeader';

// import firebase from '../database/firebaseDb';
const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

class UserScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firestore().collection('Users');
    this.state = {
      isLoading: true,
      refreshing:false,
      userArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  onRefresh = () => {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { name, email, mobile } = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        email,
        mobile,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
   });
  }

  navigateToAddUser = () => {
    this.props.navigation.navigate('AddUserScreen', {
      onGoBack: (val) => this.refreshUsers(val),
    });
  }

  refreshUsers = (val) => {
    if(val){
      this.setState({isLoading:true},()=>{
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
      })
    }}

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.mainContainer}>
      <NavHeader title="Users List" initialRoute={true} onPress={()=>{this.props.navigation.toggleDrawer()}}/>  
      <ScrollView style={styles.container}
      refreshControl={
          <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
        }>
          {
            this.state.userArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.name}
                  subtitle={item.email+"  "+item.mobile}
                  onPress={() => {
                    this.props.navigation.navigate('UserDetailScreen', {
                      userkey: item.key,
                      onGoBack: (val) => this.refreshUsers(val),
                    });
                  }}/>
              );
            })
          }
          
      </ScrollView>
      <TouchableWithoutFeedback onPress={this.navigateToAddUser} style={{left:280,bottom:20}}>
      <View style={styles.addButton}>
            <Image source={require('../assets/plus_btn.png')} style={styles.plusImage}/>
            </View>
      </TouchableWithoutFeedback>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#fff'
  },
  container: {
   flex: 1,
   paddingBottom: 22,
   position:'relative'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton:{
    width:60,
    height:60
  },
  plusImage:{
    height:'100%',
    width:'100%',
    tintColor:'orange'
  }
})

export default UserScreen;