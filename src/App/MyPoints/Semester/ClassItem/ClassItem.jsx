import React from 'react'
import './ClassItem.css'

export default function ClassItem(props) {
  const selectRef = React.createRef()
  return (
    <li className="class-list-item">
      <span className="class-name">{props.name}</span>
      <span className="class-credits">{props.credits}</span>
      <span className="class-grades">
        <select
          ref={selectRef}
          onChange={() => props.setGrades(props.name, selectRef.current.value)}
          value={props.grades}>
          {props.gradesList.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
      </span>
      <span className="class-points">{props.points}</span>
      <span className="class-checked">
        <input type="checkbox"
          credits={props.credits}
          points={props.points}
          onChange={() => (props.checkClassItem(props.name))} 
          checked={props.checked}/>
      </span>
    </li>
  )
}