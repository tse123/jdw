import React,{Component} from "react";
import Search from "./Search";
import axios from "axios";
import Carousel from 'yo3/component/carousel';
import CarouselItem from "yo3/component/carousel/src/carouselItem";
import Goodslist from "./Goodslist";
import { loading } from 'yo3/component/loading';
class Main extends Component{
	constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            swiperimg:[{img: "http://img0.gjw.com/appimage/201711/24/201711241703183785.jpg"}],
            menuList:[],
            killProList:[],
            lasttime:"00:00:00",
            scareList:[]
        };
   }
	componentWillMount(){
		loading.show();
	}
	componentDidMount(){
//		轮播图
		axios.get("/tse/SER/GetBanner?type=0&index=1")
		.then((res)=>{
			var info=JSON.parse(res.data.info);
			var arr=[];
			for(var i=0;i<info.length;i++){
				var obj={};
				obj.img="/img/"+info[i].pic;
				arr.push(obj);
			}
			this.setState({
				swiperimg:arr
			})
		})
//		轮播图下的menu菜单
		axios.get("/tse/SER/GetZhuanTi?type=0&index=1")
		.then((res)=>{
			var arr=[];
			for(var i=0;i<JSON.parse(res.data.info).length;i++){
				var obj={};
				obj.url="/img/"+JSON.parse(res.data.info)[i].pic;
				obj.typename=JSON.parse(res.data.info)[i].typename;
				arr.push(obj);
			}
			this.setState({
				menuList:arr
			})
		})
//		倒计时
		var that=this;
		function getLasttime(){
			var alltime = new Date("December 10, 2017 00:00:00").getTime();
			var nowtime=new Date().getTime();
			var lasttime=alltime-nowtime;
			var days=Math.floor(lasttime/1000/60/60/24);
			var hours=Math.floor((lasttime-days*1000*24*3600)/1000/3600)<10?"0"+Math.floor((lasttime-days*1000*24*3600)/1000/3600):Math.floor((lasttime-days*1000*24*3600)/1000/3600);
			var minutes=Math.floor((lasttime-days*1000*24*3600-hours*1000*3600)/(1000*60))<10?"0"+Math.floor((lasttime-days*1000*24*3600-hours*1000*3600)/(1000*60)):Math.floor((lasttime-days*1000*24*3600-hours*1000*3600)/(1000*60));
			var second=Math.floor((lasttime/(1000))%60)<10?"0"+Math.floor((lasttime/(1000))%60):Math.floor((lasttime/(1000))%60);
			that.setState({
				lasttime:hours+":"+minutes+":"+second
			})
		}
		setInterval(function(){
			getLasttime();
		},1000)
//		倒计时抢购区
		axios.get("/tse/SER/GetSeckill?type=0&index=1")
		.then((res)=>{
			this.setState({
				scareList:JSON.parse(res.data.info)
			})
		})
		//		酒列表菜单
		axios.get("/tse/SER/GetHot?_index=1")
		.then((res)=>{
			loading.hide()
			this.setState({
				killProList:JSON.parse(res.data.info)
			})
		})
	}
	render(){
		return (
			<div>
				<Search></Search>
			{/*轮播图*/}
				<Carousel
					extraClass={"swiperWrap"}
	                afterChange={(page) => {
	                    this.setState({
	                        currentPage: page
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
	            {/*menu菜单*/}
	            <ul className="menuList">
	            	{
	            		this.state.menuList.map((value,index)=>{
	            			return(
	            				<li key={"menulist"+index}>
				            		<img src={value.url} alt="" />
				            		<p>{value.typename}</p>
				            	</li>
	            			)
	            		})
	            	}
	            </ul>
	              
				{/*手机秒杀块*/}
	            <div className="infoTip">
	            	<p>手机秒杀</p>
	            	<p>距结束:<span>{this.state.lasttime}</span></p>
	            	<p>更多>></p>
	            </div>
				{/*----------手机抢购区-----------*/}	        	
	            <div className="scareBuy">
	            	<ul className="scareList">
	            		{
	            			this.state.scareList.map((value,index)=>{
	            				return (
		            				<li key={"scareList"+index}>
				            			<img src={"/img"+value.图片路径} alt="" />
				            			<p className="p1" >{value.品名}</p>
				            			<p className="p2" style={{color:"red"}}>¥{value.本站价}</p>
				            			<p className="p3">¥{value.市场价}</p>
				            		</li>
		            			)
	            			})
	            			
	            		}
	            	</ul>
	            </div>
{	       /* ----白酒馆------*/       }
				<div className="whitePub">
					<img className="whiteImg" alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20161019/6361249866052549657675052.jpg" />
					<ul className="whiteList">
						<li>
							<img alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20170420/6362831642082971791772064.jpg" />
							<p>天佑德会场</p>
						</li>
						<li>
							<img alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20170420/6362831642076731787258739.jpg" />
							<p>茅台品牌会场</p>
						</li>
						<li>
							<img alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20170420/6362831642090771808514635.jpg" />
							<p>五粮液会场</p>
						</li>
					</ul>
				</div>
			{/*海报图片*/}
				<div className="poster">
					<div className="posterTop"><img alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20170811/6363804161836972227123202.jpg" /></div>
					<ul className="posterList">
						<li><img alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20170421/6362838215441557281957970.jpg" /></li>
						<li><img alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20170421/6362838215432197275687982.jpg" /></li>
						<li><img alt="" src="http://img6.zhongjiu.cn/resourceb2b2c/Storage/template/0/20170421/6362838215450917302929786.jpg" /></li>
					</ul>
				</div>
				{/*	------------酒列表开始，引入组件自己开发的组件----------------*/}
				<Goodslist
					killProList={this.state.killProList}
				></Goodslist>
				{/*	------------酒列表结束----------------*/}
				
			</div>
		)
	}
}
export default Main;
