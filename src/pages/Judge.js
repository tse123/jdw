import React,{Component} from "react";
import Judgesingle from "./Judgesingle";
import axios from "axios";
class Judge extends Component{
	constructor(props){
		super(props)
		this.state={
			currentIndex:1,
			judgearr:[
            	{
            		UserName:"",
            		LevelName:"",
            		CreateTime:"",
            		Star:1,
            		Content:""
            	}
            ],
            all_num:"",
            general_num:"",
            satisfied_num:"",
            sunnum:"",
            unsatisfied_num:""
		}
	}
	getIndex(){
		console.log(this.state.currentIndex)
		axios.get("/tse/SeR/GetGoodsCommentByorder?current_page=1&page_size=10&spid="+this.props.id+"&type="+this.state.currentIndex)
		.then((res)=>{
			this.setState({
				judgearr:res.data.data
			})
		})
	}
	liClick(index,val){
//		console.log(index)
		this.setState({
			currentIndex:index
		},this.getIndex)
		
	}
	componentDidMount(){
		axios.get("/tse/SeR/GetGoodsCommentByorder?current_page=1&page_size=10&type=1&spid="+this.props.id)
		.then((res)=>{
//			console.log(res.data.data)
			this.setState({
				judgearr:res.data.data
			})
		})
		axios.get("/tse/h_user/good_comment_num?spid="+this.props.id)
		.then((res)=>{
			console.log(res.data.data[0]);
			var obj=res.data.data[0];
			this.setState({
				general_num:obj.general_num,
				satisfied_num:obj.satisfied_num,
				unsatisfied_num:obj.unsatisfied_num,
				sunnum:obj.sunnum,
				all_num:obj.general_num+obj.satisfied_num+obj.unsatisfied_num
			})
		})
	}
	render(){
		return (
			<div className="judgeWrap">
				<ul className="judgemenuList">
					<li className={this.state.currentIndex===1?"active":""} onClick={this.liClick.bind(this,1,"全部")}><span>全部</span><span>{this.state.all_num}</span></li>
					<li className={this.state.currentIndex===-1?"active":""} onClick={this.liClick.bind(this,-1,"好评")}><span>好评</span><span></span>{this.state.satisfied_num}</li>
					<li className={this.state.currentIndex===2?"active":""} onClick={this.liClick.bind(this,2,"中评")}><span>中评</span><span>{this.state.general_num}</span></li>
					<li className={this.state.currentIndex===3?"active":""} onClick={this.liClick.bind(this,3,"差评")}><span>差评</span><span>{this.state.unsatisfied_num}</span></li>
					<li className={this.state.currentIndex===-2?"active":""} onClick={this.liClick.bind(this,-2,"晒图")}><span>晒图</span><span>{this.state.sunnum}</span></li>
				</ul>
				<div className="judgeBox">
					<Judgesingle judgearr={this.state.judgearr}></Judgesingle>
				</div>
			</div>
		)
	}
}
export default Judge;