/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from 'routes/home'
import Login from 'routes/login'
import Register from 'routes/register'

import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  credentials: 'include',
  fetchOptions: {
    credentials: 'include'
  }
})
const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
    </Router>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
