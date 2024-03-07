import './App.css'
import { GetTestBusinesses } from './testData'
import { buildCalendar, resetCalendarDate } from './buildCalendar'
import React from 'react'

let currentBusiness = null
let businessLoggedIn = false

function getCurrentBusiness() {
  let cBusiness = null
  let cURL = window.location.href
  let urlSplit = cURL.split("/")
  if (!isNaN(parseInt(urlSplit[3]))) {
    cBusiness = parseInt(urlSplit[3])
  }
  return cBusiness
}

function getLoggingIn() {
  let _loggingIn = false
  let cURL = window.location.href
  let urlSplit = cURL.split("/")
  if (urlSplit[4] === 'login') {
    _loggingIn = true
  }
  return _loggingIn 
}

export default function App(){
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
  //
  // If at a business
  //
  if (businessLoggedIn) { // Employee Home Page
    return (
      <>
      <div>Employee Home Page</div>
      </>
    )
  }
  if (getLoggingIn()) { // Log-In Page
    let _cRef = window.location.href.split("/")
    _cRef.pop()
    let logInRef = _cRef[0]
    for (let i=1; i < _cRef.length; i++) {
      logInRef = "/" + _cRef[i]
    }

    return (
      <>
      <div>Log-In: { businessData.label }</div>
      <a href={logInRef}>Cancel</a>
      </>
    )
  } else { // Normal Home Page
    return (
      <>
      <div>Home Page</div>
      <HomeLogIn/>
      <HomeCalendar/>
      </>
    );
  }
}

function HomeLogIn() {
  let filler = <div></div>
  if (!businessLoggedIn) {
    let _ref = "/" + currentBusiness + "/login"
    filler = <div>
      <a href={_ref}>Log In</a> to the business as an employee here.
    </div>
  }
  return (
    <>
    {filler}
    </>
  )
}

function HomeCalendar() {
  resetCalendarDate()
  return (
    <>
    {buildCalendar()}
    </>
  )
}