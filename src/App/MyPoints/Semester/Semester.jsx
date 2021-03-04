import React from 'react'
import './Semester.css'
import ClassItem from './ClassItem/ClassItem.jsx'

export default function Semester(props) {
  return (
    <article className="semester">
      <header className="title-bar">
        <h2>{props.semesterName}</h2>
        <button className="ms-button"
          onClick={() => props.selectSemester(props.semesterID)}>勾选学期</button>
        <button className="ms-button primary"
          onClick={() => props.onlySelectSemester(props.semesterID)}>仅本学期</button>
      </header>
      <div className="class-list-head">
        <span className="name-field">课程</span>
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
          checked={item.checked}
          gradesList={props.gradesList}
          setGrades={props.setGrades}
          checkClassItem={props.checkClassItem} />
      )
      }
    </article>
  )
}