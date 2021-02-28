import React, { createRef } from 'react';

import './MyPoints.css'

/**
     * db 对象为关系数据库，每个属性用 Array 模拟数据表，每个数据表包含多个对象表示数据条目
     */
const db = {
  /**
   * semester 数据表记录学期
   */
  semester: [
    { ID: '大一上', name: '2018-2019 学年第 1 学期' },
    { ID: '大一下', name: '2018-2019 学年第 2 学期' },
    { ID: '德强上', name: '2019-2020 学年第 1 学期' },
    { ID: '德强下', name: '2019-2020 学年第 2 学期' },
    { ID: '大二上', name: '2020-2021 学年第 1 学期' }
  ],
  /**
   * grades 数据表记录等级及其对应的绩点
   */
  grades: [
    { name: '优', points: 5 },
    { name: '良', points: 4 },
    { name: '中', points: 3 },
    { name: '及格', points: 2 },
    { name: '不及格', points: 0 },
    { name: '缓考', points: 0 }
  ],
  /**
   * class 数据表记录所有课程信息
   * 其中学期信息外码引用 semester 表，起节省空间之用
   */
  class: [
    // ID 留作标准模式，但这里没有用到，可以随便填
    { semester: '大一上', grades: '优', credits: 0.5, name: '物理实验（上）' },
    { semester: '大一上', grades: '优', credits: 3, name: '思想道德修养与法律基础' },
    { semester: '大一上', grades: '中', credits: 1, name: '军事理论' },
    { semester: '大一上', grades: '优', credits: 1, name: '体育(1)' },
    { semester: '大一上', grades: '良', credits: 2, name: '工程实践' },
    { semester: '大一上', grades: '中', credits: 5, name: '高等数学(B)上' },
    { semester: '大一上', grades: '优', credits: 2, name: '国际交流英语视听说1' },
    { semester: '大一上', grades: '优', credits: 2, name: '大学英语五级' },
    { semester: '大一上', grades: '优', credits: 4, name: '日语二外(上)' },
    { semester: '大一上', grades: '良', credits: 2.5, name: 'C/C++程序设计' },
    { semester: '大一上', grades: '优', credits: 1, name: '新生教授研讨课（教授讲坛）' },
    { semester: '大一上', grades: '优', credits: 3, name: '机械制图(三)' },
    { semester: '大一上', grades: '优', credits: 0.5, name: '形势与政策(1)' },
    { semester: '大一下', grades: '优', credits: 0.5, name: '形势与政策(2)' },
    { semester: '大一下', grades: '优', credits: 2, name: '素描与写生' },
    { semester: '大一下', grades: '优', credits: 1, name: '电工实习' },
    { semester: '大一下', grades: '中', credits: 4, name: '电路理论' },
    { semester: '大一下', grades: '中', credits: 5, name: '高等数学(B)下' },
    { semester: '大一下', grades: '良', credits: 3, name: '线性代数B' },
    { semester: '大一下', grades: '中', credits: 3, name: '普通物理(B)上' },
    { semester: '大一下', grades: '优', credits: 1, name: '体育(2)' },
    { semester: '大一下', grades: '良', credits: 1.5, name: '科技文献检索与利用' },
    { semester: '大一下', grades: '中', credits: 3, name: '中国近现代史纲要' },
    { semester: '大一下', grades: '良', credits: 1, name: '物理实验（下）' },
    { semester: '德强上', grades: '良', credits: 2, name: '雕塑' },
    { semester: '德强上', grades: '良', credits: 1.5, name: '中国音乐与歌曲入门（中外）' },
    { semester: '德强上', grades: '良', credits: 18, name: '德语1' },
    { semester: '德强下', grades: '良', credits: 18, name: '德语2' },
    { semester: '德强下', grades: '优', credits: 2, name: '军训' },
    { semester: '大二上', grades: '优', credits: 1.5, name: '机器人与人工智能前沿' },
    { semester: '大二上', grades: '良', credits: 1, name: '电路实验' },
    { semester: '大二上', grades: '优', credits: 2, name: '英语笔译' },
    { semester: '大二上', grades: '优', credits: 5, name: '毛泽东思想和中国特色社会主义理论体系概论' },
    { semester: '大二上', grades: '优', credits: 0.5, name: '形势与政策(3)' },
    { semester: '大二上', grades: '良', credits: 2, name: '数据结构' },
    { semester: '大二上', grades: '优', credits: 2, name: '专业导论（信息类）' },
    { semester: '大二上', grades: '缓考', credits: 3, name: '概率论与数理统计' },
    { semester: '大二上', grades: '缓考', credits: 3, name: '普通物理(B)下' },
    { semester: '大二上', grades: '缓考', credits: 3, name: '复变函数与积分变换' },
    { semester: '大二上', grades: '缓考', credits: 3, name: '模拟电子技术' }
  ]
}

