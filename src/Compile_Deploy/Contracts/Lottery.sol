// SPDX-License-Identifier: MIT
 
pragma solidity ^0.8.9;
contract Lottery {
    address public manager;
    address payable[] public players;

    
    constructor() {
        manager = msg.sender;
    }
    
    function enter() public payable  {
        uint control_to_add = 0;
        require(msg.value > .01 ether);
        if(players.length==0){ 
            players.push(payable(msg.sender));
        }else{
            for(uint i=0;i<players.length;i++){
                if(players[i]==msg.sender){
                    control_to_add+=1;
                }
            }
            if(control_to_add==0){
                players.push(payable(msg.sender));
            }
        }    
        
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address payable[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

   
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}   