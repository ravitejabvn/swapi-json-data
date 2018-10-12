import React, { Component } from 'react';
import '../scss/table.scss';
import {connect} from 'react-redux';
import * as actions from '../actions/planetActions';

class Table extends Component {
    

    componentDidMount(){
        
    }

    render() {
        var tblHd = this.props.tableHeader && this.props.tableHeader.map((hd, index) => (
            <div key={index} className="table-head-cell">{hd}</div>
        ))

      var tblBd = this.props.tableBody && this.props.tableBody.map((bd, index) => (
        <div key={index} className="table table--4cols">
            <div className="table-cell">{bd.name}</div>
            <div className="table-cell">{bd.diameter}</div>
            <div className="table-cell">{bd.gravity}</div>
            <div className="table-cell">{bd.climate}</div>
        </div>
      ))

        return (
            <div className="table-container">
                <div className="table table--4cols">{tblHd}</div>
                {tblBd}
                {
                    this.props.tableBody.length === 0 ?
                        <div className="table table--4cols no-data">
                            <div>No data found on search params</div>
                        </div>
                    : ''
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        planetActions: function(planets){
            actions.planetActions(dispatch,planets);
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Table);
