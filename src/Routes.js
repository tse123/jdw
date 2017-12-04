import React,{Component} from "react";
import {Router, Route,  IndexRedirect,  hashHistory} from 'react-router';

import Index from "./pages/Index";
import Classify from "./pages/Classify";
import Shopcar from "./pages/Shopcar";
import Personal from "./pages/Personal";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Page404 from "./pages/Page404";

class Routes extends Component{
	render(){
		return (
			<Router history={hashHistory}>
				<Route path="/" component={Index}>
					<IndexRedirect to="/main"></IndexRedirect>
					<Route path="main" component={Main}></Route>
					<Route path="/classify" component={Classify}></Route>
				</Route>
				<Route path="/detail" component={Detail}></Route>
				<Route path="/shopcar" component={Shopcar}></Route>
				<Route path="/personal" component={Personal}></Route>
				<Route path="*" component={Page404}></Route>
			</Router>
		)
	}
}
export default Routes;
