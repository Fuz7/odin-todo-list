import { utcToZonedTime } from 'date-fns-tz'
import { format  } from 'date-fns'
import { myTask, Task, myProject, Project, getSelectedProjectId } from './class'
import { removeActive, renderOverviewContent, renderProjectContent, renderProjectList } from './display'



export function checkValidity(){


    let titleInput = document.getElementById('titleAdd')
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

export function checkProjectValidity(){

    let titleInput = document.getElementById('projectTitleAdd')

    if (titleInput.value === ""){
        titleInput.classList.add('invalid')
        return false
    }

    return true

}

export function checkProjectTitleInput(){

    let titleInput = document.getElementById('projectTitleAdd')

    if (titleInput.value !== ""){
        titleInput.classList.remove('invalid')
    }    
    

}

export function checkDateInput(){

    let dateInput = document.getElementById('dateAdd')

    if (dateInput.checkValidity()){
        dateInput.classList.remove('invalid')
    }

}


export function getCurrentDatePH(){
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


    formattedDate = ""

    if (date !== ""){

        let dateObject = new Date(date)
        const dateInPh = utcToZonedTime(dateObject, PH_UTC_OFFSET)
        var formattedDate = format(dateInPh, 'MM/dd/yyyy')
    }


    let project= document.getElementById('projectAdd').value
    let milestoneInput = document.getElementById('milestoneAdd')

    let milestone = milestoneInput.checked ? true : false
    let task = new Task(title,desc,formattedDate,project,milestone)

    myTask.push(task)
    if (project === 'General'){
        emptyInputs()
        renderOverviewContent("Inbox")
        let inbox = document.querySelector(`div[data-type="Inbox"]`)
        removeActive()
        inbox.classList.add('active')
    } else{
        emptyInputs()
        renderProjectContent(project)
        removeActive()
        let projectDiv = document.querySelector(`div[data-project="${getSelectedProjectId(project)}"]`)
        projectDiv.classList.add('active')
    }


}

export function addProject(){

    let title = document.getElementById('projectTitleAdd').value

    let project = new Project(title)
    renderProjectContent(title)
    myProject.push(project)
    renderProjectList()

}

export function emptyInputs(){

document.getElementById('titleAdd').value = ""
document.getElementById('descAdd').value = ""
document.getElementById('dateAdd').value = ""
document.getElementById('projectAdd').value = "General"
document.getElementById('milestoneAdd').checked = false

document.getElementById('titleAdd').classList.remove('invalid')
document.getElementById('dateAdd').classList.remove('invalid')

}

export function emptyProjectInput(){
    document.getElementById('projectTitleAdd').value = ""
    document.getElementById('projectTitleAdd').classList.remove('invalid')
    
}

