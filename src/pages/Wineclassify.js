import React,{Component} from "react";
class Wineclassify extends Component{
//	constructor(props){
//		super(props)
//	}
	render(){
		var arr=[];
		for(var key in this.props.infoList){
			var newArr=[];
			newArr.push(key);
			newArr.push(this.props.infoList[key]);
			arr.push(newArr);
		}
		var arr1=[];
		var arr2=[];
		if(arr.length>0){
			if(this.props.thisId===4){
				for(var i=0;i<arr.length;i++){
					var innerArr=[];
					innerArr.push(arr[i][0]);
					innerArr.push(arr[i][1]);
					arr1.push(innerArr);
				}
			}else if(this.props.thisId===5){
				for(var i=0;i<arr.length;i++){
					var innerArr=[];
					innerArr.push(arr[i][0].slice(0,-2));
					innerArr.push(arr[i][1]);
					arr1.push(innerArr);
				}
			}else{
				for(var i=0;i<arr.length;i++){
					if(arr[i][0].slice(-1)==="1"){
						var inner1Arr=[];
						inner1Arr.push(arr[i][0].slice(0,-2));
						inner1Arr.push(arr[i][1]);
						arr1.push(inner1Arr);
					}else{
						var inner2Arr=[];
						inner2Arr.push(arr[i][0].slice(0,-2));
						inner2Arr.push(arr[i][1]);
						arr2.push(inner2Arr);
					}
				}
			}
		}
		console.log(arr1);
		console.log(arr2);
		return(
			<div className="wineClassifywrap">
				<div className="wineTopimg"><img src="http://img0.gjw.com/appimage/201711/20/201711201711119430.jpg" /></div>
				<div className="wineBox">
					{arr1.map((value,index)=>{
						return (
							<div key={"winebox"+index}>
								<div className="winelistTip"><span>{value[0]}</span></div>
								<ul className="wineList">
									{
										value[1].map((r,i)=>{
											return (
												<li key={"wineList"+i}>
													<img src={"/img"+r.info} />
													<p>{r.name}</p>
												</li>
											)
											
										})
									}
									
								</ul>
							</div>
							
						)
					})
					}
					{
						arr2.map((value,index)=>{
							return (
								<div key={"arr2value"+index}>
									<div className="wineotherlistTip"><span>{value[0]}</span></div>
									<ul className="otherList">
										{
											value[1].map((r,i)=>{
												return (
													<li key={"otherList"+i}>{r.name}</li>
												)
											})
										}
										
									</ul>
								</div>
								
							)
						})
					}
					
				</div>
			</div>
		)
	}
	
}
export default Wineclassify;
