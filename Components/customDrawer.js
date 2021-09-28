import React, { Component, useEffect } from 'react';
import {View,Text,StyleSheet,SafeAreaView,Image,NativeModules} from 'react-native';
import { Icon } from 'react-native-elements';
import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import OAuthManager from 'react-native-oauth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
const { RNTwitterSignIn } = NativeModules

const manager = new OAuthManager('crudexample');

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "zXFyzeGD5Ipz8EMaEZpUVGo8H",
  TWITTER_CONSUMER_SECRET: "u1MnNxUN7XS9ygn9kIhjDyRNYcfBgOkbAKE0YUmYyBpGPlFbF8"
}

const config =  {
  twitter: {
    consumer_key: 'zXFyzeGD5Ipz8EMaEZpUVGo8H',
    consumer_secret: 'u1MnNxUN7XS9ygn9kIhjDyRNYcfBgOkbAKE0YUmYyBpGPlFbF8'
  },
  facebook: {
    client_id: '305251677462043',
    client_secret: 'eb72d8d7626741f70097c1d167dcfd3d'
  },
  // google: {
  //   callback_url: 'https://www.lipsum.com/',
  //   client_id: '704957615126-8ha9lpjlru0n0v65guuf7lko9kflfuoe.apps.googleusercontent.com',
  //   client_secret: 'WuW3Ak7jrUrMn9Fv9VcrkWra'
  // }
}

const MenuItem = ({title,handlePress,socialLogin=null}) => <TouchableNativeFeedback onPress={handlePress}>
<View style={[styles.menuItem,{backgroundColor:socialLogin?socialLogin.color:'#fff'}]}>
  {
    socialLogin &&
    <View style={styles.socialLogo}>
    <Image source={socialLogin.icon} style={styles.logo}/>
    </View>
   }
    <Text style={[styles.itemName,{color:socialLogin?'#fff':'#000'}]}>{title}</Text>
    </View>
    </TouchableNativeFeedback>

const CustomDrawerContentComponent = (props) => {

  const configGoogleSignin = async() => { 
    await GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '704957615126-okslqng111b4796n3b6mh6eaumnmihv9.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

        useEffect( async()=>{
          manager.configure(config);
          configGoogleSignin();
        },[])
        // 18769333878-k10jfctvro3g6tktuba4ds5ljn4d737v.apps.googleusercontent.com
        // QeaJNNGypeSCSusoEzcIT7ajP3BGKskAVBry8UxFTEn0OegEZ0

        const handleTwitterLogin = () => {
            RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
            RNTwitterSignIn.logIn()
              .then(loginData => {
                console.log(loginData)
                const { authToken, authTokenSecret } = loginData
                // if (authToken && authTokenSecret) {
                //   this.setState({
                //     isLoggedIn: true
                //   })
                // }
              })
              .catch(error => {
                console.log(error)
              }
            )
        }

        const handleFbLogin = () => {
          manager.authorize('facebook')
        .then(resp => console.log("rest---",resp))
        .catch(err => console.log("errs---",err));
        }

       const handleGLogin = async () => {
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // this.setState({ userInfo });
            console.log("###",userInfo);
          } catch (error) {
            console.log("err---",error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
              // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              // play services not available or outdated
            } else {
              // some other error happened
            }
          }
        };

      return (
            <SafeAreaView
              style={styles.container}
              forceInset={{ top: 'always', horizontal: 'never' }}>
              <View style={styles.avatar}>
                <Icon name="account-circle" color="#000" size={100}/>
              </View>
             <View style={styles.listContainer}>       
            <MenuItem title="Home" handlePress={()=>props.navigation.navigate('Home')}/>
            <MenuItem title="Add User" handlePress={()=>props.navigation.navigate('AddUserScreen')}/>
            <MenuItem title="Login with Facebook" socialLogin={{icon:require('../assets/fb.png'),color:'#3c5a99'}} handlePress={()=>handleFbLogin()}/>
            <MenuItem title="Login with Twitter" socialLogin={{icon:require('../assets/twitter.png'),color:'#40a2f2'}} handlePress={()=>handleTwitterLogin()}/>
            <MenuItem title="Login with Google" socialLogin={{icon:require('../assets/google.png'),color:'#cbd2d6'}} handlePress={()=>handleGLogin()}/>
            </View>
            </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({
        avatar: {
         flex:1,
         justifyContent:'center',
        },
        container:{
         flex:1,
        //  height:400
     },
     menuItem:{
         height:50,
         justifyContent:'flex-start',
         flexDirection:'row',
         alignItems:'center',
         borderBottomColor:'#fafafa',
         marginHorizontal:10,
         borderBottomWidth:1,
         borderRadius:3
     },
     itemName:{
         fontSize:16,
         fontWeight:'bold'
     },
     listContainer:{
         flex:2,
         justifyContent:'flex-start',
     },
     socialLogo : {
       width:25,
       height:25,
       marginHorizontal:10
     },
     logo:{
       width:'100%',
       height:'100%',
       tintColor:'#fff'
     }
    })

    export default CustomDrawerContentComponent;