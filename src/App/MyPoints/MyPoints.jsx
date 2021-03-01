import React, { useState } from 'react';
import Header from './Header/Header.jsx'
import Semester from './Semester/Semester.jsx'
import MyPointsAPI from './MyPointsAPI'

import './MyPoints.css'

export default function MyPoints() {
  const originalDataInit = {
    semesters: [],
    grades: [],
    classes: []
  }
  const viewDataInit = {
    avgPoints: 0,
    semesters: []
  }
  const [originalData, setOriginalData] = useState(originalDataInit)
  const [viewData, setViewData] = useState(viewDataInit)

  /**
   * @param {{
   *  semesters: { ID: string, order: number, name: string } [],
   *  classes: { semester: string, grades: string, credits: number, name: string } [],
   *  grades: { name: string, points: number } []
   * }} db 
   */
  const toViewData = db => ({
    avgPoints: 0,
    semesters: db.semesters.map(semester => ({
      title: semester.name,
      classes: db.classes.filter(classItem => classItem.semester === semester.ID).map(classItem => ({
        name: classItem.name,
        credits: classItem.credits,
        grades: classItem.grades,
        points: db.grades.filter(gradesItem => gradesItem.name === classItem.grades)[0].points,
        checked: false
      }))
    }))
  })

  const reload = () => window.location.reload()

  const selectAll = () => {

  }
  const selectNone = () => {

  }

  const selectSemester = () => {

  }

  const onlySelectSemester = () => {

  }

  const checkClassItem = name => {
    viewData.semesters.forEach(semester => {
      semester.classes.forEach(classItem => {
        classItem.name === name && (classItem.checked = !classItem.checked)
      })
    })
    setViewData({ ...viewData })
  }

  const getPoints = grades => originalData.grades.filter((item) => item.name === grades)[0].points

  /**
   * @param { string } name 
   * @param { string } grades 
   */
  const setGrades = (name, grades) => {
    viewData.semesters.forEach(semester => {
      semester.classes.forEach(classItem => {
        if (classItem.name === name) {
          classItem.grades = grades
          classItem.points = getPoints(grades)
        }
      })
    })
    setViewData({ ...viewData })
  }

  originalData === originalDataInit && MyPointsAPI.fetchDB().then(fetchData => {
    setOriginalData(fetchData)
    viewData.semesters.length === 0 && setViewData(toViewData(fetchData))
  })

  return (
    <div className='my-points'>
      <Header
        avgPoints={viewData.MyPoints}
        reload={reload}
        selectAll={selectAll}
        selectNone={selectNone} />
      {viewData.semesters.map(item =>
        <Semester
          key={item.title}
          title={item.title}
          classes={item.classes}
          gradesList={originalData.grades.map(item => item.name)}
          setGrades={setGrades}
          selectSemester={selectSemester}
          onlySelectSemester={onlySelectSemester}
          checkClassItem={checkClassItem} />).reverse()}
    </div>
  )
}