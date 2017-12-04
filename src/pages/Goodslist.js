import React,{Component} from "react";

import {Link} from "react-router";
class Goodslist extends Component{
	render(){
		return(
			<div className="salewhiteList" >
					{
						this.props.killProList.map((value,index)=>{
							return (
								<li key={""+new Date().getTime()+index}>
									<Link
										to={{ 
									        pathname:"/Detail", 
									        query:{id: value.id}
									       }}
									>
										<img src={"/img"+value.图片路径} alt=""/>
										<div className="divInfo">{value.品名}</div>
										<div className="divCli"><span>${value.本站价}</span><span><i className="iconfont">&#xe6c9;</i></span></div>
									</Link>
									
								</li>
							)
						})
					}
			</div>
		)
	}
}
export default Goodslist;