import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import SearchList from './searchList';


const About = () =>(
	<div> aboutpage</div>
);


const SwitchDemo = ({value,todos}) => (
	<div>
		<Switch>
			<Route exact path ="/gxa/sc/search" search = {value} render={props => (<SearchList {...props} todos={todos}/>)}/>
			<Route exact path="/about" component={About}/>
		</Switch>

	</div>
);

export default withRouter(SwitchDemo)