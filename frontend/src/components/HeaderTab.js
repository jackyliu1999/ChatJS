import React from 'react';
import io from "socket.io-client";
import './HeaderTab.css';

let socket;
const ENDPOINT = "localhost:8000"
socket = io(ENDPOINT);
const HeaderTab = ({ room }) => (
  <div className="HeaderTab">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={require('./images/chatIcon.png')} alt="online icon" />
      <h3>Chatroom: {room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={require('./images/closeIcon.png')} alt="close icon" onClick = {socket.emit('forceDisconnect')}/></a>
    </div>
  </div>
);

export default HeaderTab;