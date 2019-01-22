import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { batchedSubscribe } from 'redux-batched-subscribe';
import thunk from 'redux-thunk';

import reducer from './reducers';
import initState from "./initState";


const logger = createLogger({
  collapsed: true,
});

export default (cookies) => {

  const middleWares = [
    thunk,
  ];

  const enhancers = [
    // batchedSubscribe((notify: any) => {
    //   notify();
    // })
  ];


  if (__DEVELOPMENT__ && __CLIENT__) {
    middleWares.push(logger);
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const enhancer = compose(
    applyMiddleware(...middleWares),
    ...enhancers,
  )

  const initialState = __CLIENT__ ? window.__INITIAL_STATE__ : initState(cookies);
  if (!__SERVER__) {
    delete window.__INITIAL_STATE__;
  }
  return createStore(reducer, initialState, enhancer);
}
