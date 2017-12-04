import React,{Component} from "react";
import Search from "./Search";
import axios from "axios";
//引入模块
import Wineclassify from "./Wineclassify";
import { loading } from 'yo3/component/loading';
class Classify extends Component{
	constructor(props) {
        super(props);
        this.state={
        	tabs:[
        		{tabName:"白酒",id:1},
        		{tabName:"葡萄酒",id:2},
        		{tabName:"洋酒",id:3},
        		{tabName:"黄/养/啤",id:4},
        		{tabName:"酒具周边",id:5}
        	],
        	currentIndex:1,
        	searchWord:"白酒",
        	infoList:[],
        	thisId:1
        }
  	}
	componentDidMount(){
		loading.show();
		axios.get("/tse/SER/GetAllTypeBandAndAttr?c_no="+this.state.searchWord)
		.then((res)=>{
			this.setState({
				infoList:JSON.parse(res.data.info)
			})
			loading.hide();
		})
	}
	//tab切换
	tabChoiced(id,tabName){
		loading.show();
		this.setState({
			currentIndex:id,
			thisId:id
		})
		axios.get("/tse/SER/GetAllTypeBandAndAttr?c_no="+tabName)
		.then((res)=>{
			this.setState({
				infoList:JSON.parse(res.data.info)
			})
			loading.hide();
		})
	}
    render(){
    	var that=this;
    	var tabList=this.state.tabs.map((value,index)=>{
    		var tabStyle= value.id===this.state.currentIndex ? "subCtrl active":"subCtrl";
    		return <li key={"tabList"+index} onClick={this.tabChoiced.bind(that,value.id,value.tabName)} className={tabStyle}>{value.tabName}</li>
    	})
        return (
            <div className="classifyWrap">
            	<Search></Search>
            	<div className="classifyCenter">
            		<div className="centerLeft">
            			<ul className="subNavlist">
		            		{tabList}
		            	</ul>
            		</div>
            		<div className="centerRight">
            			<div className="subNavwrap">
		            		<div><Wineclassify infoList={this.state.infoList} thisId={this.state.thisId}></Wineclassify></div>
		            	</div>
            		</div>
            	</div>
            </div>
       )
    }
}
export default Classify;