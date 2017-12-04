import React,{Component} from "react";
import {Link} from "react-router";


class Index extends Component{
	render(){
		return (
			<div className="indexWrap">
				<section>
					{this.props.children}
				</section>
				<footer>
					<ul>
						<li>
							<Link activeClassName="active" to="/main">
								<i className="iconfont">&#xe62a;</i>
								<span>首页</span>
							</Link>
						</li>
						<li>
							<Link activeClassName="active" to="/classify">
								<i className="iconfont">&#xe614;</i>
								<span>分类</span>
							</Link>
						</li>
						<li>
							<Link activeClassName="active" to="/shopcar">
								<i className="iconfont">&#xe6c9;</i>
								<span>购物车</span>
							</Link>
						</li>
						<li>
							<Link activeClassName="active" to="/personal">
								<i className="iconfont">&#xe675;</i>
								<span>个人中心</span>
							</Link>
						</li>
					</ul>
				</footer>
			</div>
		)
	}
}
export default Index;
