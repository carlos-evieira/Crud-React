import firebase from 'firebase'


const firebaseConfig = {
apiKey: "AIzaSyB5RBSlk7XJWNrnarnk_q5yDofa87ys31Y",
authDomain: "crud-usuario-6c673.firebaseapp.com",
projectId: "crud-usuario-6c673",
storageBucket: "crud-usuario-6c673.appspot.com",
messagingSenderId: "902038533894",
appId: "1:902038533894:web:2965c5c91ba4c621389087"
};
let fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref()