import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import Search from './components/Search'
import Food from './components/Food'
import store from './store'

render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Route exact path='/' component={Search} />
        <Route path='/food/:ndbno' component={Food} />
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
