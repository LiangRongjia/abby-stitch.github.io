import React from 'react';
import './App.css'
import MyPoints from './MyPoints/MyPoints'

export default function ButtonAppBar() {
  const appRef = React.createRef<HTMLDivElement>()

  // const toggleFullScreen = () => {
  //   document.fullscreenElement ? document.exitFullscreen() : appRef.current.requestFullscreen()    
  // }

  return (
    <div ref={appRef} className='app'>
      <MyPoints />
    </div>
  );
}