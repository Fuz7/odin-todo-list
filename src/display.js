import { format, parse } from 'date-fns'
import * as add from './add.js'
import * as check from './check.js'
import { myProject, myTask, mySortedTask, emptySortedTask, setMyTaskDateCompletion, 
         taskListeners, emptyTaskListeners, Project, mySortedListedTask, sortListListeners} from './class.js'
import { deleteProject } from './delete.js'
import { editProject, editMyTask } from './edit.js'
import * as sort from './sort.js'

export let renderProjectSidebar = function(){

    let oldProjects = Array.from(document.getElementsByClassName('project'))
    oldProjects.forEach(item=>{
        item.removeEventListener('click',toggleProjectActive)
    })
    let olddeleteButton = Array.from(document.getElementsByClassName('sideDeleteProject'))
    olddeleteButton.forEach(item=>{
        item.removeEventListener('click',displayDeleteProject)
    })
 

    let projectList = document.getElementById('projectList')
    projectList.innerHTML = ""

    myProject.forEach(item =>{
        let div = document.createElement('div')
        div.classList.add('project')
        div.setAttribute('data-project',item.projectId)
        let span1 = document.createElement('span')
        span1.classList.add('sideEditProject')
        span1.setAttribute('data-project-edit',item.projectId)
        let span2 = document.createElement('span')
        span2.setAttribute('data-project-delete',item.projectId)
        span2.classList.add('sideDeleteProject')
        let span3 = document.createElement('span')
        div.innerHTML = item.title
        div.append(span1)
        div.append(span2)
        div.append(span3)

        
        projectList.append(div)
    })

    let projects = Array.from(document.getElementsByClassName('project'))
    let deleteButton = Array.from(document.getElementsByClassName('sideDeleteProject'))
    let editButton = Array.from(document.getElementsByClassName('sideEditProject'))

    projects.forEach(item =>{
        item.addEventListener('click',toggleProjectActive)
        item.addEventListener('click', renderProjectContent(item))
    })

    deleteButton.forEach(item=>{
        item.addEventListener('click',displayDeleteProject)
    })
    
    editButton.forEach(item =>{
        item.addEventListener('click',displayEditProject)
    })


}


function displayEditTask(e){
    e.stopPropagation()
    let taskId = e.currentTarget.getAttribute('data-task')
    let modal = document.getElementById('modal')
    modal.classList.add('activeEditTask')
    let editButton = document.getElementById('editButton')
    editButton.setAttribute('data-editTaskId',taskId)

    let editedTask = myTask.find(item=>item.taskId === Number(taskId))

    let textInput = document.getElementById('titleEdit')
    let descInput = document.getElementById('descEdit')
    let dateInput = document.getElementById('dateEdit')
    let projectInput = document.getElementById('projectEdit')
    let milestoneInput = document.getElementById('milestoneEdit')

    let date = parse(editedTask.date,"MM/dd/yyyy",new Date())
    date.setHours(date.getHours() + 8)
    textInput.value = editedTask.title
    descInput.value = editedTask.description
    dateInput.valueAsDate = date
    projectInput.value = editedTask.project
    milestoneInput.checked = editedTask.milestone

    if (dateInput.value !== ''){
        dateInput.classList.add('active')
    }   
    projectInput.classList.add('active')
    
}

let renderEditButton = (function(){
    let editButton = document.getElementById('editButton')
    let modal = document.getElementById('modal')

    let titleInput = document.getElementById('titleEdit')
    let descInput = document.getElementById('descEdit')
    let dateInput = document.getElementById('dateEdit')
    let projectInput = document.getElementById('projectEdit')
    let milestoneInput = document.getElementById('milestoneEdit')
    editButton.addEventListener('click',()=>{
        if(check.checkEditTaskValidity()){
            let taskId = editButton.getAttribute('data-edittaskid')
            let milestoneValue = (milestoneInput.checked)? true: false 

            let formattedDate = ''
            if (dateInput.value !==''){
                let date = dateInput.valueAsDate
                formattedDate = format(date,'MM/dd/yyyy')
            }
            editMyTask(taskId,titleInput.value,descInput.value,
                       formattedDate,projectInput.value,milestoneValue)
            let headerContent = document.getElementById('contentHeader').textContent
            if(headerContent === 'Inbox' || headerContent === 'Today' || headerContent === "Week"){
                renderOverviewContent(headerContent)
            } else{
                renderProjectContent(headerContent)
            }
            modal.classList.remove('activeEditTask')
            add.emptyEditInputs()

        }
    })
})()


