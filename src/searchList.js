import React from 'react'

// class SearchList extends React.Component{
// 	constructor(props){
//     super(props)
//     this.state = {
//       value: ''     
//     }
//  	}

// 	render(){
// 		//
// 		return(
// 			<div>
// 			{liresopnose}
// 			</div>
// 		)
// 	}

// }


const SearchList = ({todos}) => (
	<div>
		<ul>
			{todos.map(e => (<li>{e.element.longDescription}</li>))}
		</ul>
	</div>
);


export default SearchList