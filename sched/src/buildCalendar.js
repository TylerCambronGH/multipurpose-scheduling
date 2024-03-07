const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 'November', 'December'
]

let currentMonth = 0
let currentYear = 0

function setCalendarDate(month, year) {
    currentMonth = month
    currentYear = year
    // build
}

export function resetCalendarDate() {
    let date = new Date()
    currentMonth = date.getMonth()
    currentYear = date.getFullYear()  
    // build
}

export function buildCalendar() {
    let _calendar = <><div class="calendar">
        <div class="calendar-head">
            <div class="calendar-month-prev">Previous</div>
            <div class="calendar-month-current">{MONTHS[currentMonth]}</div>
            <div class="calendar-month-next">Next</div>
        </div>
    </div></>
    return _calendar
}

 