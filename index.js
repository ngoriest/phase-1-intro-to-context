// Your code here

function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
    const timeIn = employee.timeInEvents.find(event => event.date === date)
    const timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}
function allWagesFor(employee){
    return employee.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(employee, event.date), 0)
}

function findEmployeeByFirstName(employees, firstName){
    return employees.find(employee => employee.firstName === firstName)
}
function calculatePayroll(employees){
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0)
}