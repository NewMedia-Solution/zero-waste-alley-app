import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from '../ZeroWasteAlleyApp/src/redux/reducer'
import AppBase from './src/screens/AppBase'
import thunk from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))

const App: () => React.ReactElement = () => (
  <Provider store={store}>
    <AppBase />
  </Provider>
)

export default App
