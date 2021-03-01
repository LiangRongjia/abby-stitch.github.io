import React from 'react'
import './Semester.css'
import ClassItem from './ClassItem/ClassItem.jsx'
/**
 * @param {{
 * key: string,
 * title: string,
 * classes: {} [],
 * gradesList: string [],
 * setGrades: function,
 * selectSemester: function,
 * onlySelectSemester: function,
 * checkClassItem: function
 * }} props 
 */
export default function Semester(props) {
  return (
    <div className="semester">
      <div className="title-bar">
        <h2>{props.title}</h2>
        <button onClick={props.selectSemester}>勾选学期</button>
        <button onClick={props.onlySelectSemester}>仅本学期</button>
      </div>
      <div className="class-list-head">
        <span className="name-field">课程名</span>
        <span className="credits-field">学分</span>
        <span className="grades-field">等级</span>
        <span className="points-field">绩点</span>
        <span className="checked-field">勾选</span>
      </div>
      {props.classes.map(item =>
        <ClassItem
          key={item.name}
          name={item.name}
          credits={item.credits}
          grades={item.grades}
          points={item.points}
          gradesList={props.gradesList}
          setGrades={props.setGrades}
          checkClassItem={props.checkClassItem} />
      )}
    </div>
  )
}