import React, { useState, useEffect } from 'react';
import Header from './Header/Header.jsx'
import Semester from './Semester/Semester.jsx'
import MyPointsAPI from './MyPointsAPI'

import './MyPoints.css'

/* 默认值 */
const defaultData = { semesters: [], grades: [], classes: [] }
const defaultAvgPointsState = 0
const defaultClassesState = [{ semester: '', grades: '', credits: 0, name: '', points: 0, checked: false }]

export default function MyPoints() {
  /* 存储 fetch 数据 */
  const [data, setData] = useState(defaultData)
  /* 用 hook 存储组件的 state */
  const [avgPointsState, setAvgPointsState] = useState(defaultAvgPointsState)
  const [classesState, setClassesState] = useState(defaultClassesState)

  /* classesState 变更 -> avgPointsState 更新 */
  useEffect(() => {
    const sum = classesState.reduce((acc, cur) => cur.checked ? acc + cur.credits * cur.points : acc, 0)
    const creditsSum = classesState.reduce((acc, cur) => cur.checked ? acc + cur.credits : acc, 0)
    const avgPoints = sum === 0 ? '未勾选' : (sum / creditsSum).toFixed(2)
    setAvgPointsState(avgPoints)
  }, [classesState]);

  /**
   * 根据 gradesName 获取 points
   * @param { string } gradesName 
   */
  const getPoints = gradesName => data.grades.filter((item) => item.name === gradesName).map(item => item.points).join('')
  /**
   * 获取某 semester 下的所有 classItem
   * @param { number } semesterID 
   */
  const getClasses = semesterID => classesState.filter(classItem => classItem.semester === semesterID) || defaultClassesState
  /**
   * 重新加载该子应用
   */
  const reload = () => window.location.reload()
  /**
   * 勾选全部 classItem
   */
  const selectAll = () => setClassesState(classesState.map(classItem => ({
    ...classItem,
    checked: true
  })))
  /**
   * 取消全部的 classItem 勾选
   */
  const selectNone = () => setClassesState(classesState.map(classItem => ({
    ...classItem,
    checked: false
  })))
  /**
   * 勾选某 semester 的全部 classItem
   * @param { number } semesterID 
   */
  const selectSemester = (semesterID) => setClassesState(classesState.map(classItem => ({
    ...classItem,
    checked: classItem.semester === semesterID || classItem.checked
  })))
  /**
   * 仅勾选某 semester 的全部 classItem，其他 semester 的取消勾选
   * @param { number } semesterID 
   */
  const onlySelectSemester = (semesterID) => setClassesState(classesState.map(classItem => ({
    ...classItem,
    checked: classItem.semester === semesterID
  })))
  /**
   * 勾选某 classItem
   * @param { string } name 
   */
  const checkClassItem = name => setClassesState(classesState.map(classItem => classItem.name === name ? {
    ...classItem,
    checked: !classItem.checked
  } : classItem))
  /**
   * 设置某 classItem 的 grades
   * @param { string } name 
   * @param { string } newGrades 
   */
  const setGrades = (name, newGrades) => setClassesState(classesState.map(classItem => classItem.name === name ? {
    ...classItem,
    grades: newGrades,
    points: getPoints(newGrades)
  } : classItem))

  if (classesState === defaultClassesState) {
    MyPointsAPI.fetchDB().then(newData => {
      setData(newData)
      setClassesState(
        newData.classes.map(item => ({
          ...item,
          points: getPoints(item.grades),
          checked: true
        })).sort((a, b) => b.points - a.points === 0 ? b.credits - a.credits : b.points - a.points))
    })
  }

  return (
    <main className='my-points'>
      <Header
        avgPoints={avgPointsState}
        reload={reload}
        selectAll={selectAll}
        selectNone={selectNone} />
      {data.semesters.map(semester =>
        <Semester
          key={semester.ID}
          semesterID={semester.ID}
          semesterName={semester.name}
          classes={getClasses(semester.ID)}
          gradesList={data.grades.map(item => item.name)}
          setGrades={setGrades}
          selectSemester={selectSemester}
          onlySelectSemester={onlySelectSemester}
          checkClassItem={checkClassItem} />
      ).reverse()}
    </main>
  )
}