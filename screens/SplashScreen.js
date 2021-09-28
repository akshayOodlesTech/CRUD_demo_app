// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet,ActivityIndicator,View,Text } from 'react-native';

class SplashScreen extends Component {
    
    static navigationOptions = {
        header:'none'
      };

      componentDidMount(){
          setTimeout(()=>{
            this.props.navigation.navigate('Dashboard');
          },3000)
      }

  render() {   
    return (
      <View style={styles.mainContainer}>
          <Text style={{fontSize:20,fontWeight:'bold'}}>CRUD Demo App</Text>
          <ActivityIndicator size="large" color="#9E9E9E"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent:'space-evenly',
    alignItems:'center'
  }
})

export default SplashScreen;