import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/planetActions';

class Pagination extends Component {
    constructor(props, context){
        super(props, context)

        this.state = {
            pagingCount : 6,
            activePage: 1
        }
    }

    componentDidMount(){
        
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps){
            this.setState({
                pagingCount: this.props.pagingCount !== 0 ? this.props.pagingCount : 6,
                activePage: this.props.activePage
            })
        }
    }

    changePage(e,idx){
        this.setState({activePage : idx})
        var newOffset = idx * this.props.limit;
        var offsetValues = [newOffset, this.props.limit];
        this.props.getPlanets(offsetValues);
    }

    render() {
        let page = [];
        let pagingNum = this.state.pagingCount;
        for(var v=1; v<=pagingNum; v++){
            page.push(<span key={v} className={this.state.activePage === v ? 'active' : ''} onClick={this.changePage.bind(this,'',v)}>{v}</span>);
        }

        return (
            <div className="pagination">
            {
                this.state.pagingCount !== -1 ? 
                    <div>
                        <span>Prev</span>
                        {page}
                        <span>Next</span>
                    </div>
                : <div className="no-paging">No Paging</div>
            }
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return { }
}
  
function mapDispatchToProps(dispatch) {
    return {
        getPlanets: function(offsetValues){
            actions.getPlanets(dispatch, offsetValues);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
