import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import NavHeader from '../Components/NavHeader';

class UserDetailScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firestore().collection('Users');
    this.state = {
      name: '',
      email: '',
      mobile: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = this.firestoreRef.doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = this.firestoreRef.doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        email: '',
        mobile: '',
        isLoading: false,
      });
      // this.props.navigation.navigate('UserScreen');
      this.props.route.params.onGoBack(this.state.name);
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteUser() {
    const dbRef = this.firestoreRef.doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          // this.props.navigation.navigate('UserScreen');
          this.props.route.params.onGoBack(this.props.route.params.userkey);
          this.props.navigation.goBack();
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteUser()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      
      <NavHeader title="User Details" onPress={()=>this.props.navigation.goBack()}/>  
    {
      this.state.isLoading?
      <View style={styles.preloader}>
      <ActivityIndicator size="large" color="#9E9E9E"/>
    </View>
      :
      <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
            placeholder={'Name'}
            value={this.state.name}
            onChangeText={(val) => this.inputValueUpdate(val, 'name')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={'Email'}
            value={this.state.email}
            onChangeText={(val) => this.inputValueUpdate(val, 'email')}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
            placeholder={'Mobile'}
            value={this.state.mobile}
            onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='Update'
          onPress={() => this.updateUser()} 
          color="#19AC52"
        />
        </View>
       <View>
        <Button
          title='Delete'
          onPress={this.openTwoButtonAlert}
          color="#E37399"
        />
      </View>
    </ScrollView>
    }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  container: {
   marginTop:30,
    width:'100%',
    paddingHorizontal:10
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  button: {
    marginBottom: 7, 
  }
})

export default UserDetailScreen;