import React from 'react';
import './Header.css';
/**
 * @param { { 
 *  avgPoints: string, 
 *  reload: function, 
 *  selectAll: function, 
 *  selectNone: function 
 * } } props 
 */
export default function Header(props) {
  return (
    <header className="header">
      <img className="avatar" src="./favicon.ico" />
      <h1>少爷的绩点</h1>
      <p className="avg-points">平均绩点：{props.avgPoints}</p>
      <button className="ms-button" onClick={props.reload}>刷新</button>
      <button className="ms-button" onClick={props.selectNone}>全部清除</button>
      <button className="ms-button primary" onClick={props.selectAll}>全部勾选</button>
    </header>
  )
}