import React, { useState, useEffect } from 'react';
import Header from './Header/Header'
import Semester from './Semester/Semester'
import * as MyPointsAPI from './MyPointsAPI'

import './MyPoints.css'

/* 默认值 */
const defaultData: {
  semesters: {
    ID: string,
    name: string,
    order: number
  }[],
  grades: {
    name: string,
    points: number
  }[],
  classes: {
    semester: string,
    grades: string,
    credits: number,
    name: string
  }[]
} = {
  semesters: [],
  grades: [],
  classes: []
}
const defaultAvgPointsState: number = 0
const defaultClassesState: {
  semester: string,
  grades: string,
  credits: number,
  name: string,
  points: number,
  checked: boolean
}[] = []

/**
 * 根据 gradesName 获取 points
 */
const getPoints = (gradesName: string, grades: { name: string, points: number }[]) =>
  parseInt(grades
    .filter((item) => item.name === gradesName)
    .map((item) => item.points)
    .join(''))
/**
 * 获取某 semester 下的所有 classItem
 */
const getClasses = (semesterID: string, classes: { semester: string, grades: string, credits: number, name: string, points: number, checked: boolean }[]) =>
  classes.filter(classItem => classItem.semester === semesterID) || defaultClassesState

export default function MyPoints() {
  const [firstLoad, setFirstLoad] = useState(true)
  /* 存储 fetch 数据 */
  const [data, setData] = useState(defaultData)
  /* 用 hook 存储组件的 state */
  const [avgPointsState, setAvgPointsState] = useState(defaultAvgPointsState)
  const [classesState, setClassesState] = useState(defaultClassesState)

  /* classesState 变更 -> avgPointsState 更新 */
  useEffect(() => {
    const sum = classesState.reduce((acc, cur) => cur.checked ? acc + cur.credits * cur.points : acc, 0)
    const creditsSum = classesState.reduce((acc, cur) => cur.checked ? acc + cur.credits : acc, 0)
    const avgPoints = creditsSum === 0 ? 0 : (sum / creditsSum)
    setAvgPointsState(avgPoints)
  }, [classesState]);

  /**
   * 重新加载该子应用
   */
  const reload = () => window.location.reload()
  /**
   * 勾选全部 classItem
   */
  const checkAll = () => setClassesState(
    classesState
      .map(classItem => ({
        ...classItem,
        checked: true
      })))
  /**
   * 取消全部的 classItem 勾选
   */
  const checkNone = () => setClassesState(
    classesState
      .map(classItem => ({
        ...classItem,
        checked: false
      })))
  /**
   * 勾选某 semester 的全部 classItem
   */
  const selectSemester = (semesterID: string) => setClassesState(
    classesState
      .map(classItem => ({
        ...classItem,
        checked: classItem.semester === semesterID || classItem.checked
      })))
  /**
   * 仅勾选某 semester 的全部 classItem，其他 semester 的取消勾选
   */
  const onlySelectSemester = (semesterID: string) => setClassesState(
    classesState
      .map((classItem) => ({
        ...classItem,
        checked: classItem.semester === semesterID
      })))
  /**
   * 勾选某 classItem
   */
  const checkClassItem = (name: string) => setClassesState(
    classesState
      .map(classItem => classItem.name === name ? {
        ...classItem,
        checked: !classItem.checked
      } : classItem))
  /**
   * 设置某 classItem 的 grades
   */
  const setGrades = (name: string, newGrades: string) => setClassesState(
    classesState
      .map(classItem => classItem.name === name ? {
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
        avgPoints={avgPointsState}
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
          selectSemester={selectSemester}
          onlySelectSemester={onlySelectSemester}
          checkClassItem={checkClassItem} />
      ).reverse()}
    </main>
  )
}