import React from 'react'

const Table = ({children}:any):React.JSX.Element => {

  return (
    <div className='table'>
    {children}
    </div>
  )
}

export default Table