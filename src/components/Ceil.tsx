import React from 'react';

type CeilProps = {
  onClick:()=> void,
  character:string,
  dataIndex:number,
}

const Ceil = ({character, onClick , dataIndex}:CeilProps):React.JSX.Element => {
  return (
    <button className='ceil' data-index={dataIndex}  onClick={onClick} value={character}>
      {character}
    </button>
  )
}

export default Ceil