let renderCancelEditTask = (function(){
    let cancelButton = document.getElementById('cancelEditButton')
    let modal = document.getElementById('modal')
    let editForm = Array.from(document.getElementsByClassName('editForm'))
    let projectEdit = document.getElementById('projectEdit')

    cancelButton.addEventListener('click',()=>{
        modal.classList.remove('activeEditTask')
        add.emptyEditInputs()
    })

    
})()

function displayEditProject(e){
    e.stopPropagation()
    let projectName = e.currentTarget.parentElement.innerText
    let projectId = e.currentTarget.parentElement.getAttribute('data-project')
    let modal = document.getElementById('modal')
    modal.classList.add('activeEditProject')

    let textInput = document.getElementById('projectEditTitle')
    textInput.value = projectName

    let editButton = document.getElementById('EditProjectButton')
    editButton.setAttribute('data-projecteditid', projectId)
}

let renderCancelEditButton = (function(){
    let cancelButton = document.getElementById('cancelEditProjectButton')
    let modal = document.getElementById('modal')
    let textInput = document.getElementById('projectEditTitle')


    cancelButton.addEventListener('click',function(){
        modal.classList.remove('activeEditProject')
        textInput.value = ''
    })

})()

let renderEditProjectButton = (function(){
    let editButton = document.getElementById('EditProjectButton')
    let modal = document.getElementById('modal')
    let textInput = document.getElementById('projectEditTitle')

    editButton.addEventListener('click',function(){

        let editId = editButton.getAttribute('data-projecteditid')
        if(check.checkEditValidity()){
            editProject(editId)
            removeActive()
            renderProjectSidebar()
            let project = document.querySelector(`div[data-project="${editId}"]`) 
            renderProjectContent(project.innerText)
            displaySortList()
            renderProjectList()
            textInput.value = ''
            project.classList.add('active')
            modal.classList.remove('activeEditProject')
            console.log(myProject)
            console.log(myTask)
        }
        
    })
})()

function displayDeleteProject(e){
    e.stopPropagation()
    let projectName = e.currentTarget.parentElement.innerText
    let projectId = e.currentTarget.parentElement.getAttribute('data-project')
    let modal = document.getElementById('modal')
    modal.classList.add('activeDeleteProject')

    let textbody = document.getElementById('modalDeleteTextBody')
    textbody.innerHTML= ""
    textbody.innerHTML = "Project " + projectName + " will be deleted <span>forever<span>"

    let deleteButton = document.getElementById('DeleteProjectButton')
    deleteButton.setAttribute('data-projectdelId', projectId)
}


let renderCancelDeleteButton = (function(){
    let cancelButton = document.getElementById('cancelDeleteProjectButton')
    let modal = document.getElementById('modal')

    cancelButton.addEventListener('click',function(){
        modal.classList.remove('activeDeleteProject')
    })
})()

let renderDeleteButton = (function(){
    let deleteButton = document.getElementById("DeleteProjectButton")
    let modal = document.getElementById('modal')


    deleteButton.addEventListener('click',function(){
        let deleteId = deleteButton.getAttribute('data-projectdelid')
        deleteProject(deleteId)
        let inbox = document.getElementsByClassName('overviewItem')[0]
        removeActive()
        inbox.classList.add('active')
        modal.classList.remove('activeDeleteProject')
        renderProjectSidebar()
        renderOverviewContent('Inbox')
        contentHeader.innerText = "Inbox"
        
    })
})()

let toggleProjectActive = function(project){
        project = project.currentTarget
        project = project.innerHTML
    if (project !== ""){
        removeActive()
        this.classList.add('active')
        renderProjectContent(this.innerText)
    }
}

