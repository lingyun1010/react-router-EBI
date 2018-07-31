import React from 'react';
import {Switch,Route,withRouter} from 'react-router-dom';
import HighchartsHeatmap2 from './HighchartsHeatmap2';


const About = () =>(
	<div> AboutPage </div>
);

const SwitchHeatmap = ({clusterIds,geneIds,heatmapData,clusterOption,userOption,loading,chartHeight,isLarge}) => (
	<div>
		<Switch>

			<Route exact path = {"/"+userOption} render={props => (<HighchartsHeatmap2 {...props} clusterIds={clusterIds} geneIds={geneIds} heatmapData={heatmapData} userOption={userOption} loading={loading} chartHeight={chartHeight} isLarge={true}/>)
													}
			/>

			<Route exact path="/" component={About}/>
		</Switch>

	</div>
);

export default SwitchHeatmap