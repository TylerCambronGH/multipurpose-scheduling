import React from 'react'
import './calendar.css'
import { GetTestBusinesses, GetTestCalendarEntries, GetTestCalendars } from './testData'
import { currentBusiness } from './App'

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
]

let currentSchedule = 0
let currentMonth = 0
let currentYear = 0

export function setCalendarDate(month, year) {
    currentMonth = month
    currentYear = year
}

export function resetCalendarDate() {
    let date = new Date()
    currentMonth = date.getMonth()
    currentYear = date.getFullYear()  
}

export class CalendarUI extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: buildCalendarBody(currentBusiness)
        }
        this.prevMonth = this.prevMonth.bind(this)
        this.nextMonth = this.nextMonth.bind(this)
    }

    prevMonth() {
        setPrevMonth()
        this.setState({body: buildCalendarBody(currentBusiness)})
    }

    nextMonth() {
        setNextMonth()
        this.setState({body: buildCalendarBody(currentBusiness)})
    }

    render() {
        return <>
            <div className="calendar-head">
                <div className="calendar-month-prev" onClick={ this.prevMonth }>Previous</div>
                <div className="calendar-month-current">{ MONTHS[currentMonth] + ", " + currentYear }</div>
                <div className="calendar-month-next" onClick={ this.nextMonth }>Next</div>
            </div>
            <div className="calendar-body">
                { this.state.body }
            </div>
        </>
    }
}

class DaySchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.selectDay = this.selectDay.bind(this)
    }

    selectDay() {

    }

    render() {
        return <div className="calendar-day">
            <div className="calendar-day-head">{ this.props.day+1 }</div>
            <div className="calendar-day-body">
                { buildCalendarDayBody(this.props.day) }
            </div>
        </div>
    }
}

function buildCalendarBody() {
    let cDays = []
    for (let day = 0; day < daysInMonth(currentMonth, currentYear); day++) {
        cDays.push(<DaySchedule day={day}/>)
    }
    return cDays
}

function buildCalendarDayBody(day) {
    let calendars = getBusinessCalendars(currentBusiness)
    let entries = getBusinessAptsForDate(currentBusiness, day, currentMonth, currentYear)
    let cEntries = []
    let calendarEntries = []
    for (let calendar in calendars) {
        cEntries.push({
            num: 0, 
            calendarId: calendars[calendar]
        })
        for (let entry in entries) {
            console.log(calendars[calendar])
            console.log(entries[entry].calendarId)
            if (entries[entry].calendarId === calendars[calendar]) {
                cEntries[cEntries.length-1].num += 1
            }
        }
    }
    for (let cEntry in cEntries) {
        calendarEntries.push(<div className="calendar-day-tab">
            { cEntries[cEntry].num }
        </div>)
    }
    return calendarEntries
}

function getBusinessCalendars(businessId) {
    let calendars = []
    let Calendars = GetTestCalendars()
    for (let c in Calendars) {
        if (Calendars[c].businessId === businessId) {
            calendars.push(Calendars[c].calendarId)
        }
    }
    return calendars
}

function getBusinessAptsForDate(businessId, day, month, year) { // Returns entire appointment list
    let bK = doesBusinessExist(businessId)
    if (bK === null) return
    let calendars = getBusinessCalendars(businessId)
    let Apts = GetTestCalendarEntries()
    let Calendars = []
    for (let a in Apts) {
        for (let c in calendars) {
            if (Apts[a].calendarId === calendars[c]) {
                let aptDate = new Date(Apts[a].appointmentTime)
                if (year === aptDate.getFullYear() && month === aptDate.getMonth() && day === aptDate.getDate()) {
                    Calendars.push(Apts[a])
                }
            }
        }
    }
    return Calendars
}

function doesBusinessExist(businessId) { // Returns Index
    let Businesses = GetTestBusinesses()
    for (let bus in Businesses) {
        if (Businesses[bus].businessId === businessId) {
            return bus
        }
    }
    return null
}

function setPrevMonth() {
    let prevM = currentMonth - 1
    let prevY = currentYear
    if (prevM < 0) {
        prevM = 11
        prevY -= 1
    }
    setCalendarDate(prevM, prevY)
}

function setNextMonth() {
    let prevM = currentMonth + 1
    let prevY = currentYear
    if (prevM > 11) {
        prevM = 0
        prevY += 1
    }
    setCalendarDate(prevM, prevY)
}

function daysInMonth(month, year) {
    return new Date(year, month+1, 0).getDate();
}
