import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import htmlReducer from './reducers/htmlReducer';
import kysymysReducer from './reducers/kysymysReducer';
import kysymyksetReducer from './reducers/kysymyksetReducer';
import notifyReducer from './reducers/notifyReducer';
import userReducer from './reducers/userReducer';
import kayttajaReducer from './reducers/kayttajaReducer';
import kategoriatReducer from './reducers/kategoriatReducer';
import edustajaReducer from './reducers/edustajaReducer'
import ylenKysymyksetReducer from './reducers/ylenKysymyksetReducer'
import yle2019Reducer from './reducers/yle2019Reducer'


const reducer = combineReducers({
  html: htmlReducer,
  kysymys: kysymysReducer,
  notify: notifyReducer,
  kysymykset: kysymyksetReducer,
  user: userReducer,
  kayttaja: kayttajaReducer,
  kategoriat: kategoriatReducer,
  edustaja: edustajaReducer,
  ylenKysymykset: ylenKysymyksetReducer,
  yle2019: yle2019Reducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk),
)

export default store;

