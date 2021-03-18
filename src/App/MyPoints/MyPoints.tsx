import { useState, useEffect } from 'react';
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

const defaultClassesState: ClassItemStateType[] = []
const defaultGrades: MyPointsAPI.GradesType[] = []
const defaultSemesterState: MyPointsAPI.SemesterType[] = []

const getPoints = (gradesName: string, grades: MyPointsAPI.GradesType[]) =>
  parseInt(grades.filter((item) => item.name === gradesName)
    .map((item) => item.points)
    .join('')
  )

const getClasses = (semesterID: string, classes: ClassItemStateType[]) => classes.filter(classItem => classItem.semester === semesterID) || defaultClassesState

const calcAvgPoints = (classes: ClassItemStateType[]) => {
  const sum = classes.reduce((acc, cur) => cur.checked ? acc + cur.credits * cur.points : acc, 0)
  const creditsSum = classes.reduce((acc, cur) => cur.checked ? acc + cur.credits : acc, 0)
  const avgPoints = creditsSum === 0 ? 0 : (sum / creditsSum)
  return avgPoints
}

const useMyPoints = () => {
  const [fetchToggle] = useState(true)
  const [classesState, setClassesState] = useState(defaultClassesState)
  const [gradesList, setGradesList] = useState(defaultGrades)
  const [semesters, setSemesters] = useState(defaultSemesterState)

  const eventsHandle = {
    reload: () => window.location.reload(),
    checkAll: () => setClassesState(
      classesState.map(classItem => ({
        ...classItem,
        checked: true
      }))
    ),
    checkNone: () => setClassesState(
      classesState.map(classItem => ({
        ...classItem,
        checked: false
      }))
    ),
    checkSemester: (semesterID: string) => setClassesState(
      classesState.map(classItem => ({
        ...classItem,
        checked: classItem.semester === semesterID || classItem.checked
      }))
    ),
    onlyCheckSemester: (semesterID: string) => setClassesState(
      classesState.map((classItem) => ({
        ...classItem,
        checked: classItem.semester === semesterID
      }))
    ),
    checkClassItem: (name: string) => setClassesState(
      classesState.map(classItem => classItem.name === name ? {
        ...classItem,
        checked: !classItem.checked
      } : classItem)
    ),
    setGrades: (name: string, newGrades: string) => setClassesState(
      classesState.map(classItem =>
        classItem.name === name ? {
          ...classItem,
          grades: newGrades,
          points: getPoints(newGrades, gradesList)
        } : classItem
      )
    )
  }

  useEffect(() => {
    MyPointsAPI.fetchDB().then(newData => {
      setGradesList(newData.grades)
      setSemesters(newData.semesters)
      setClassesState(newData.classes.map(item => ({
        ...item,
        points: getPoints(item.grades, newData.grades),
        checked: true
      }))
        .sort((a, b) => b.points - a.points === 0 ? b.credits - a.credits : b.points - a.points)
      )
    })
  }, [fetchToggle])

  return {
    avgPoints: calcAvgPoints(classesState),
    gradesList: gradesList.map(item => item.name),
    semesters: semesters.map(semester => ({
      ID: semester.ID,
      name: semester.name,
      classes: getClasses(semester.ID, classesState)
    })).reverse(),
    reload: eventsHandle.reload,
    checkAll: eventsHandle.checkAll,
    checkNone: eventsHandle.checkNone,
    setGrades: eventsHandle.setGrades,
    checkSemester: eventsHandle.checkSemester,
    onlyCheckSemester: eventsHandle.onlyCheckSemester,
    checkClassItem: eventsHandle.checkClassItem
  }
}

export default function MyPoints() {
  const {
    avgPoints,
    semesters,
    gradesList,
    reload,
    checkAll,
    checkNone,
    setGrades,
    checkSemester,
    onlyCheckSemester,
    checkClassItem
  } = useMyPoints()

  return (
    <div id='my-points'>
      <Header
        avgPoints={avgPoints}
        reload={reload}
        checkAll={checkAll}
        checkNone={checkNone}
      />
      <main>
        {
          semesters.map(semester =>
            <Semester
              key={semester.ID}
              semesterID={semester.ID}
              semesterName={semester.name}
              classes={semester.classes}
              gradesList={gradesList}
              setGrades={setGrades}
              checkSemester={checkSemester}
              onlyCheckSemester={onlyCheckSemester}
              checkClassItem={checkClassItem}
            />
          )
        }
      </main>
    </div>
  )
}