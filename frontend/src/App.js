import React from 'react';
import './App.css';
import LoginForum from "./LoginForum"
import SubmitButton from "./components/SubmitButton"
import User from './components/User.js';
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Join from "./components/Join"
import Chat from "./components/Chat"


class App extends React.Component {

  async componentDidMount() {
    try {
      let res = await fetch("./isLoggedIn", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await res.json();
      if (result && result.success) {
        User.loading = false;
        User.isLoggedIn = true;
        User.username = result.username;
      }
      else {
        User.loading = false;
        User.isLoggedIn = false;
      }
    }
    catch (e) {
      User.loading = false;
      User.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch("./logout", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      });
      let result = await res.json();
      if (result && result.success) {
        User.isLoggedIn = false;
        User.username = "";
      }
      window.location.href = "/"
    }
    catch (e) {
      console.log(e)
    }
  }

  render() {

    if (User.loading) {
      return (
        <div className="app">
          <div className="container">
            Loading..
            </div>
        </div>
      );
    }
    else {
      if (User.isLoggedIn) {
        return (
          <div>
            <div className="app">
              <div className="Welcome" style={{ display: "block", fontStyle: "bold" }}>
                &nbsp;&nbsp;&nbsp;Welcome, {User.username}
              </div>
              <div className="logoutButton">
                <SubmitButton text={"Log out"} disabled={false} onClick={() => this.doLogout()} />
              </div><br /><br /><br /><br />
              <img src={require('./components/images/chatJSLogo.png')} alt="ChatJS" class="center" />
              <div>
                <h5>Room Codes:</h5>
                <ul>
                  <li>React</li>
                  <li>Python</li>
                  <li>Java</li>
                  <li>C</li>
                  <li>Programming</li>
                </ul>
              </div>
              <br />
              <a href="#Chatroom" style={{ color: "white", fontWeight: "bold", backgroundColor: "black" }}>Join Chat</a>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
            <a name="Chatroom"></a>
            <Router>
              <Route path="/" exact component={Join} />
              <Route path="/chat" component={Chat} />
            </Router>
          </div>
        );
      }

      return (
        <div className="app">
          <LoginForum />
        </div>

      );
    }
  }
}

export default observer(App);
