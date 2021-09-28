// import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

// const firebaseConfig = {
//     // apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//     // authDomain: "xxxxxxxxx-00000.firebaseapp.com",
//     // databaseURL: "https://xxxxxxxxx-00000.firebaseio.com",
//     // projectId: "xxxxxxxxx-00000",
//     // storageBucket: "xxxxxxxxx-00000.appspot.com",
//     // messagingSenderId: "000000000000000",
//     // appId: "1:000000000000000:web:000000000000000"

//     apiKey: "AIzaSyAGMWwr5VApe75BNgc7I-284jfap-hFfY4",
//     authDomain: "cruddemo-24167.firebaseapp.com",
//     databaseURL: "https://cruddemo-24167.firebaseio.com",
//     projectId: "cruddemo-24167",
//     storageBucket: "cruddemo-24167.appspot.com",
//     messagingSenderId: "704957615126",
//     appId: "1:704957615126:web:497049287ad5aedba17937",
// };

// firebase.initializeApp(firebaseConfig);

// firebase.firestore();

// export default firebase;


import firebase from 'firebase';

const config={
//  apiKey: “YOUR_API_KEY”,
//  authDomain: “something.firebaseapp.com”,
//  databaseURL: “https://something.firebaseio.com",
//  projectId: “PROJECT_ID”,
//  storageBucket: “”,
//  messagingSenderId: “SENDER_ID”,

     apiKey: "AIzaSyAGMWwr5VApe75BNgc7I-284jfap-hFfY4",
    authDomain: "cruddemo-24167.firebaseapp.com",
    databaseURL: "https://cruddemo-24167.firebaseio.com",
    projectId: "cruddemo-24167",
    storageBucket: "cruddemo-24167.appspot.com",
    messagingSenderId: "704957615126",
    appId: "1:704957615126:web:497049287ad5aedba17937",
}

firebase.firestore.setLogLevel('debug');
const Firebase = firebase.initializeApp(config);
export default Firebase;