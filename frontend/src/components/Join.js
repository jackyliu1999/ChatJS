import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import User from "./User"

const Join = () => {

    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">ChatJS</h1>
                <div><input placeholder={`${User.username}`} className="joinInput" value={`${User.username}`} onChange={(event) => setName(event.target.value)} readonly></input></div>
                <div><input placeholder="Room Code" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}></input></div>
                <Link onClick={e => (!room) ? e.preventDefault() : null} to={`/chat?name=${User.username}&room=${room}`}>
                    <button className="button mt-20" type="submit">Join Room</button>
                </Link>
            </div>
        </div>
    )

}

export default Join;