import React,{Component} from "react";
import axios from "axios";
class Info extends Component{
	constructor(props){
		super(props)
		this.state={
			ht:""
		}
	}
	componentDidMount(){
		console.log(this.props.id);
		axios.get("/tse/SER/GetkillGoods?user_id=&bh="+this.props.id)
		.then((res)=>{
			console.log(res);
			var str=JSON.parse(res.data.info)[0].商品详情;
			this.setState({
				ht:str
			})
			
		})
	}
	render(){
		return(
			<div className="infoWrap" dangerouslySetInnerHTML={{__html:this.state.ht}}></div>
		)
	}
}
export default Info;
