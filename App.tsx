import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from '../ZeroWasteAlleyApp/src/redux/reducer'

const store = createStore(reducer)

const App: () => React.ReactElement = () => <Provider store={store}></Provider>

export default App