/**
 * 库命名空间
 */
const lib = {
  /**
   * 从 HTML 字符串创建 DOM 元素
   * 输入的 HTML 字符串要求最外层只有一个节点，否则仅返回第一个节点
   * @returns { HTMLElement }
   * @param { string } string
   */
  createElementFrom: function (string) {
    const context = document.createElement('div')
    context.innerHTML = string
    return context.children[0]
  }
}

/**
 * 组件命名空间
 */
const Components = {
  ShaoYeDeJiDian: function (db) {
    return lib.createElementFrom(
      `
              <div id="shao-ye-de-ji-dian">
                <header>
                  <div id="header-container">
                    <h1>少爷的绩点</h1>
                    <h2>平均绩点：</h2>
                    <span id="avgPoints"></span>
                    <button onclick="location.reload()">刷新</button>
                    <button onclick="EventsCB.checkAll()">全部勾选</button>
                    <button onclick="EventsCB.checkNone()">全部清除</button>
                  </div>
                </header>
                ${Components.Main(db).outerHTML}
              </div>
            `
    )
  },
  /**
   * @returns { HTMLElement }
   * @param { 
              {
                semester: {
                  ID: number;
                  name: string;
                }[];
                class: {
                  ID: number;
                  semester: number;
                  name: string;
                  grades: string;
                  credits: number;
                  points: number;
                }[]; 
              }
            } db
   */
  Main: function (db) {
    const comp_Semesters = db.semester.map(semester => Components.Semester(semester, db.class.filter(classItem => classItem.semester === semester.ID), db.grades))

    return lib.createElementFrom(
      `
            <main>
              ${comp_Semesters.map(item => item.outerHTML).reverse().join('')}
            </main>
            `
    )
  },
  /** 
   * @returns { HTMLElement }
   * @param semester
   * @param classList
   * @param gradesList
   */
  Semester: function (semester, classList, gradesList) {
    return lib.createElementFrom(
      `
            <div class="semester-card">
              ${Components.SemesterTitleBar(semester).outerHTML}
              ${Components.ClassList(classList, gradesList).outerHTML}
            </div>
            `
    )
  },
  /**
   * @returns { HTMLElement }
   * @param { Object } semester
   */
  SemesterTitleBar: function (semester) {
    return lib.createElementFrom(
      `
            <div class="semester-title-bar">
              <h1>${semester.name}</h1>
              <button onclick="EventsCB.checkSemester('${semester.ID}')">勾选学期</button>
              <button onclick="EventsCB.onlyCheckSemester('${semester.ID}')">仅本学期</button>
            </div>
            `
    )
  },
  /**
   * @returns { HTMLElement }
   * @param { Array } classList
   * @param { Array } gradesList
   */
  ClassList: function (classList, gradesList) {
    const temp_classList = Array.from(classList).sort((classA, classB) => Methods.descend(classA, classB, gradesList))
    const classItems = temp_classList.map(item => Components.ClassItem(item, gradesList, false))

    return lib.createElementFrom(
      `
            <ul class="class-list">
              <li class="class-item" style="font-weight: bold">
                <span class="class-name">课程名</span>
                <span class="class-credits">学分</span>
                <span class="class-grades">成绩</span>
                <span class="class-points">绩点</span>
                <input 
                  class="class-checkbox"
                  type="checkbox"
                  style="visibility: hidden"
                  onchange="null"/>
              </li>
              ${classItems.map(item => item.outerHTML).join('')}
            </ul>
            `
    )
  },
  /**
   * @returns { HTMLElement }
   * @param { Object } classItem
   * @param { Array } gradesList
   * @param { boolean } isChecked
   * impure
   */
  ClassItem: function (classItem, gradesList, isChecked) {
    const semester = classItem.semester
    const name = classItem.name
    const credits = classItem.credits
    const grades = classItem.grades
    const points = gradesList.filter(item => item.name === classItem.grades)[0].points

    return lib.createElementFrom(
      `
      <li class="class-item" isChecked='${isChecked}'">
        <span class="class-name">${name}</span>
        <span class="class-credits">${credits}</span>
        <select 
          class="class-grades" 
          classItemName="${name}" 
          onchange="EventsCB.gradesChange(this)">
          ${gradesList.map(item => `<option${item.name === grades ? ' selected' : ''}>${item.name}</option>`).join('')}
        </select>
        <span class="class-points">${points}</span>
        <input 
          class="class-checkbox" 
          type="checkbox" 
          credits="${credits}"
          points="${points}"
          semester="${semester}"
          onchange="EventsCB.checkItem(this)"
          ${isChecked ? 'checked' : ''}/>
      </li>
      `
    )
  }
}