export  function removeActive(){
    let projects = Array.from(document.getElementsByClassName('project'))
    let overviewItem = Array.from(document.getElementsByClassName('overviewItem'))

    projects.forEach(item => item.classList.remove('active'))

    overviewItem.forEach(item => item.classList.remove('active'))

}

let displayValidity = (function(){
    let submitButton = document.getElementById('submitButton')
    let cancelButton = document.getElementById('cancelButton')
    let titleInput = document.getElementById('titleAdd')
    let dateInput = document.getElementById('dateAdd')
    let projectInput = document.getElementById('projectAdd')
    let modal = document.getElementById('modal')

    titleInput.addEventListener('input', check.checkTitleInput) 
    dateInput.addEventListener('input', check.checkDateInput)
    projectInput.addEventListener('click', check.checkProjectInput)

    let titleEditInput = document.getElementById('titleEdit')
    let dateEditInput = document.getElementById('dateEdit')

    titleEditInput.addEventListener('input', check.checkEditTitleInput)
    dateEditInput.addEventListener('input', check.checkEditDateInput)


    submitButton.addEventListener('click', ()=>{
        if(check.checkValidities() === true){
            add.addTask()
            modal.classList.remove('active')
        }

    })

    cancelButton.addEventListener('click', ()=>{
        modal.classList.remove('active')
        add.emptyInputs()
    })

})()

let displayProjectValidity = (function(){
    let submitButton = document.getElementById('submitProjectButton')
    let titleInput = document.getElementById('projectTitleAdd')
    let modal = document.getElementById('modal')
    let cancelButton = document.getElementById('cancelProjectButton')

    titleInput.addEventListener('input', check.checkProjectTitleInput)

    submitButton.addEventListener('click',()=>{
        if(check.checkProjectValidity() === true){
            add.addProject()
            modal.classList.remove('activeProject')
            add.emptyProjectInput()
            renderProjectSidebar()
            removeActive()
            let project = document.querySelector(`div[data-project="${Project.getProjectId()}"]`)
            project.classList.add('active')
            let header = document.getElementById('contentHeader')
            header.innerHTML = ''
            header.innerText = project.innerText
        }
    })

    cancelButton.addEventListener('click',()=>{
        modal.classList.remove('activeProject')
        add.emptyProjectInput()
    })

})()


let displayAddMenu = (function(){
    let addButton = document.getElementById('addButton')
    let modal = document.getElementById('modal')

    addButton.addEventListener('click',function(){
        modal.classList.add('active')
    })

})()

let displayAddProjectMenu = (function(){
    let addProjectButton = document.getElementById('addProjectButton')
    let modal = document.getElementById('modal')

     addProjectButton.addEventListener('click',()=>{
        modal.classList.add('activeProject')
    })
})()


let sidebarDisplay = (function(){

    let overviewItem = Array.from(document.getElementsByClassName('overviewItem'))
    
    
    overviewItem.forEach(item => {
        item.addEventListener('click', function(){

            removeActive()
            this.classList.add('active')
            if (this.innerText !== "Milestone"){
                renderOverviewContent(this.innerText)
            } else{
                renderMilestoneContent()
            }
        })
    });

})()

