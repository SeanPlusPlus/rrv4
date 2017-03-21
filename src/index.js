import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { logger } from 'redux-logger'
import todoApp from './reducers'
import App from './App'
import './index.css'


const store = createStore(
  todoApp,
  applyMiddleware(logger)
)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
)

render()
