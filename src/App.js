import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom'
import HeaderProject from './Components/HeaderProject'
import HomePage from './Components/HomePage'
import PlayersList from './Components/PlayersList'
import Lottery from './Lottery'

const App = () => {

  const [players,setPlayers] = useState([])
  const setPlayerS = (list)=>{
    setPlayers(list)
  }
  return (
    <BrowserRouter>
      <HeaderProject />
      <Switch>
        <Route path={"/"} exact >
          <HomePage getplayersfunc={setPlayerS}/>
        </Route>
        <Route path={"/PlayersAll"}>
          <PlayersList list={players}/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App