/**
 * 方法命名空间
 */
const Methods = {
  /**
   * @returns { number }
   * @param { Object } classA
   * @param { Object } classB
   */
  descend: function (classA, classB, gradesList) {
    const pointsA = gradesList.filter(item => item.name === classA.grades)[0].points
    const pointsB = gradesList.filter(item => item.name === classB.grades)[0].points
    const creditA = classA.credits
    const creditB = classB.credits

    if (pointsA < pointsB) {
      return 1
    }
    else if (pointsA > pointsB) {
      return -1
    }
    else if (creditA < creditB) {
      return 1
    }
    else if (creditA > creditB) {
      return -1
    }
  }
}

/**
 * 事件回调方法命名空间
 */
const EventsCB = {
  /**
   * 刷新平均绩点
   */
  refreshAvgPoints: function () {
    const checkboxList = document.getElementsByClassName('class-checkbox')
    let sum = 0
    let creditsSum = 0
    for (var i = 0; i < checkboxList.length; i++) {
      if (checkboxList[i].checked && checkboxList[i].getAttribute('credits') && checkboxList[i].getAttribute('points')) {
        sum += parseFloat(checkboxList[i].getAttribute('credits')) * parseFloat(checkboxList[i].getAttribute('points'))
        creditsSum += parseFloat(checkboxList[i].getAttribute('credits'))
      }
    }
    var avgPoints = sum / creditsSum
    document.getElementById('avgPoints').innerText = Number.isNaN(avgPoints) ? '未勾选' : avgPoints.toFixed(2).toString()
  },
  /**
   * @param { HTMLElement } element
   */
  checkItem: function (element) {
    element.parentElement.setAttribute('isChecked', element.checked.toString())
    EventsCB.refreshAvgPoints()
  },
  /**
   * 勾选学期
   * @param { number } ID
   */
  checkSemester: function (ID) {
    const checkboxList = document.getElementsByClassName('class-checkbox')
    for (var i = 0; i < checkboxList.length; i++) {
      if (checkboxList[i].getAttribute('semester') === ID) {
        checkboxList[i].checked = true
        checkboxList[i].onchange()
      }
    }
  },
  /**
   * 仅勾选该学期
   * @param { number } ID
   */
  onlyCheckSemester: function (ID) {
    const checkboxList = document.getElementsByClassName('class-checkbox')
    for (var i = 0; i < checkboxList.length; i++) {
      if (checkboxList[i].getAttribute('semester') === ID) {
        checkboxList[i].checked = true
      }
      else {
        checkboxList[i].checked = false
      }
      checkboxList[i].onchange()
    }
  },
  /**
   * 勾选所有课程
   */
  checkAll: function () {
    const checkboxList = document.getElementsByClassName('class-checkbox')
    for (var i = 0; i < checkboxList.length; i++) {
      checkboxList[i].checked = true
      checkboxList[i].onchange()
    }
  },
  /**
   * 取消全部勾选
   */
  checkNone: function () {
    const checkboxList = document.getElementsByClassName('class-checkbox')
    for (var i = 0; i < checkboxList.length; i++) {
      checkboxList[i].checked = false
      checkboxList[i].onchange()
    }
  },
  /**
   * @param { HTMLElement } element
   */
  gradesChange: function (element) {
    const classItemName = element.getAttribute('classItemName')
    const classItemElement = element.parentElement
    const isChecked = classItemElement.getAttribute('isChecked') === 'true' ? true : false
    const newGrades = element.selectedOptions[0].value
    db.class.forEach(item => {
      if (item.name === classItemName) {
        item.grades = newGrades
        element.parentElement.replaceWith(Components.ClassItem(item, db.grades, isChecked))
      }
    })
    EventsCB.refreshAvgPoints()
  }
}
export default function MyPoints() {

  const myPointsRef = React.createRef()
 
  const result = (
    <div ref={myPointsRef} className='app--my-points' dangerouslySetInnerHTML={{__html:Components.ShaoYeDeJiDian(db).outerHTML}}></div>
  )

  return result

}