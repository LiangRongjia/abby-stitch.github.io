import React from 'react'
import './ClassItem.css'

export default function ClassItem({
  name,
  credits,
  grades,
  points,
  checked,
  gradesList,
  setGrades,
  checkClassItem
}: {
  name: string,
  credits: number,
  grades: string,
  points: number,
  checked: boolean,
  gradesList: string[],
  setGrades: (name: string, newGrades: string) => void,
  checkClassItem: (name: string) => void

}) {
  const selectRef = React.createRef<HTMLSelectElement>()
  return (
    <li className="class-list-item">
      <span className="class-name">{name}</span>
      <span className="class-credits">{credits}</span>
      <span className="class-grades">
        <select
          ref={selectRef}
          onChange={() => selectRef.current && setGrades(name, selectRef.current.value)}
          value={grades}>
          {
            gradesList.map(item =>
              <option key={item} value={item}>{item}</option>
            )
          }
        </select>
      </span>
      <span className="class-points">{points}</span>
      <span className="class-checked">
        <input type="checkbox"
          onChange={() => (checkClassItem(name))}
          checked={checked} />
      </span>
    </li>
  )
}