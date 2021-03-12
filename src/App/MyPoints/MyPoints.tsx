import { useState } from 'react';
import Header from './Header/Header'
import Semester from './Semester/Semester'
import * as MyPointsAPI from './MyPointsAPI'

import './MyPoints.css'

export interface ClassItemStateType {
  semester: string,
  grades: string,
  credits: number,
  name: string,
  points: number,
  checked: boolean
}

/* 默认值 */
const defaultData: MyPointsAPI.DataStruct = { semesters: [], grades: [], classes: [] }
const defaultClassesState: ClassItemStateType[] = []

/**
 * 根据 gradesName 获取 points
 */
const getPoints = (gradesName: string, grades: MyPointsAPI.GradesType[]) =>
  parseInt(grades
    .filter((item) => item.name === gradesName)
    .map((item) => item.points)
    .join(''))
/**
 * 获取某 semester 下的所有 classItem
 */
const getClasses = (semesterID: string, classes: ClassItemStateType[]) => classes.filter(classItem => classItem.semester === semesterID) || defaultClassesState

export default function MyPoints() {
  const [firstLoad, setFirstLoad] = useState(true)
  const [data, setData] = useState(defaultData)
  const [classesState, setClassesState] = useState(defaultClassesState)

  const calcAvgPoints = () => {
    const sum = classesState.reduce((acc, cur) => cur.checked ? acc + cur.credits * cur.points : acc, 0)
    const creditsSum = classesState.reduce((acc, cur) => cur.checked ? acc + cur.credits : acc, 0)
    const avgPoints = creditsSum === 0 ? 0 : (sum / creditsSum)
    return avgPoints
  }

  const reload = () => window.location.reload()

  const checkAll = () => setClassesState(
    classesState.map(classItem => ({
      ...classItem,
      checked: true
    }))
  )

  const checkNone = () => setClassesState(
    classesState.map(classItem => ({
      ...classItem,
      checked: false
    }))
  )

  const checkSemester = (semesterID: string) => setClassesState(
    classesState.map(classItem => ({
      ...classItem,
      checked: classItem.semester === semesterID || classItem.checked
    }))
  )

  const onlyCheckSemester = (semesterID: string) => setClassesState(
    classesState.map((classItem) => ({
      ...classItem,
      checked: classItem.semester === semesterID
    }))
  )

  const checkClassItem = (name: string) => setClassesState(
    classesState.map(classItem =>
      classItem.name === name ? {
        ...classItem,
        checked: !classItem.checked
      } : classItem
    )
  )

  const setGrades = (name: string, newGrades: string) => setClassesState(
    classesState.map(classItem =>
      classItem.name === name ? {
        ...classItem,
        grades: newGrades,
        points: getPoints(newGrades, data.grades)
      } : classItem))

  if (firstLoad === true) {
    setFirstLoad(false)
    MyPointsAPI.fetchDB()
      .then(newData => {
        setData(newData)
        setClassesState(
          newData.classes
            .map(item => ({
              ...item,
              points: getPoints(item.grades, newData.grades),
              checked: true
            }))
            .sort((a, b) => b.points - a.points === 0 ? b.credits - a.credits : b.points - a.points)
        )
      })
  }

  return (
    <main className='my-points'>
      <Header
        avgPoints={calcAvgPoints()}
        reload={reload}
        checkAll={checkAll}
        checkNone={checkNone} />
      {data.semesters.map(semester =>
        <Semester
          key={semester.ID}
          semesterID={semester.ID}
          semesterName={semester.name}
          classes={getClasses(semester.ID, classesState)}
          gradesList={data.grades.map(item => item.name)}
          setGrades={setGrades}
          checkSemester={checkSemester}
          onlyCheckSemester={onlyCheckSemester}
          checkClassItem={checkClassItem} />
      ).reverse()}
    </main>
  )
}