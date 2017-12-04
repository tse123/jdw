import React,{Component} from "react";
import {Link} from "react-router";
//import axios from "axios";
import Goods from "./Goods";
import Info from "./Info";
import Judge from "./Judge";
class Detail extends Component{
	constructor(props){
		super(props)
		this.state={
            value:1,
            currentIndex:1
		}
	}
	onChange(val){
		console.log(val);
	}
	tabCli(num){
		this.setState({
			currentIndex:num
		})
	}
	componentDidMount(){
		
		console.log(this.props.location.query.id);
		
	}
	render(){
		var that=this;
		return (
			<div className="detailWrap">
				<div className="detailTop">
					<div className="topLeft"><i className="iconfont">&#xe60d;</i></div>
					<ul className="topList">
						<li className={this.state.currentIndex===1?"active":""} onClick={this.tabCli.bind(that,1)}>商品</li>
						<li className={this.state.currentIndex===2?"active":""} onClick={this.tabCli.bind(that,2)}>详情</li>
						<li className={this.state.currentIndex===3?"active":""} onClick={this.tabCli.bind(that,3)}>评价</li>
					</ul>
					<div className="toHome"><Link  to="/"><i className="iconfont">&#xe62a;</i></Link></div>
				</div>
				<div className="detailCenter">
					<div style={{"display":this.state.currentIndex===1?"block":"none","height":"100%"}}><Goods id={this.props.location.query.id}></Goods></div>
					<div style={{"display":this.state.currentIndex===2?"block":"none","height":"100%"}}><Info id={this.props.location.query.id}></Info></div>
					<div style={{"display":this.state.currentIndex===3?"block":"none","height":"100%"}}><Judge id={this.props.location.query.id}></Judge></div>
				</div>
				<div className="detailBottom">
					<div className="shopCar"><i className="iconfont">&#xe6c9;</i>购物车</div>
					<div className="collect"><i className="iconfont">&#xe630;</i>收藏</div>
					<div className="joinShopcar">加入购物车</div>
					<div className="buyNow">立即购买</div>
				</div>
			</div>
		)
	}
}
export default Detail;