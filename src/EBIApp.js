import React, { Component } from 'react';
import './App.css';
import SearchForm from './searchForm';
import {Link,Switch, Route, withRouter} from 'react-router-dom';
import SwitchDemo2 from './SwitchDemo2';
import { Button } from 'evergreen-ui';
import queryString from 'query-string';
import createHistory from "history/createBrowserHistory"

const history = createHistory();
const URL = 'http://localhost:8080/gxa/sc/json/search';
const values = queryString.parse(history.location.search);


class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      value: ''     
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(val){
    await this.setState({
      value : val
    });
    // console.log(URL+'?symbol='+val);
    // await fetch(URL+'?symbol='+val)
    //   .then(data => data.json())
    //   .then(todos =>{
    //     this.setState({
    //       value:val,



    //       todos:todos.results
    //     })})
    console.log(this.state)
    
    this.props.history.push({
      pathname: '/gxa/sc/search?symbol='+val,
      //search: 'symbol='+val
    })    
  }

  // componentWillMount(){
  //  fetch(URL+this.props.history.location.search)
  //     .then(data => data.json())
  //     .then(todos =>{
  //       this.setState({
  //         value:this.props.history.location.search,
  //         todos:todos.results
  //       })})
  //   console.log(this.state)
  // }

  
  
componentWillMount() {
  const values = queryString.parse(this.props.location.search)
  console.log(values.symbol) // "top"
  //console.log(values.origin) // "im"
  this.setState({
    value:values.symbol
  })
  if(values.symbol){
    this.props.history.push({
        pathname: '/gxa/sc/search?symbol='+values.symbol,
        //search: 'symbol='+val
    })   
  }
}

  render() {
    console.log(this.state.value)
    return (     
      <div className="App">
        <SearchForm handleSubmit={this.handleSubmit}/> 
        <SwitchDemo2 value={this.state.value} />
      </div>
    );
  }
}

export default withRouter(App);
