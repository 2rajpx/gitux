import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, match } from 'react-router'
import { compose, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
// import { AppContainer } from 'react-hot-loader'

global.$config = require('./config').default
import reducers from './reducers'
import routes from './routes'
import App from './components/App/App'
import callApiMiddleware from './lib/middlewares/call-api-middleware'

function configureStore(initialState = {}) {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk, callApiMiddleware),
  ]

  // Dev tools extension enhancer
  if (window.devToolsExtension && $config.env === 'dev') {
    enhancers.push(window.devToolsExtension())
  }

  // const store = applyMiddleware(callApiMiddleware)(createStore)(reducers, initialState, compose(...enhancers))
  const store = createStore(reducers, initialState, compose(...enhancers))

  // // For hot reloading reducers
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     const nextReducer = require('./reducers').default // eslint-disable-line global-require
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}

const mountApp = document.getElementById($config.reactWrapperId)

const store = configureStore(window.__INITIAL_STATE__)

const history = syncHistoryWithStore(browserHistory, store)

render(<App store={store} routes={routes} history={history} />, mountApp)

// render(
//   <AppContainer>
//     <App store={store} routes={routes} history={history} />
//   </AppContainer>,
//   mountApp
// )

// // For hot reloading of react components
// if (module.hot) {
//   module.hot.accept('./App', () => {
//     // If you use Webpack 2 in ES modules mode, you can
//     // use <App /> here rather than require() a <NextApp />.
//     const NextApp = require('./App').default // eslint-disable-line global-require
//     render(
//       <AppContainer>
//         <NextApp store={store} routes={routes} history={history} />
//       </AppContainer>,
//       mountApp
//     )
//   })
// }
