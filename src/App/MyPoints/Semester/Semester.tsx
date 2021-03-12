import './Semester.css'
import ClassItem from './ClassItem/ClassItem'
import { ClassItemStateType } from '../MyPoints'

interface SemesterProps {
  semesterID: string,
  semesterName: string,
  classes: ClassItemStateType[],
  gradesList: string[],
  setGrades: (name: string, newGrades: string) => void,
  checkSemester: (semesterID: string) => void,
  onlyCheckSemester: (semesterID: string) => void,
  checkClassItem: (name: string) => void
}
export default function Semester({
  semesterID,
  semesterName,
  classes,
  gradesList,
  setGrades,
  checkSemester,
  onlyCheckSemester,
  checkClassItem
}: SemesterProps) {
  return (
    <article className="semester">
      <header className="title-bar">
        <h2>{semesterName}</h2>
        <button className="ms-button"
          onClick={() => checkSemester(semesterID)}>勾选学期</button>
        <button className="ms-button primary"
          onClick={() => onlyCheckSemester(semesterID)}>仅本学期</button>
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