export function renderOverviewContent(contentValue){
    emptyEventListener()
    emptySortedTask()
    removeSortedListListener()
    
    let dropdown = document.getElementById('dropdown')
    dropdown.classList.remove('hide')
    
    let contentHeader = document.getElementById('contentHeader')
    
    contentHeader.classList.add('inboxHeader')
    contentHeader.classList.remove('milestoneHeader')
    contentHeader.innerText = contentValue
    
    let oldEditTask = Array.from(document.getElementsByClassName('editTask'))
    oldEditTask.forEach(item=>item.removeEventListener('click',displayEditTask))

    let dropdownDisplay = document.getElementById('dropdownDisplay')
    let sortContainer = document.getElementById('sortContainer')
    let defaultOption = sortContainer.children[0]
    removeActiveSortList()
    dropdownDisplay.innerText = "Default"
    defaultOption.classList.add('active')




    let contentBody = document.getElementById('contentBody')
    contentBody.innerHTML = ""
    
    if (contentValue === 'Inbox'){
       sort.sortInbox()
    } else if (contentValue === "Today"){
        sort.sortToday()
    } else if (contentValue === "Week"){
        sort.sortWeek()
    }
    console.log(mySortedTask)
    

    mySortedTask.forEach(item=>renderTaskData(item))
    displaySortList()
    renderTaskCompletionListener()
    renderSortedListListener()

    let editTask = Array.from(document.getElementsByClassName('editTask'))
    editTask.forEach(item=>item.addEventListener('click', displayEditTask))

    
}
function renderTaskData(item){        
    

    let taskData = document.createElement('div')
    taskData.classList.add('taskData')
    taskData.setAttribute('data-task', item.taskId)
    if (item.dateCompletion !== ''){
        taskData.classList.add('checked')
    }

    let leftSideData = document.createElement('div')
    leftSideData.classList.add('leftSideData')

    let checkboxContainer = document.createElement('div')
    checkboxContainer.classList.add('checkboxContainer')


    if (item.date === ''){
        checkboxContainer.classList.add('noDue')
    } else if (sort.isAlreadyDue(item.date)){
        checkboxContainer.classList.add('alreadyDue')
    }

    let checkbox = document.createElement('input')
    checkbox.setAttribute('type','checkbox')
    checkbox.setAttribute('id','checkbox' + item.taskId)
    checkbox.setAttribute('data-task', item.taskId)
    checkbox.setAttribute('disabled',"disabled")
    if (item.dateCompletion !==''){
        checkbox.setAttribute('checked','')
    }

    let checkboxLabel = document.createElement('label')
    checkboxLabel.setAttribute('for','checkbox' + item.taskId )

    let taskText = document.createElement('p')
    taskText.classList.add('task-text')
    taskText.innerHTML = item.title

    checkboxContainer.append(checkbox)
    checkboxContainer.append(checkboxLabel)
    leftSideData.append(checkboxContainer)
    leftSideData.append(taskText)
    taskData.append(leftSideData)


    let rightSideData = document.createElement('div')
    rightSideData.classList.add('rightSideData')

    let dueDate = document.createElement('dueDate')
    dueDate.classList.add('dueDate')
    let span1 = document.createElement('span')
    let dateData = document.createElement('div')
    dateData.innerHTML = item.date
    let span2 = document.createElement('span')

    let milestone = document.createElement('div')
    milestone.classList.add('milestone')

    if (item.milestone === true){
        milestone.classList.add('true')
    }

    let editTask = document.createElement('div')
    editTask.classList.add('editTask')
    editTask.setAttribute('data-task', item.taskId)
    let trashTask = document.createElement('div')
    trashTask.classList.add('trashTask')
    trashTask.setAttribute('data-task', item.taskId)
    let infoTask = document.createElement('div')
    infoTask.classList.add('infoTask')
    infoTask.setAttribute('data-task', item.taskId)

    if (item.date !== ''){
        dueDate.append(span1)
        dueDate.append(dateData)
        dueDate.append(span2)
        rightSideData.append(dueDate)
    } else{
        let span = document.createElement('span')
        rightSideData.append(span)
    }

    rightSideData.append(milestone)
    rightSideData.append(editTask)
    rightSideData.append(trashTask)
    rightSideData.append(infoTask)

    taskData.append(rightSideData)

    contentBody.append(taskData)

}

function renderMilestoneContent(){
    emptySortedTask()
    emptyEventListener()
    removeSortedListListener()

    let dropdown = document.getElementById('dropdown')
    dropdown.classList.remove('hide')
    
    let dropdownDisplay = document.getElementById('dropdownDisplay')
    let sortContainer = document.getElementById('sortContainer')
    let defaultOption = sortContainer.children[0]
    removeActiveSortList()
    dropdownDisplay.innerText = "Default"
    defaultOption.classList.add('active')

    let contentHeader = document.getElementById('contentHeader')
    contentHeader.classList.add('milestoneHeader')
    contentHeader.innerText = 'Milestone'

    let contentBody = document.getElementById('contentBody')
    contentBody.innerHTML = ''

    sort.sortByMilestone()
    displaySortList()
    mySortedTask.forEach(item => renderMilestoneData(item));
    renderSortedListListener()
}

