import * as React from 'react';
import Table from './Table';
import Row from './Row';
import Ceil from './Ceil';


const Game:React.FC = () => {
  const [characters , setCharacters] = React.useState<string[]>(Array(9).fill(''));
  const [characterRole,setCharacterRole] = React.useState<string>('X');
  const [winner,setWinner] = React.useState<null|string>(null);
  const [areAllCeilsFilled,setAreAllCeilsFilled] = React.useState<boolean>(false)
  const [animation,setAnimation] = React.useState<string>('')

  React.useEffect(()=>{ 
    const currentWinner = handleSelectWinner();
    handleCeilsWinner();
    if (currentWinner) {
      setWinner(currentWinner)
      setAnimation('win-animation')
     }

     if (checkAreAllCeilsFilled()) {
        setAreAllCeilsFilled(true)
     }
  })

  
  const handleCeilsWinner = ():null|string =>{

    const ceilsElements = Array.from(document.querySelectorAll('.ceil')); 
    const victoryWaysArrays = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ];

    for (let index = 0; index < victoryWaysArrays.length; index++) {
      const [a,b,c] = victoryWaysArrays[index];

      const winnerElements:HTMLButtonElement[] = [],
          loserElements = [];

      if (characters[a]===characters[b] && characters[a]===characters[c] && characters[c] !== '') {
         
        ceilsElements.forEach(ceil => {
          const cIndex = ceil.getAttribute('data-index')
            if (cIndex != null) {
                if (+cIndex === a ||  +cIndex === b ||  +cIndex === c) {
                  winnerElements.push(ceil as any)
                }   
            } 
        });

        if (winnerElements?.length) {
          winnerElements.forEach(winnerCeil => winnerCeil.classList.add('winner-ceil'));
        } 
        
        const loserElementsBox =  ceilsElements.filter((ceil:any)=> !ceil.classList.contains('winner-ceil'))
        loserElements.push(...loserElementsBox)

        if (loserElements?.length) {
          loserElements.forEach(winnerCeil => winnerCeil.classList.add('loser-ceil'));
        }
      } 
      
    }
    return null
}

  const handleClick = (index:number):void=>{

    if(characters[index]==='' && !areAllCeilsFilled && !winner){
      const restChracters = [...characters];
      const newRole = characterRole === 'X' ? 'O' : 'X';
      restChracters[index]= characterRole;
      setCharacters(restChracters);
      setCharacterRole(newRole);
    }
  }



  const handleSelectWinner = ():null|string =>{
      const victoryWaysArrays = [
        [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
      ];

      for (let index = 0; index < victoryWaysArrays.length; index++) {
        const [a,b,c] = victoryWaysArrays[index];

        if (characters[a]===characters[b] && characters[a]===characters[c] && characters[c] !== '') {
          setWinner(characters[a])
          return characters[a]
        }
      }
      return null
  }

  const checkAreAllCeilsFilled = ():boolean=>{
    return characters.every(character => character !== '');
  }

  const restartGame = ():void=>{
    const ceilsElements = Array.from(document.querySelectorAll<HTMLButtonElement>('.ceil')); 
    ceilsElements.forEach((ceil => ceil.className = 'ceil'));
    setCharacterRole('X');
    setAnimation('');
    setAreAllCeilsFilled(false);
    setWinner('');
    setCharacters(Array(9).fill(''))
  }
  

 
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Table>
      <Row>
        <Ceil dataIndex={0} character={characters[0]} onClick={()=>handleClick(0)} />
        <Ceil dataIndex={1} character={characters[1]} onClick={()=>handleClick(1)}/>
        <Ceil dataIndex={2} character={characters[2]} onClick={()=>handleClick(2)}/>
      </Row>
      <Row>
        <Ceil dataIndex={3} character={characters[3]} onClick={()=>handleClick(3)} />
        <Ceil dataIndex={4} character={characters[4]} onClick={()=>handleClick(4)}/>
        <Ceil dataIndex={5} character={characters[5]} onClick={()=>handleClick(5)}/>
      </Row>
      <Row>
        <Ceil dataIndex={6} character={characters[6]} onClick={()=>handleClick(6)} />
        <Ceil dataIndex={7} character={characters[7]} onClick={()=>handleClick(7)}/>
        <Ceil dataIndex={8} character={characters[8]} onClick={()=>handleClick(8)}/>
      </Row>
    </Table>

    <div className={`text ${animation}`}>
      {winner ? <span>The winner is : {winner}</span> : areAllCeilsFilled ? <span>All ceils are filled</span> : <span>This is {characterRole} Role</span>}
    </div>
    <button className={`restart ${animation}`} onClick={restartGame}>
      Restart The Game
    </button>
    </div>
  )
}

export  default Game  
