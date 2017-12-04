import React,{Component} from "react";
class Search extends Component{
	render(){
		return (
			<div className="searchWrap">
				<div className="searchInner">
					<input type="text" placeholder="搜索全部商品" />
					<i className="iconfont">&#xe686;</i>
				</div>
			</div>
		)
	}
}
export default Search;
