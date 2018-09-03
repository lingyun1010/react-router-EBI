import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import FetchLoader from "react-faceted-search";

const About = () =>(
	<div> Home Page</div>
);


const SwitchRoute = ({value,species,category,ResultElementClass,handleSelections,routepath, nextSelectedFacets}) => (
	<div>
		<Switch>
			<Route exact path ={`/gxa/sc/search?geneID=${value}&species=${species}`} 
			render={props => (<FetchLoader {...props} nextSelectedFacets={{}} handleSelections={handleSelections} ResultElementClass={ResultElementClass} 
			host="http://localhost:8080/gxa/sc/json/search?ensgene=" resource={value} species={species?species.replace('+',' '):species}/>)}/>

			<Route exact path ={`/gxa/sc/search?${category}=${value}&species=${species}`} 
			render={props => (<FetchLoader {...props} nextSelectedFacets={{}} handleSelections={handleSelections} ResultElementClass={ResultElementClass} 
			host={`http://localhost:8080/gxa/sc/json/search?${category}=${value}&species=${species}`} resource={''} species={species?species.replace('+',' '):species}/>)}/>
			
			<Route exact path={routepath} render={props => (<FetchLoader {...props} nextSelectedFacets={nextSelectedFacets} handleSelections={handleSelections} ResultElementClass={ResultElementClass} 
			host={`http://localhost:8080/gxa/sc/json/search?${category}=${value}&species=${species}`} resource={''} species={species?species.replace('+',' '):species}/>)}/>

			<Route exact path="" component={About}/>

		</Switch>

	</div>
);

export default withRouter(SwitchRoute)