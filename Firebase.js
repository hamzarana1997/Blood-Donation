// import * as firebase from 'firebase'
import firebase from 'firebase'
import syncStorage from 'sync-storage';
const firebaseConfig = {
    apiKey: "AIzaSyCPnmcGnYBLokZsXCSDl_zVWRmAhqaWmLU",
    authDomain: "blood-bank-6daee.firebaseapp.com",
    databaseURL: "https://blood-bank-6daee.firebaseio.com",
    projectId: "blood-bank-6daee",
    storageBucket: "blood-bank-6daee.appspot.com",
    messagingSenderId: "70260363010",
    appId: "1:70260363010:web:6cecf72275d85d306f3c1b",
    measurementId: "G-M2NMF3805K"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
// const userData = SyncStorage.get('userInfo');
async function joinRoom(fid){
firebase.firestore().collection("chatRoom").doc(fid).set({
  user1: syncStorage.get("userInfo").id,
  user2: fid,
  timestamp: Date.now()
})
}
// firebase.analytics();
export {
  joinRoom
}