export function renderProjectContent(contentValue){
    emptySortedTask()
    emptyEventListener()
    removeSortedListListener()

    let dropdown = document.getElementById('dropdown')
    dropdown.classList.add('hide')
    dropdown.classList.remove('active')

    let oldEditTask = Array.from(document.getElementsByClassName('editTask'))
    oldEditTask.forEach(item=>item.removeEventListener('click',displayEditTask))

    let header = document.getElementById('contentHeader')
    header.classList.remove('milestoneHeader')
    let filteredTask = myTask.filter(item =>(contentValue === item.project)? true : false )
    filteredTask.forEach(item=>{
        mySortedTask.push(item)
    })

    let contentBody = document.getElementById('contentBody')
    contentBody.innerHTML = ''

    console.log(mySortedTask)
    
    displaySortList()
    mySortedTask.forEach(item => renderTaskData(item))
    let contentHeader = document.getElementById('contentHeader')
    contentHeader.innerText = contentValue
    let editTask = Array.from(document.getElementsByClassName('editTask'))
    editTask.forEach(item=>item.addEventListener('click',displayEditTask))

    renderTaskCompletionListener()
}

function renderTaskCompletionListener(){
    let taskData = Array.from(document.getElementsByClassName('taskData'))
    taskData.forEach(item=>{
        item.addEventListener('click',toggleCompletion)
        taskListeners.push(item)
    })
}




function emptyEventListener(){
    taskListeners.forEach(item=>{
        item.removeEventListener('click',toggleCompletion)
    })
    emptyTaskListeners()
    
}

function toggleCompletion(){

    this.classList.toggle('checked')
    let leftSideData = this.children[0]
    let checkboxContainer = leftSideData.children[0]
    let checkbox = checkboxContainer.children[0]
    if(this.classList.contains('checked')){
        setMyTaskDateCompletion(this.getAttribute('data-task'),add.getCurrentDatePH())
        checkbox.setAttribute('checked',' ')
    } else if(!(this.classList.contains('checked'))){
        setMyTaskDateCompletion(this.getAttribute('data-task'),'')
        checkbox.removeAttribute('checked')
    }
    console.log(myTask)
}

function renderMilestoneData(item){
    
    let milestoneData = document.createElement('div')
    milestoneData.classList.add('milestoneData')

    let leftSideMilestoneData = document.createElement('div')
    leftSideMilestoneData.classList.add('leftSideMilestoneData')

    if (item.date === ''){
        leftSideMilestoneData.classList.add('noDue')
    } else if(sort.isAlreadyDue(item.date)){
        leftSideMilestoneData.classList.add('alreadyDue')
    }

    let leftSpan = document.createElement('span')
    let taskText = document.createElement('p')
    taskText.classList.add('task-text')
    taskText.innerText = item.title

    leftSideMilestoneData.append(leftSpan)
    leftSideMilestoneData.append(taskText)

    contentBody.prepend(milestoneData)
    milestoneData.append(leftSideMilestoneData)



    let rightSideMilestoneData = document.createElement('div')
    rightSideMilestoneData.classList.add('rightSideMilestoneData')

    if (item.date !== ''){
        let doneDate = document.createElement('div')
        doneDate.classList.add('doneDate')
        doneDate.innerText = item.dateCompletion

        let dash = document.createElement('span')
        dash.classList.add('dash')

        let dueDate = document.createElement('div')
        dueDate.classList.add('dueDate')
        dueDate.innerText = item.date
        
        rightSideMilestoneData.append(doneDate)
        rightSideMilestoneData.append(dash)
        rightSideMilestoneData.append(dueDate)
    }

    let separator = document.createElement('span')
    separator.classList.add('separator')
    
    let infoTask = document.createElement('div')
    infoTask.classList.add('infoTask')

    rightSideMilestoneData.append(separator)
    rightSideMilestoneData.append(infoTask)
    milestoneData.append(rightSideMilestoneData)

}



