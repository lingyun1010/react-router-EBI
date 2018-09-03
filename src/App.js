// eslint-disable-next-line
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import SwitchRoute from './SwitchRoute';
import queryString from 'query-string';
import GeneSearchForm from 'scxa-gene-search-form'
import ExperimentCard from './ExperimentCard';
import uri from 'urijs'
import _ from 'lodash'

const formprops = {
      atlasUrl: 'http://localhost:8080/gxa/sc/',
      wrapperClassName: 'row',
      actionEndpoint: 'search',
      suggesterEndpoint: 'json/suggestions/gene_ids',
      autocompleteClassName: 'small-8 columns',
      enableSpeciesSelect: true ,
      enableSubmitButton: false,
      speciesEndpoint: 'json/suggestions/species',
      speciesSelectClassName: 'small-4 columns',
      defaultSpecies: 'Any',
      selectedSpecies:'',
      allSpecies: ["Homo sapiens", "Mus musculus"],
      defaultValue: {
        term: 'test',
        category: 'bar'
      },
      speciesSelectStatusMessage:''
    };


class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      value: '' ,
      species: '',
      category: '',
      routepath: `test`,
      nextSelectedFacets: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.speciesSelectOnChange = this._speciesSelectOnChange.bind(this)
    this.handleSelections = this.handleSelections.bind(this)
  }

  async handleSubmit(val){
    await this.setState({
      value : val.term,
      category: val.category,
      routepath : `test`
    });

    if(this.state.species===undefined){
     await this.setState({
        species: ''
      })
    }
   
    this.props.history.push({
      pathname: `/gxa/sc/search?${val.category}=${this.state.value}&species=${this.state.species}`,
    })
    
  }


  _speciesSelectOnChange(event) {
    //event.persist();
    this.setState({ 
      species: event.target.value.replace(' ','+'),
      routepath : `test`
    });

    this.props.history.push({
        pathname:  `/gxa/sc/search?${this.state.category}=${this.state.value}&species=${event.target.value.replace(' ','+')}`
    })
  }

  handleSelections(routepath, nextSelectedFacets){
    const host = new uri(this.props.history.location.pathname);

    const queryURL = host.query(routepath).addQuery(this.state.category,this.state.value).addQuery('species',this.state.species).toString()
    
    this.setState({
      routepath: queryURL,
      nextSelectedFacets: nextSelectedFacets
    });
    this.props.history.push({
      pathname: queryURL
    })
  }


  componentWillMount() {
    const values = queryString.parse(this.props.location.search);
    let category =Object.keys(values).filter(val => val==='symbol'||val==='q'||val==='mgi_symbol'||val==='hgnc_symbol')[0];
    let value = values[category];
    //Object.values(values).forEach(val=>typeof val=== `string` ? [val]:val);
    
    this.setState({
      category: category,
      species: values.species?values.species.replace(' ','+'):'',
      value: value,
      routepath: _.isEmpty(values)?`test`:this.props.history.location.pathname+this.props.history.location.search.replace(`%20`,` `),
      
      nextSelectedFacets: 
      {
            "Inferred cell type" : values.inferredcelltype?
                                typeof values.inferredcelltype === `string` ? 
                                 [{
                                  group: "Inferred cell type",

                                  label: values.inferredcelltype.split().map(value=>value.charAt(0).toUpperCase()+ value.replace(/-/g,' ').substr(1)),

                                  value: values.inferredcelltype.split().map(value=>value.replace(/-/g,' '))[0],
                                  disabled : false
                                }] :
                                values.inferredcelltype.map(
                                  val=>{
                                    return {group: "Inferred cell type",
                                  label: val.charAt(0).toUpperCase()+ val.replace(/-/g,' ').substr(1),
                                  value: val.replace(/-/g,' '),
                                  disabled : false}
                                  
                                }
                                  )
                                 
                              :[],

            "Marker genes" : values.markergenes?[{
              group: "Marker genes",
              label: values.markergenes.split().map(value=>value.charAt(0).toUpperCase()+ value.replace(/-/g,' ').substr(1)),
              value: values.markergenes.split().map(value=>value.replace(/-/g,' '))[0],
              disabled : false
            }]:[],

            "Organism part" : values.organismpart?
                                typeof values.organismpart === `string` ? 
                                 [{
                                  group: "Organism part",

                                  label: values.organismpart.split().map(value=>value.charAt(0).toUpperCase()+ value.replace(/-/g,' ').substr(1)),

                                  value: values.organismpart.split().map(value=>value.replace(/-/g,' '))[0],
                                  disabled : false
                                }] :
                               values.organismpart.map(
                                  val=>{
                                  return {group: "Organism part",
                                  label: val.charAt(0).toUpperCase()+ val.replace(/-/g,' ').substr(1),
                                  value: val.replace(/-/g,' '),
                                  disabled : false}
                                }
                                  )

                              :[],

            "Species" : values.selectedspecies?
                                typeof values.selectedspecies === `string` ? 
                                 [{
                                  group: "Species",

                                  label: values.selectedspecies.split().map(value=>value.charAt(0).toUpperCase()+ value.replace(/-/g,' ').substr(1)),

                                  value: values.selectedspecies.split().map(value=>value.replace(/-/g,' '))[0],
                                  disabled : false
                                }] :
                               values.selectedspecies.map(
                                  val=>{
                                  return {group: "Species",

                                  label: val.charAt(0).toUpperCase()+ val.replace(/-/g,' ').substr(1),

                                  value: val.replace(/-/g,' '),
                                  disabled : false}
                                }
                                  )

                              :[]
          } 
     
    },()=>console.log(`nextSelectedFacets-top`,this.state.nextSelectedFacets))

    if(Object.keys(values)[1]){
      this.props.history.push({
          pathname: this.props.history.location.pathname+this.props.history.location.search.replace(`%20`,` `)
      })
    }
    console.log(`keys`,Object.keys(values));
    console.log(`values`,Object.values(values));
    

  }

  render() {

    console.log(`routepath2`,this.state.routepath);
    return (     
      <div className="App">
        <div className={formprops.wrapperClassName}>
            <GeneSearchForm {...formprops} currentValue ={this.state.value} currentSpecies={this.state.species?this.state.species.replace('+',' '):this.state.species}
             onChange={this.handleSubmit} speciesSelectOnChange={this.speciesSelectOnChange}/>
        </div>
        
        <SwitchRoute nextSelectedFacets={this.state.nextSelectedFacets} routepath={this.state.routepath} handleSelections={this.handleSelections} 
        ResultElementClass={ExperimentCard} value={this.state.value} species={this.state.species} category={this.state.category}/>
      </div>
    );
  }
}

export default withRouter(App);
