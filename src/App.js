import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import Table from './components/table';
import Pagination from './components/pagination';
import jsonData from './json/sw_data_json.json';
import * as actions from './actions/planetActions';

class App extends Component {
  constructor(props, context){
    super(props, context)

    this.state = {
      tableHeader : [],
      tableBody : [],
      offset : 0,
      limit : 10,
      activePage: 1,
      pagingCount: 0,
      totalPlanets : 60
    }

    this.offsetChange = this.offsetChange.bind(this);
    this.searchPlanets = this.searchPlanets.bind(this);
  }

  componentDidMount(){
      var loc = window.location.href;
      
      let url = new URL(loc);
      let searchParams = new URLSearchParams(url.search);
      var offset = Number(searchParams.get('offset')) || this.state.offset;
      var limit = Number(searchParams.get('limit')) || this.state.limit;
      var page = Number(searchParams.get('page')) || this.state.activePage;

      let offsetValues = [offset, limit];
      this.props.planetActions(jsonData,offsetValues);
      this.props.getPlanets(offsetValues);
      var tblHd = Object.keys(jsonData[0]);
      this.setState({
        tableHeader: tblHd,
        pagingCount: Math.round(this.state.totalPlanets/limit),
        activePage: page
      });
  }

  componentWillReceiveProps(){
    var propsData = this.props.store.getState();
    var data = propsData.planetObj.data;
    var newUrl = propsData.planetObj.bookmarkUrl;
    window.history.pushState({}, null, newUrl);

    if(propsData.planetObj.searchType && propsData.planetObj.searchQuery){
      this.setState({
        pagingCount: -1
      })
    }

    var tblBd = data;
    this.setState({
      tableBody: tblBd
    })
  }

  offsetChange(e) {
    var pagingValue = Number(e.currentTarget.value);
    if(pagingValue > 0 && pagingValue <= 60){
      this.setState({
        offset: 0,
        limit: pagingValue,
        activePage: 1,
        pagingCount: this.state.totalPlanets / pagingValue
      },() => {
        let offsetValues = [0, pagingValue];
        this.props.getPlanets(offsetValues);
      })
    }
    
  }

  searchPlanets(){
    var selectTp = document.getElementById('selectType');
    var selectValue = document.getElementById('searchBox').value;
    var selectType = selectTp.options[selectTp.selectedIndex].value;
    if(selectType && selectValue){
      this.props.queryPlanets(selectType, selectValue);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="operations">
          <h2>JSON data operations from Star Wars planets</h2>
          <div>
            <input type="number" id="offsetNumber" maxLength="60" placeholder="Pagination Number" onChange={this.offsetChange}/>
            <span className="span-header">&nbsp; // Note: no validations added, Please change the number less than 60 to get the results</span>
          </div><br/>
            <input type="text" id="searchBox" placeholder="Search" />
            <select id="selectType">
                <option>Select Option</option>
                {
                  this.state.tableHeader.map((opt, index) => (
                    <option key={index}>{opt}</option>
                  ))
                }
            </select>
            <input type="button" id="btnSubmit" value="Search" onClick={this.searchPlanets}/>
            <span className="span-header">&nbsp; // Enter and Select the option to search </span>
        </div>
        <Table tableHeader={this.state.tableHeader} tableBody={this.state.tableBody}/>
        <Pagination activePage={this.state.activePage} offset={this.state.offset} limit={this.state.limit} pagingCount={this.state.pagingCount}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    planets : state.planets
  }
}

function mapDispatchToProps(dispatch) {
    return {
        planetActions: function(planets,offsetValues){
            actions.planetActions(dispatch,planets,offsetValues);
        },
        getPlanets: function(offsetValues){
          actions.getPlanets(dispatch, offsetValues);
        },
        queryPlanets: function(queryType, queryValue) {
          actions.queryPlanets(dispatch, queryType, queryValue)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