export function renderProjectList(){

    let projectSelect = document.getElementById('projectAdd')
    let projectEditSelect = document.getElementById('projectEdit')
    projectEditSelect.innerHTML = ''
    projectSelect.innerHTML ='';

    
    let defaultOption = document.createElement('option')
    defaultOption.setAttribute('value',"General")
    defaultOption.setAttribute('selected','')
    defaultOption.innerText = "General"
    let defaultEditOption = document.createElement('option')
    defaultEditOption.setAttribute('value',"General")
    defaultEditOption.setAttribute('selected','')
    defaultEditOption.innerText = "General"

    projectSelect.append(defaultOption)
    projectEditSelect.append(defaultEditOption)

    myProject.forEach(item=>{
        let option = document.createElement('option')
        option.innerText = item.title
        option.setAttribute('value',item.title)
        let editOption = document.createElement('option')
        editOption.innerText = item.title
        editOption.setAttribute('value',item.title)
        projectSelect.append(option)
        projectEditSelect.append(editOption)
    })
}

let dropdownToggler = (function(){

    let dropdown = document.getElementById('dropdown')
    dropdown.addEventListener('click',function(){
        dropdown.classList.toggle('active')
    })

})()

function displaySortList(){
    let sortContainer = document.getElementById('sortContainer')
    sortContainer.innerHTML = ''

    let sortOptionDefault = document.createElement('div')
    sortOptionDefault.classList.add('sortOptions')
    sortOptionDefault.classList.add('active')
    sortOptionDefault.innerHTML = 'Default'
    sortContainer.append(sortOptionDefault)

    let sortOptionGeneral = document.createElement('div')
    sortOptionGeneral.classList.add('sortOptions')
    sortOptionGeneral.innerText = "General"
    sortContainer.append(sortOptionGeneral)
    myProject.forEach(item=>{
        let sortOption = document.createElement('div')
        sortOption.classList.add('sortOptions')
        sortOption.innerText = item.title
        sortContainer.append(sortOption)
    })
}

function renderSortedListListener(){
    let options = Array.from(document.getElementsByClassName('sortOptions'))
    
    options.forEach(item=> {
        item.addEventListener('click',renderSortedContent)
        sortListListeners.push(item)
    })
}

function removeSortedListListener(){  
    sortListListeners.forEach(item =>{
        item.removeEventListener('click', renderSortedContent)
    })
        
    
}

function renderSortedContent(){
    emptyEventListener()

    let overviewItem = document.getElementsByClassName('overviewItem active')[0]
    if (overviewItem.innerText === 'Inbox'){
        sort.sortInbox()
    } else if(overviewItem.innerText === "Today"){
        sort.sortToday()
    } else if(overviewItem.innerText === "Week"){
        sort.sortWeek()
    } else if(overviewItem.innerText === "Milestone"){
        sort.sortByMilestone()
    }

    let oldEditTask = Array.from(document.getElementsByClassName('editTask'))
    oldEditTask.forEach(item=>item.removeEventListener('click',displayEditTask))

    sort.sortByProject(this.innerText)
    console.log(mySortedTask)
    let contentBody = document.getElementById('contentBody')
    contentBody.innerHTML= ''
    let dropdowntext = document.getElementById('dropdownDisplay')
    dropdowntext.innerHTML = this.innerText
    removeActiveSortList()
    this.classList.add('active')

    if(overviewItem.innerText !== "Milestone") mySortedListedTask.forEach(item=>renderTaskData(item))
    else{
        mySortedListedTask.forEach(item=>renderMilestoneData(item))
    }
    
    let editTask = Array.from(document.getElementsByClassName('editTask'))
    editTask.forEach(item=>item.addEventListener('click',displayEditTask))

    renderTaskCompletionListener()
}


function removeActiveSortList(){
    let lists = Array.from(document.getElementsByClassName('sortOptions'))
    lists.forEach(item=>item.classList.remove('active'))
}