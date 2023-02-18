import React from 'react'
import PlayersListItem from './PlayersListItem'

const PlayersList = (props) => {
  var previous_item=[]
  return (
    <div className="container-list">
        <ul>
            {props.list.map((item,index)=>{
              previous_item.push(item)
              if(previous_item.filter(x => x === item).length <= 1) {
                return <PlayersListItem key={index} item={item}/>
              }
                
            })}
        </ul>
    </div>
  )
}

export default PlayersList