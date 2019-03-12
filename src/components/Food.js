import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as ApiActions from '../actions/ApiActions'
import NutrientTable from './NutrientTable'

class Food extends Component {
  constructor(props) {
    super();
    const { getFood, match } = props
    getFood(match.params.ndbno)
  }

  render() {
    const { food } = this.props
    let foodFormatted = {}

    if(food && food.count > 0) {
      const foodDetails = food.foods[0].food
      const name = foodDetails.desc.name.length > 20 ? foodDetails.desc.name.slice(0, 20) + '...' : foodDetails.desc.name
      const nutrients = {}

      foodDetails.nutrients.forEach((nutrient) => {
        const { name, unit, value, group } = nutrient
        const nutrientToPush = { name, content: value +' '+ unit,  }

        if(name === 'Energy') {
          foodFormatted = { energy: value }
        }
        else if(nutrients[group]) {
          nutrients[group].push(nutrientToPush)
        } else {
          nutrients[group] = [nutrientToPush]
        }
      })

      Object.assign(foodFormatted, { name, nutrients })
    } else {
      foodFormatted = { error: true }
    }

    return (
      <div className='main'>
        { foodFormatted.error ?
            'Loading food facts!'
          :
            <div>
              <div id='main-nutrients-head'>
                <div className='main-title'>
                  <div className='main-title-text'>{foodFormatted.name}</div>
                </div>
                <div className='thick-spacer'/>
                <div id='nutrition-facts-text' className='main-title-text'>Nutrition Facts</div>
                <div className='thin-spacer'/>
                <div id='calorie-info-wrapper'>
                  <div id='per-amount'>Amount per 100g</div>
                  <div id='calorie-info'>
                    <div id='calories-text' className='main-title-text'>Calories</div>
                    <div id='energy-amount'>{foodFormatted.energy || 'N/A'}</div>
                  </div>
                </div>
                <div className='half-thick-spacer'/>
              </div>
              <NutrientTable nutrients={foodFormatted.nutrients} />
            </div>
        }
      </div>
    )
  }
}

export default connect(
  state => ({ food: state.food }),
  dispatch => ({
    getFood(ndbno) { dispatch(ApiActions.getFood(ndbno)) },
  })
)(Food);
