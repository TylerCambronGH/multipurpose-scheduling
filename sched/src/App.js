import './App.css';
import { GetTestBusinesses } from './testData';
import React from 'react';

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
  //
  // If at a business!
  //
  return (
    <>
    <div>Home Page</div>
    <LogIn/>
    </>
  );
}

function LogIn() {
  let filler = <div></div>
  if (businessLoggedIn === null) {
    filler = <div>
      <a href="/login">Log In</a> to the business as an employee here.
    </div>
  }
  return (
    <>
    {filler}
    </>
  )
}
