import React,{Component} from "react";
import Carousel from 'yo3/component/carousel';
import CarouselItem from "yo3/component/carousel/src/carouselItem";
import { loading } from 'yo3/component/loading';
import axios from "axios";
//import $ from "jquery";
import Judgesingle from "./Judgesingle";
class Goods extends Component{
	constructor(props){
		super(props)
		this.state={
			currentPage: 1,
            swiperimg:[{img: "/images/good_load.gif"}],
            goodname:"",
            goodprice:"",
            gooddescrib:"",
            goodtip:"",
            allNum:"",
            judgeCount:"",
            judgearr:[
            	{
            		UserName:"",
            		LevelName:"",
            		CreateTime:"",
            		Star:1,
            		Content:""
            	}
            ]
		}
	}
	componentDidMount(){
		loading.show()
//		轮播图及一些图片
		axios.get("/tse/SER/GetkillGoods?user_id=&bh="+this.props.id)
		.then((res)=>{
			
			var ht=JSON.parse(res.data.info)[0].商品详情;
			
			
			let info=JSON.parse(res.data.info);
			let imgs=JSON.parse(res.data.imgs);
			let arr=[];
			for(let i=0;i<imgs.length;i++){
				let obj={};
				obj.img="/img"+imgs[i].图片路径;
				arr.push(obj);
			}
			this.setState({
				swiperimg:arr,
				goodname:info[0].品名,
				goodprice:info[0].limitprice,
				gooddescrib:info[0].描述,
				goodtip:info[0].手提袋说明,
				allNum:info[0].评论数,
				judgeCount:info[0].好评
			})
			loading.hide()
		})
//		评价信息获取
		axios.get("/tse/SeR/GetGoodsCommentByorder?current_page=1&page_size=3&type=-1&spid="+this.props.id)
		.then((res)=>{			
			console.log(res.data.data)			
			this.setState({
				judgearr:res.data.data
			})
		})
	}
	render(){
		return (
			<div>
				<div className="detailBox">
						{/*轮播图*/}
						<Carousel
							extraClass={"swiperWrap"}
			                afterChange={(page) => {
			                    this.setState({
			                        currentPage:page
			                    })
			                }}
			            >
			            {
			                this.state.swiperimg.map((item, index) => (
			                    <CarouselItem
			                        key={index + 1}
			                        {...item}
			                        lazyload
			                    />
			                ))
			            }
			            </Carousel>
			            <div className="detailInfo1">
			            	<div className="div1">{this.state.goodname}</div>
			            	<div className="div2">{this.state.gooddescrib}</div>
			            	<div className="div3"><span>${this.state.goodprice}</span><span>限时抢购</span></div>
			            	<div className="div4">
			            		<span><i className="iconfont">&#xe644;</i>正品保障</span>
			            		<span><i className="iconfont">&#xe644;</i>满百包邮</span>
			            		<span><i className="iconfont">&#xe644;</i>破损就陪</span>
			            	</div>
			            </div>
			            <div style={{"height":"0.1rem","background":"#E9E9E9"}}></div>
			            <div className="detailInfo2">
			            	<ul className="info2List">
			            		<li className="listLi">
			            			<div className="listliLeft">数量</div>
			            			<div className="divInput">
			            				
			            			</div>
			            		</li>
			            		<li className="listLi">
			            			<div className="listliLeft">送至</div>
			            			<div className="area"><span>北京市</span><span>北京市</span><span>昌平区</span></div>
			            			<div className="areaState">正常配送></div>
			            		</li>
			            		<li className="listLi"><div className="listliLeft">优惠券</div><div className="youhui">不可使用优惠券</div></li>
			            		<li className="listLi"><div className="listliLeft">提示</div><div className="tip">{this.state.goodtip}</div></li>
			            	</ul>
			            </div>
			            <div style={{"height":"0.1rem","background":"#E9E9E9"}}></div>
			            <div className="detailInfo3">
			            	<div className="info3Top"><p className="p1">商品评价<span>({this.state.allNum}人评价)</span></p><p className="p2">好评度{this.state.judgeCount}></p></div>
			            	<Judgesingle judgearr={this.state.judgearr}></Judgesingle>
			            </div>
					</div>
			</div>
		)
	}
}
export default Goods;