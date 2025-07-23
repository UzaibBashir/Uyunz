import React from 'react'
import Display from './Display'

const SideBar = () => {
  function barclick(){
    
  }

  return (
    <div className='w-1/3 bg-[#0a0f2c] text-white'>
        
        <p className='text-xl p-3'onClick={barclick}>* Dashboard</p>
        <p className='text-xl p-3'onClick={barclick}>* Noticeboard</p>
        <p className='text-xl p-3'onClick={barclick}>* Todays Progress</p>
        <p className='text-xl p-3'onClick={barclick}>* Timetable</p>
        <p className='text-xl p-3'onClick={barclick}>* Attendance</p>
        <p className='text-xl p-3'onClick={barclick}>* Notes</p>
        <p className='text-xl p-3'onClick={barclick}>* Doubt Section</p>
        <p className='text-xl p-3'onClick={barclick}>* Feed</p>
    </div>
  )
}

export default SideBar
