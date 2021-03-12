import React from 'react'
import './Semester.css'
import ClassItem from './ClassItem/ClassItem'

export default function Semester({
  semesterID,
  semesterName,
  classes,
  gradesList,
  setGrades,
  selectSemester,
  onlySelectSemester,
  checkClassItem
}: {
  semesterID: string,
  semesterName: string,
  classes: {
    semester: string;
    grades: string;
    credits: number;
    name: string;
    points: number;
    checked: boolean;
  }[],
  gradesList: string[],
  setGrades: (name: string, newGrades: string) => void,
  selectSemester: (semesterID: string) => void,
  onlySelectSemester: (semesterID: string) => void,
  checkClassItem: (name: string) => void
}) {
  return (
    <article className="semester">
      <header className="title-bar">
        <h2>{semesterName}</h2>
        <button className="ms-button"
          onClick={() => selectSemester(semesterID)}>勾选学期</button>
        <button className="ms-button primary"
          onClick={() => onlySelectSemester(semesterID)}>仅本学期</button>
      </header>
      <div className="class-list-head">
        <span className="name-field">课程</span>
        <span className="credits-field">学分</span>
        <span className="grades-field">等级</span>
        <span className="points-field">绩点</span>
        <span className="checked-field">勾选</span>
      </div>
      {
        classes.map(item =>
          <ClassItem
            key={item.name}
            name={item.name}
            credits={item.credits}
            grades={item.grades}
            points={item.points}
            checked={item.checked}
            gradesList={gradesList}
            setGrades={setGrades}
            checkClassItem={checkClassItem} />
        )
      }
    </article>
  )
}