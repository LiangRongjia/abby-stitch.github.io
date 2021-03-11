import React from 'react'
import './Header.css'
import PropTypes from 'prop-types'

Header.propTypes = {
  avgPoints: PropTypes.number,
  reload: PropTypes.func,
  selectNone: PropTypes.func,
  selectAll: PropTypes.func
}

Header.defaultProps = {
  avgPoints: 0,
  reload: () => { },
  checkNone: () => { },
  checkAll: () => { }
}

export default function Header(props) {
  return (
    <header className="header">
      <img className="avatar" src="./favicon.ico" />
      <h1>少爷的绩点</h1>
      <p className="avg-points">平均绩点：{props.avgPoints.toFixed(2)}</p>
      <button className="ms-button" onClick={props.reload}>刷新</button>
      <button className="ms-button" onClick={props.checkNone}>全部清除</button>
      <button className="ms-button primary" onClick={props.checkAll}>全部勾选</button>
    </header>
  )
}