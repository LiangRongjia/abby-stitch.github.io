import './Header.css'

interface HeaderProps {
  avgPoints: number,
  reload: () => void,
  checkNone: () => void,
  checkAll: () => void
}

export default function Header({ avgPoints, reload, checkNone, checkAll }: HeaderProps) {
  return (
    <header className="header">
      <img className="avatar" alt="avatar" src="./favicon.ico" />
      <h1>少爷的绩点</h1>
      <p className="avg-points">平均绩点：{avgPoints.toFixed(2)}</p>
      <button className="ms-button" onClick={reload}>刷新</button>
      <button className="ms-button" onClick={checkNone}>全部清除</button>
      <button className="ms-button primary" onClick={checkAll}>全部勾选</button>
    </header>
  )
}