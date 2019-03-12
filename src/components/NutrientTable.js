import React from 'react'
import uuid from 'uuid/v4'

const NutrientTable = (props) => {
  const { nutrients } = props
  const nutrientGroups = Object.keys(nutrients)
  const displayElements = []
  nutrientGroups.forEach((key) => {
    displayElements.push(
      <tr key={uuid()}>
        <td className='align-text-left bottom-border nutrient-head-black'>{key}</td>
        <td className='align-text-right bottom-border nutrient-head'>Per 100g</td>
      </tr>
    )

    nutrients[key].forEach((nutrient, index) => {
      let classNames

      if(index === nutrients[key].length-1) {
        classNames = {
          l: 'align-text-left bottom-border nutrient',
          r: 'align-text-right bottom-border nutrient',
        }
      } else {
        classNames = {
          l: 'align-text-left nutrient',
          r: 'align-text-right nutrient',
        }
      }

      displayElements.push(
        <tr key={uuid()}>
          <td className={classNames.l}>{nutrient.name}</td>
          <td className={classNames.r}>{nutrient.content}</td>
        </tr>
      )
    })
  })

  return(
    <table id='nutrient-table'>
      <tbody>
        {displayElements}
      </tbody>
    </table>
  )
}

export default NutrientTable
