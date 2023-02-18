import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Lottery from '../Lottery'
import web3 from '../Web3/Web3'
import "./CSS/HomePage.css"
import loading from "../../src/827.gif"

const HomePage = (props) => {

    const [Manager, SetManager] = useState("")
    const [players, setPlayers] = useState([]);
    const [balance, setBalance] = useState(0)
    const [playernumber, setPlayernumber] = useState(players.length)

    //enter to lottery value
    const [value1, SetValue] = useState("")

    useEffect(() => {
        const func = async () => {
            const mng = await Lottery.methods.manager().call()
            SetManager(mng)
            await Lottery.methods.getPlayers().call().then(res => {
                setPlayers(res)
                setPlayernumber(res.length)
            })

            await web3.eth.getBalance(Lottery.options.address).then(res => { setBalance(web3.utils.fromWei(String(res), "ether")); })

        }
        func()
    }, [])

    useEffect(() => {
        document.getElementById("player_number").innerHTML = `There are ${playernumber} players in this lottery.`
    }, [players.length])
    useEffect(() => {
        document.getElementById("balance").innerHTML = `Total ETH: ${balance}`
    }, [balance])

    const enterlottery = async () => {
        try {
            // enter the lottery
            let accounts = await web3.eth.getAccounts()
            await Lottery.methods.enter().send({ from: accounts[0], value: web3.utils.toWei(value1, "ether") }).then(()=>{
                document.querySelector(".wait_to_process").classList.toggle("process_active")
            })

            //clear input
            await SetValue(0)
            // html balance restore
            await web3.eth.getBalance().then(res => console.log(res));
            document.getElementById("balance").innerHTML = `Total ETH: ${balance}`
            // set html players length
            await Lottery.methods.getPlayers().call().then(res => setPlayernumber(res.length))
            document.querySelector(".wait_to_process").classList.toggle("process_active")
        } catch (err) {
            console.log(err)
            document.querySelector(".wait_to_process").classList.toggle("process_active")
            window.location.reload()
        }


    }

    const OnFormSubmit = async (e) => {
        e.preventDefault();
        let item = e.target.elements.TxtItem.value
        if (Number(item) <= 0 || item === "") {
            alert("You must enter a value which is bigger than 0 ETH!")
        } else {
            await enterlottery()
        }

    }

    const onchangevalue = e => {
        SetValue(String(e.target.value))
    }

    const GetPlayersList = async () => {
        await Lottery.methods.getPlayers().call().then(res => {
            setPlayers(res)
        })
        props.getplayersfunc(players)
    }
    return (
        <>
            <div className='home-page-container'>
                <section>
                    <div className="container-header">Play Lottery with Ethereum</div>
                    <div className="info_to_players"><p>This Lottery is managed by {Manager}</p><p id='player_number'>There are {playernumber} players in this lottery. </p>
                        <p id='balance'>Total ETH: {balance}</p></div>
                    <form onSubmit={OnFormSubmit}>
                        <input onChange={onchangevalue} name="TxtItem" value={Number(value1)} type="number" placeholder='enter a value of ether that you want to join with' />
                        <div className="middle_part_of_section">
                            <div className="enter_the_lottery">
                                Enter the Lottery
                                <Link style={{textDecoration:"none;"}} className='enter_lottery_btn'>Enter</Link >
                            </div>
                            <div className="get_players">
                                Get List of Players
                                <Link role={"button"} onClick={GetPlayersList} to="/PlayersAll">Get Players</Link>
                            </div>
                        </div>
                    </form>
                    <div className="pick-a-winner">
                        <button title={`If you are not manager of this lottery, you can not pick the winner of lottery!`} disabled={Manager!=="0x276C85eEc6Bd1585D7660a4115c7c24b4BD7be61"}>Pick A winner</button>
                    </div>
                </section>

            </div>
            <div className="wait_to_process">
                <div>
                    <img src={loading} alt="" />
                    <h2>Please wait few seconds to complete the transaction</h2>
                </div>
            </div>
        </>
    )
}

export default HomePage