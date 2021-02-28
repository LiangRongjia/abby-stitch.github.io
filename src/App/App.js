import React from 'react';
import './App.css'
import MyPoints from './MyPoints/MyPoints'

export default function ButtonAppBar() {

  const appRef = React.createRef()

  // const toggleFullScreen = () => {
  //   document.fullscreenElement ? document.exitFullscreen() : appRef.current.requestFullscreen()    
  // }

  return (
    <div ref={appRef} className='app'>
      <div className='app--menu-button'>菜单</div>
      <MyPoints />
    </div>
  );
}