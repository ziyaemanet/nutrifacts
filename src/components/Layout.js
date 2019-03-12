import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Layout extends Component {
  render() {
    return (
      <div id='wrapper-all'>
        <div id='wrapper'>
          <div id='background'></div>
          <div id='navigation'>
            <Link id='page-title-text' to='/'>Nutrifacts</Link>
            <div id='page-nav'>
              <div id='find-your-nav'>Find your...</div>
              <Link to='/' id='food-search-link' className='link-styling'>food</Link>
            </div>
          </div>
          <div id='main-wrapper'>
            <div id='main-white-box'>
              {this.props.children}
            </div>
          </div>
          <div id='pusher'/>
        </div>
        <div id='page-footer'>
          <div id='footer-spacer'/>
          <b>created by:</b><br/>
          Ziya Emanet | github.com/ziyaemanet | https://www.linkedin.com/in/ziya-emanet-338aa1120/<br/>
          <b>data source:</b><br/>
          U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA National Nutrient Database for Standard Reference, Release . Nutrient Data Laboratory Home Page, http://www.ars.usda.gov/nutrientdata
          <br/>
          U.S. Department of Agriculture, Agricultural Research Service. 20xx. USDA Branded Food Products Database . Nutrient Data Laboratory Home Page, http://ndb.nal.usda.gov
        </div>
      </div>
    )
  }
}
