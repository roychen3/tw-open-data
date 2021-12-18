import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './assets/css/style.scss'
import App from './App'
import initStore from './redux/store'

const store = initStore()

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>
  , document.getElementById('root')
)
