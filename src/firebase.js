import Rebase from "re-base";
import firebase from "firebase";
const config = {
  apiKey: process.env.REACT_APP_firebase_apiKey,
  authDomain: process.env.REACT_APP_firebase_authDomain,
  databaseURL: process.env.REACT_APP_firebase_databaseURL,
  projectId: process.env.REACT_APP_firebase_projectId,
  storageBucket: process.env.REACT_APP_firebase_storageBucket,
  messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId
};
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
export { base };
