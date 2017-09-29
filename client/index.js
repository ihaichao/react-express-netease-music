import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Router, Route, hashHistory } from 'react-router-dom'
import store from './store'

import Home from "./pages/home"
import Music from "./pages/music"
import Friends from "./pages/friends"
import LoginHome from "./pages/loginHome"
import Search from "./pages/search"
import Login from "./components/Login/login"
import Register from "./components/Login/register"
import Footer from "./pages/footer"
import PlayDetial from './components/Player/playDetail'

ReactDOM.render((
	<Provider store={store}>
		<HashRouter>
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/music" component={Music} />
				<Route path="/friends" component={Friends} />
				<Route path="/loginhome" component={LoginHome} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/search" component={Search} />
				<Route path="/playing" component={PlayDetial} />
				<Footer />
			</div>
		</HashRouter>
	</Provider>
), document.getElementById('root'))

if (module.hot) {
	module.hot.accept()
}