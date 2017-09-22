//引入react,react-dom
import React, { Component } from 'react';
import { render } from 'react-dom';

// 引入React-Router模块
import { HashRouter, Router, Route, hashHistory, Link } from 'react-router-dom'

//引入自定义组件
import Home from "./pages/home";
import Login from "./pages/login";

// 配置路由
render((
	<HashRouter>
		<div>
			<ul>
				<li><Link to='/'>Home Page</Link></li>
				<li><Link to='/login'>Login Page</Link></li>
			</ul>
			<Route exact path="/" component={Home} />
			<Route path="/login" component={Login} />
		</div>
	</HashRouter>
), document.getElementById('root'));