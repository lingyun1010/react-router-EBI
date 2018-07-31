import React from 'react'
import HighchartsHeatmap2 from './HighchartsHeatmap2'
import _ from 'lodash'
import './dropbox.css'
import {Link,Switch, Route, withRouter} from 'react-router-dom';
import SwitchHeatmap from './SwitchHeatmap';
import SwitchDemo from './SwitchDemo';

const fetchResponseJson = async (url) => {
  const response = await fetch(url)
  const responseJson = await response.json()
  return responseJson
}


class HeatmapShowcase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clusterIds: [1, 2, 3, 4, 5, 6, 7],  // Hard-coded values for E-GEOD-70580 for k = 7
      loading: false,
      geneIds: [],
      heatmapData: [],
      numberOfGeneIds: 50,
      userOption: 1,
    }

    this.userChange = this.userChange.bind(this);

  }

  _getMarkerGenesHeatmapData(expressionByGeneId, isTopMarkerGenes) {
    let heatmapData = []
    let geneIds = Object.keys(expressionByGeneId)
    if(isTopMarkerGenes) {
      geneIds = geneIds.slice(0, this.state.numberOfGeneIds)
    }

    geneIds.forEach((geneId, index) => {
      this.state.clusterIds.forEach((clusterId) => {
        if(expressionByGeneId[geneId].find((cluster) => cluster.cluster_id === clusterId)) {
          heatmapData.push({
            x: clusterId,
            y: index,
            value: expressionByGeneId[geneId].filter((cluster) => cluster.cluster_id === clusterId)[0].avg,
            name: geneId,
            marker:  expressionByGeneId[geneId].filter((cluster) => cluster.cluster_id === clusterId)[0].marker_cluster_id,
          })
        }
        else {
          heatmapData.push({
            x: clusterId,
            y: index,
            value: null,
            name: geneId,
            marker : null,
          })
        }
      })
    })

    return heatmapData
  }

  _fetchExpressionData() {
    // const url = 'https://gist.githubusercontent.com/monicajianu/5fb17d239f29d45c21788430a6c30479/raw/ded359ce3764706e0282e2220bbc2dd7692ce822/sample-expression-data-with-probabilities.json'
    const url = 'https://gist.githubusercontent.com/monicajianu/6ab94c41ae8e0689b81b363df1faca2c/raw/c571f7091fe8fb86a7937fdd8366b8a8382e836b/sample-expression-data-with-probabilities-sorted-by-cluster.json'
    this.setState({
      loading: true
    }, () => {
      fetchResponseJson(url)
        .then((responseJson) => {
          console.log(responseJson)
          const expressionByGeneId = _.groupBy(responseJson, 'gene_id')
          const expressionByGeneIdSorted = _.groupBy(responseJson.sort((a,b) => a.marker_probability - b.marker_probability), 'gene_id')

          console.log('group by cluster ID ', _.groupBy(responseJson, 'cluster_id'))
          this.setState({
            totalNumberOfGenes: Object.keys(expressionByGeneId).length,
            geneIds: Object.keys(expressionByGeneId),
            heatmapData: this._getMarkerGenesHeatmapData(expressionByGeneId, false),
            heatmapDataTopMarkers: this._getMarkerGenesHeatmapData(expressionByGeneIdSorted, true),
            loading: false,
          })
        })
        .catch((reason) => {
          console.error('Oh no', reason)
          this.setState({
            loading: false
          })
        })
    })

  }

  async userChange(val){
  	await this.setState({
  		userOption : val.target.value,
    })
    this.props.history.push("/"+this.state.userOption);
   }

  componentDidMount() {
    //window.$(document).foundation()
    this._fetchExpressionData()
    this.props.history.push("/"+this.state.userOption);
  }


  render() {
    const {clusterIds, geneIds, heatmapData, heatmapDataTopMarkers, totalNumberOfGenes, numberOfGeneIds, loading, userOption} = this.state
  	var clusterOption = [];
  	clusterIds.forEach(id => {
  	  clusterOption.push(heatmapData.filter(point => point.marker === id));
  	});
  	let chartHeight = Math.min(900,clusterOption[userOption-1].length+500);
    

    return (
      <div className="row">
        <div className="sections large-9 columns">
          <h2>Prototype visualisations for <a href={'https://www.ebi.ac.uk/gxa/sc/experiments/E-GEOD-70580/Results'}> E-GEOD-70580 </a> for k = 7 </h2>

  	      <div className='dropbox'> 
  	       <div className="section">
  	      	<h4>Cluster marker genes by p-value</h4> 
  	      	</div>
  	      	<div className="section">
  	         <select className="custom-select" onChange = {this.userChange} width='300px' fontSize='50px'>
  				    {this.state.clusterIds.map(id => (<option key={id} value={id}>Cluster {id}</option>))}
  			     </select>
  			    </div>
  		     </div>
            <SwitchHeatmap clusterIds={clusterIds} geneIds={geneIds} heatmapData={clusterOption[userOption-1]} userOption={userOption} loading={loading} chartHeight={chartHeight} isLarge={true}/>

        </div>
      </div>
    )
  }
}


export default withRouter(HeatmapShowcase)

