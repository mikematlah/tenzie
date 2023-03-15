export default function Die(props){
    return(
        <div
             className={`die ${props.isHeld?'held':''}`}
             onClick={(event)=>(props.hold(props.id))}

        >
            <img className = "die-img" src={`./img/dice${props.value}.png`}/>
            
        </div>
    )
}