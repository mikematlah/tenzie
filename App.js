import React from "react"
import Confetti from "./components/Confeti";
import Die from "./components/Die"
import Stopwatch from "./components/Stopwatch"
import { nanoid } from "nanoid";


function App() {

  
  const local =JSON.parse(localStorage.getItem("bestTime"))
 
  console.log(local)
 
  const [tenzies,setTenzies] = React.useState(false)
  const [dice,setDice] = React.useState(allNewDice())
  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const[bestTime,setBestTime]= React.useState(()=>local || 1000 )
 

  function generateNewDie(){
    return {
      value:Math.floor(Math.random()*6) + 1,
       isHeld:false,
       id:nanoid()
      }
  }
  
  function allNewDice(){
    const newDice=[]
    
    for (let i = 0;i < 10; i++){
     
      newDice.push(generateNewDie())
    }
    return newDice
    
  }
function rollDice(){
  if(tenzies){
    setDice(allNewDice())
    setTenzies(false)
    setRunning(false)
    
   
    if(bestTime > time/1000){
      localStorage.setItem("bestTime",JSON.stringify(time/1000))
     
    }
   
    setBestTime(JSON.parse(localStorage.getItem("bestTime")))
    
    setTime(0)
   
    
  }else{
    setDice(oldDice=>{
      return oldDice.map(el=>el.isHeld===true?el:generateNewDie())
    })
  }
 
  
}
function hold(id){
 setDice(oldDice=>{
  return oldDice.map(el=>el.id===id?{...el,isHeld:!el.isHeld}:{...el})
 })
    
}
React.useEffect(()=>{
 
const allHeld = dice.every(die => die.isHeld)
const firstValue = dice[0].value
const allSame = dice.every(die => die.value === firstValue)
if(allHeld && allSame){
  setTenzies(true)
  console.log("you won")
}

},[dice])
React.useEffect(() => {
  let interval;
  if (running) {
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  } else if (!running) {
    clearInterval(interval);
  }
  return () => clearInterval(interval);
}, [running])
React.useEffect(()=>setRunning(oldValue=>!oldValue),[tenzies])


 const diceElements= dice.map(die=>{
  return(
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
      id={die.id}
      
    />
  )})
  return(
  
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>
        
        <div className="time">
        <p className="best-time">Best time: {bestTime}</p>
          <p className="my-time">Your time: </p>
            <Stopwatch time={time}/>
        </div>
        
        <div className="dices">
          {tenzies?<Confetti/>:''}
          {diceElements}
        </div>
        <button
        className="roll-dice"
        onClick={rollDice}
        
        
        >{tenzies?"New game":"Roll"}</button>
      
    </main>)
  
}

export default App;
