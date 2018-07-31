import React from 'react'
import {Link,Switch, Route, withRouter} from 'react-router-dom';

class SearchForm extends React.Component{
	constructor(props) {
	    super(props)

	    this.state = {
	      inputValue: '',
	      loading: true,
	      error: null
	    }
	    this.handleChange = this.handleChange.bind(this);
	    this.changeHistory = this.changeHistory.bind(this);
	}


	handleChange(e){
		this.setState({
			inputValue: e.target.value
		});
		
	}

	changeHistory(){
		
		//this.props.history.push("/"+this.state.inputValue);

		this.props.handleSubmit(this.state.inputValue);

	}
	

	render(){

		return(
			<div>

				<input type='text' value={this.state.inputValue} onChange = {this.handleChange}/>
				<button  onClick = {this.changeHistory}> explore </button>
			
			</div>
		)
		
	}
	
}

export default withRouter(SearchForm)