import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Router, Route, hashHistory } from 'react-router-dom'
import store from './store'

import Home from "./pages/home"

ReactDOM.render((
	<Provider store={store}>
		<HashRouter>
			<div>
				<Route exact path="/" component={Home} />
			</div>
		</HashRouter>
	</Provider>
), document.getElementById('root'))

if (module.hot) {
	module.hot.accept()
}