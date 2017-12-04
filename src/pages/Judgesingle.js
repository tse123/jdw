import React,{Component} from "react";
import Rating from 'yo3/component/rating';
class Judegsingle extends Component{
	constructor(props){
		super(props)
		this.state={
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
//		console.log(this.props.judgearr)
	}
	render(){
		return(
			<ul className="info3List">
				{
					this.props.judgearr.map((value,index)=>{
						return (
							<li className="info3Li" key={"judgearr"+index}>
						        <div className="info3liTop"><p className="p1"><span>{value.UserName}</span><span>{value.LevelName}</span></p><p className="p2">{value.CreateTime.slice(0,10)}</p></div>
						        <Rating
						           	extraClass="yo-rating-star"
									value={value.Star}
									readonly={true}
								/>
						        <p className="pInfo">{value.Content}</p>
						        <div className="imgBox">
						        	{  	
						        		value.pro_productuserCommentpic===undefined?
						        		console.log(1):(value.pro_productuserCommentpic.length==0)?console.log(2):
						        		value.pro_productuserCommentpic.map((val,ind)=>{
						        			return (
						        				<div key={"productuserCommentpic"+ind}>
						        					<img src={"/img/Show/"+val.Pic} alt="" />
						        				</div>
						        			)
						        		})
						
						        	}
						        </div>
						    </li>
						)
					})
				}
			    
			    
			</ul>
		)
		
	}
}
export default Judegsingle;