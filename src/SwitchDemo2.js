import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import SearchList from './searchList';
import FacetedSearchContainer from './FacetedSearchContainer'
import PropTypes from 'prop-types';
import URI from 'urijs';
import FetchLoader from './FetchLoader.js'
import createHistory from "history/createBrowserHistory"
import queryString from 'query-string'

const history = createHistory();

const About = () =>(
	<div> aboutpage</div>
);

const values = queryString.parse(history.location.search);

const SwitchDemo2 = ({value,todos}) => (
	<div>
		<Switch>
			<Route exact path ={`/gxa/sc/search?symbol=${value}`} render={props => (<FetchLoader {...props} host="/gxa/sc/search" resource={value}/>)}/>
			<Route exact path="" search="about" component={About}/>
		</Switch>

	</div>
);

export default withRouter(SwitchDemo2)