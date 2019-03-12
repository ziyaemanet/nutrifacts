import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuid from 'uuid/v4'

import * as ApiActions from '../actions/ApiActions'

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      page: 0,
    };

    this.onInputChange = this.onInputChange.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.newSearch = this.newSearch.bind(this)
    this.enterKeyDown = this.enterKeyDown.bind(this)
  }

  componentWillUnmount() {
    this.props.clearResults();
  }

  onInputChange(e) {
    this.setState({
      query: e.target.value
    })
  }

  newSearch() {
    const { query } = this.state
    const { search } = this.props

    this.setState({
      page: 0
    })

    search(query, 0)
  }

  enterKeyDown(e){
      if(e.keyCode == 13){
         this.newSearch()
      }
   }

  nextPage() {
    const { query, page } = this.state
    const { search, results } = this.props
    const maxPage = Math.ceil(results.list.total / 50) - 1
    const newPage = page < maxPage ? page + 1 : page

    if(newPage != page){
      search(query, newPage)
      this.setState({
        page: newPage
      })
    }
  }

  previousPage() {
    const { query, page } = this.state
    const newPage = page ? page - 1 : page
    const { search } = this.props

    if(newPage != page){
      search(query, newPage)
      this.setState({
        page: newPage
      })
    }
  }

  render() {
    const { query, page } = this.state;
    const { results, search } = this.props;
    const hasResults = results && !results.errors

    return (
      <div className='main'>
        <div className='main-title'>
          <div className='main-title-text'>Search for Food:</div>
          <input
            type='text'
            placeholder='enter search keywords...'
            onChange={this.onInputChange}
            onKeyDown={this.enterKeyDown}
            value={query}
            id ='search-input'
          />
        </div>
        <div className='thick-spacer' />
        <div id='main-search-results'>
          { hasResults ?
              <div id='results-header-wrapper'>
                <div id='results-text' className='main-title-text'>Results</div>
                <div className='half-thick-spacer'/>
                <div id='main-search-result-header' className='main-search-result'>
                  <div className='main-search-result-name-header'>Name</div>
                  <div className='main-search-result-group-header'>Food Group/Manufacturer</div>
                </div>
                <div className='thin-spacer'/>
              </div>
            :
              <div/>
          }
          { hasResults ?
              results.list.item.map(item => (
                <Link key={uuid()} className='search-results-link link-styling' to={`food/${item.ndbno}`}>
                  <div className='main-search-result'>
                    <div className='main-search-result-name'>
                      {item.name.length > 30 ? item.name.slice(0,30) + '...' : item.name}
                    </div>
                    <div className='main-search-result-group'>
                      {item.manu === 'none' ? item.group : item.manu}
                    </div>
                  </div>
                </Link>
              ))
            :
              <div id='search-placeholder'>Please search for a food above!</div>
          }
          { hasResults ?
              <div id='results-page-controls-wrapper'>
                <div className='thin-spacer'/>
                <div id='results-page-controls'>
                  <button className='results-page-btn link-styling' onClick={this.previousPage}>Prev</button>
                  <div id='results-page-number'>Page {page + 1}</div>
                  <button className='results-page-btn link-styling' onClick={this.nextPage}>Next</button>
                </div>
                <div className='thin-spacer'/>
              </div>
            :
              <div/>
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({ results: state.results}),
  dispatch => ({
    search(query, page) { dispatch(ApiActions.search(query, page)) },
    clearResults() { dispatch(ApiActions.clearResults()) },
  })
)(Search)
