import './App.css' 
import './calendar.css'
import { GetTestBusinesses } from './testData'
import { CalendarUI, resetCalendarDate } from './buildCalendar'
import React from 'react'

export let currentBusiness = null

function getCurrentBusiness() {
  let cBusiness = null
  let cURL = window.location.href
  let urlSplit = cURL.split("/")
  if (!isNaN(parseInt(urlSplit[3]))) {
    cBusiness = parseInt(urlSplit[3])
  }
  return cBusiness
}

export default function App() {
  // Get business
  currentBusiness = getCurrentBusiness()
  //
  // If no business chosen
  //
  if (currentBusiness === null) {
    let BUSINESSES = GetTestBusinesses()
    let businessList = BUSINESSES.map(business => 
      <li
        key = { business.businessId }
      >
        <a href={ business.businessId }>{ business.label }</a>
      </li>
    )
    return (
      <>
      <div
        style={{
          fontStyle: 'bold'
        }}
      >Businesses</div>
      <ul>{ businessList }</ul>
      </>
    )
  }
  let businessData = GetTestBusinesses()[currentBusiness-1]
  if (businessData === undefined) {
    return (
      <div>Invalid Page...</div>
    )
  }
  return <MainUI/>
}

class MainUI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usernameInput: "",
      passwordInput: "",
      loggedIn: false,
      management: false,
      errorMessage: ""
    }
    this.buildBody = this.buildBody.bind(this)
    this.onClickLogIn = this.onClickLogIn.bind(this)
    this.onUserInputChange = this.onUserInputChange.bind(this)
    this.onPWInputChange = this.onPWInputChange.bind(this)
    this.state.body = this.buildBody()
  }

  buildBody() {
    let businessData = GetTestBusinesses()[currentBusiness-1]
    if (this.state.loggedIn) {
      return <>
        <div>Home Page</div>
        <HomeCalendar/>
      </>
    } else {
      return <>
        <div>Log-In: { businessData.label }</div>
        <label>User: <input type="text" name="username" onChange={ this.onUserInputChange }/></label>
        <label>Password: <input type="password" name="password" onChange={ this.onPWInputChange }/></label>
        <input type="submit" value="Log-In" onClick={ this.onClickLogIn }/>
      </>
    }
  }

  onUserInputChange(evt) {
    this.setState({ usernameInput: evt.target.value })
  }

  onPWInputChange(evt) {
    this.setState({ passwordInput: evt.target.value })
  }

  onClickLogIn() {
    let loggedIn = logIn(this.state.usernameInput, this.state.passwordInput)
    if (loggedIn) {
      this.setState({
        loggedIn: loggedIn,
        management: false
      })
      this.setState({
        body: this.buildBody()
      })
    } else {
      this.setState({ errorMessage: "Invalid Log-In..." })
    }
  }

  render() {
    return <>
      { this.state.body }
      <p style={{"color": "red"}}> { this.state.errorMessage } </p>
    </>
  }
}

function HomeCalendar() {
  resetCalendarDate()
  return (
    <><div className="calendar">
      <CalendarUI/>
    </div></>
  )
}

function logIn(username, password) {
  let loggedIn = false
  let isMgmt = false
  if (username === "admin" && password === "admin") {
    loggedIn = true
    isMgmt = true 
  }
  return loggedIn
}