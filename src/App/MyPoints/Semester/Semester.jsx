import React from 'react'
import './Semester.css'
import ClassItem from './ClassItem/ClassItem.jsx'

export default function Semester(props) {
  return (
    <div className="semester">
      <div className="title-bar">
        <h2>{props.semesterName}</h2>
        <button onClick={() => props.selectSemester(props.semesterID)}>勾选学期</button>
        <button onClick={() => props.onlySelectSemester(props.semesterID)}>仅本学期</button>
      </div>
      <div className="class-list-head">
        <span className="name-field">课程</span>
        <span className="credits-field">学分</span>
        <span className="grades-field">等级</span>
        <span className="points-field">绩点</span>
        <span className="checked-field">勾选</span>
      </div>
      {props.classes.sort((a, b) => b.points - a.points === 0 ? b.credits - a.credits : b.points - a.points)
        .map(item =>
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
    </div>
  )
}