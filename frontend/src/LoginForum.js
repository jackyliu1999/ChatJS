import React from 'react';
import InputField from "./components/InputField.js"
import SubmitButton from "./components/SubmitButton";
import User from "./components/User"

class LoginForum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      item1: "",
      item2: "",
      item3: "",
      buttonDisabled: false
    }
  }

  setInputValue(property, val) {
    val = val.trim();
    if (val.length > 12) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: "",
      password: "",
      buttonDisabled: false
    })
  }

  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true
    })
    try {
      let res = await fetch("login", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();
      if (result && result.success) {
        User.isLoggedIn = true;
        User.username = result.username;
      }
      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  async doRegister() {
    try {
      let res = await fetch("/register", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();
      User.username = result.username
      User.password = result.password
      this.resetForm();
      alert(result.msg);
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render() {
    return (
      <div className="LoginForum">
        <p style={{ textAlign: "center", color: "white", fontSize: "40px", fontFamily: "Arial", fontWeight: "bold" }}>ChatJS Login</p>
        <InputField type="text" placeholder="Username" value={this.state.username ? this.state.username : ""}
          onChange={(val) => this.setInputValue("username", val)} />
        <InputField type="password" placeholder="Password" value={this.state.password ? this.state.password : ""}
          onChange={(val) => this.setInputValue("password", val)} />
        <SubmitButton text="Login" disabled={this.state.buttonDisabled} onClick={() => this.doLogin()} />
        <SubmitButton text="Register" disabled={this.state.buttonDisabled} onClick={() => this.doRegister()} />
        <br />
      </div>
    );
  }
}

export default LoginForum;
