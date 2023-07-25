import { utcToZonedTime } from 'date-fns-tz'
import { format  } from 'date-fns'
import { myTask, Task } from './class'

export function checkValidity(){

    let form = document.getElementById('addForm')
    let submitButton = document.getElementById('submitButton')
    let titleInput = document.getElementById('titleAdd')
    let milestoneInput = document.getElementById('milestoneAdd')
    let dateInput = document.getElementById('dateAdd')


    if (titleInput.value === "" && (!(dateInput.checkValidity()))){
        titleInput.classList.add('invalid')
        dateInput.classList.add('invalid')
        return false
    }

    if (titleInput.value === ""){
        titleInput.classList.add('invalid')
        return false
    } 
    
    
    if (!(dateInput.checkValidity())){
        dateInput.classList.add('invalid')
        return false
    }

    return true

}

export function checkTitleInput(){
    
    let titleInput = document.getElementById('titleAdd')

    if (titleInput.value !== ""){
        titleInput.classList.remove('invalid')
    }

}

function getCurrentDatePH(){
    const PH_UTC_OFFSET = '+08:00'

    const currentDateUTC = new Date();
    
    // Convert the current date to the Philippine timezone
    const currentDatePH = utcToZonedTime(currentDateUTC, PH_UTC_OFFSET);

    // Format the date in mm-dd-yy format
    const formattedDate = format(currentDatePH, 'MM/dd/yyyy');

    return formattedDate
}

export function addTask(){
    const PH_UTC_OFFSET = '+08:00'

    let title = document.getElementById('titleAdd').value
    let desc = document.getElementById('descAdd').value
    let date = document.getElementById('dateAdd').value

    let dateObject = new Date(date)
    const currentDatePh = utcToZonedTime(dateObject, PH_UTC_OFFSET)
    let formattedDate = format(currentDatePh, 'MM/dd/yyyy')

    let project= document.getElementById('projectAdd').value
    let milestoneInput = document.getElementById('milestoneAdd')
    let dateMade = getCurrentDatePH()

    let milestone = milestoneInput.checked ? true : false

    let task = new Task(title,desc,formattedDate,project,milestone,dateMade)
    myTask.push(task)
    console.log(myTask)
    emptyInputs()
}

export function emptyInputs(){

document.getElementById('titleAdd').value = ""
document.getElementById('descAdd').value = ""
document.getElementById('dateAdd').value = ""
document.getElementById('projectAdd').value = "General"
document.getElementById('milestoneAdd').checked = false

}