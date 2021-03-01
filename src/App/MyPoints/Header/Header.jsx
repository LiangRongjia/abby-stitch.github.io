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
    <header>
      <img className="avatar" src="./favicon.ico" />
      <span>A b b y</span>
      <h1>少爷的绩点</h1>
      <span className="avg-points">平均绩点：{props.avgPoints}</span>
      <button onClick={props.reload}>刷新</button>
      <button onClick={props.selectAll}>全部勾选</button>
      <button onClick={props.selectNone}>全部清除</button>
    </header>
  )
}