import React, { Component } from 'react';
import './App.css';
import SearchForm from './searchForm';
import {Link,Switch, Route, withRouter} from 'react-router-dom';
import SwitchDemo from './SwitchDemo';
import { Button } from 'evergreen-ui';
import PropTypes from 'prop-types';

const URL = 'http://localhost:8080/gxa/sc/json/search';

class App extends Component {
  Console.log(123);
  constructor(props){
    super(props)
    this.state = {
      value: '',
      todos:[]     
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(val){
    // await this.setState({
    //   value : val
    // });
    console.log(URL+'?symbol='+val);
    await fetch(URL+'?symbol='+val)
      .then(data => data.json())
      .then(todos =>{
        this.setState({
          value:val,
          todos:todos.results
        })})
    console.log(this.state)
    
    this.props.history.push({
      pathname: '/gxa/sc/search',
      search: 'symbol='+val
    })    
  }

  componentWillMount(){
   fetch(URL+this.props.history.location.search)
      .then(data => data.json())
      .then(todos =>{
        this.setState({
          value:this.props.history.location.search,
          todos:todos.results
        })})
    console.log(this.state)
  }

  componentDidMount(){
    console.log('host:',this.props)
  }



  render() {
    
    return (     
      <div className="App">
        <SearchForm handleSubmit={this.handleSubmit}/> 
        <SwitchDemo value={this.state.value} todos = {this.state.todos}/>
      </div>
    );
  }
}

export default withRouter(App);
