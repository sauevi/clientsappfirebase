import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

/**
 * en esta calse, hara el store de nuestra DB la cual se encuentra
 * en firebase. Esto sirve para conectarnos con firebase y firestore.
 * esto es muy utili ya que asi se crea toda la conexion.
 */

//TODO realizar los reducers

//configuracion para el firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCG7TwRDP7W67gZ9PSyAaB28Dg-OYSK2YU',
  authDomain: 'reactclientpanel-f4abe.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-f4abe.firebaseio.com',
  projectId: 'reactclientpanel-f4abe',
  storageBucket: 'reactclientpanel-f4abe.appspot.com',
  messagingSenderId: '271719133982'
};
//configuracion del firestore para react-redux-firebase
const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

//inicializar las instancias del firebase
firebase.initializeApp(firebaseConfig);
// incializar el firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

//agregar reactReduxFirebase cuando se reazila una creacion
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), //finicando firebase como el primer argumento
  reduxFirestore(firebase) //se necesita al utilizar firestore
)(createStore);

//se crea el reducer para esta instancia
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

// creando el estado inicial
//TODO llenarlo
const initialState = {};
//Creando el store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

//exportando nuestro store
export default store;
