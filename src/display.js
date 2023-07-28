import * as add from './add.js'
import { myProject, myTask, mySortedTask, emptySortedTask, setMyTaskDateCompletion, 
         taskListeners, emptyTaskListeners, Project} from './class.js'
import * as sort from './sort.js'

export let renderProjectSidebar = function(){

    let projectList = document.getElementById('projectList')
    projectList.innerHTML = ""
    let oldProjects = Array.from(document.getElementsByClassName('project'))
    oldProjects.forEach(item=>{
        item.removeEventListener('click',toggleProjectActive)
    })

    myProject.forEach(item =>{
        let div = document.createElement('div')
        div.classList.add('project')
        div.setAttribute('data-project',item.projectId)
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let span3 = document.createElement('span')
        div.innerHTML = item.title
        div.append(span1)
        div.append(span2)
        div.append(span3)

        
        projectList.append(div)
    })

    let projects = Array.from(document.getElementsByClassName('project'))


    projects.forEach(item =>{
        item.addEventListener('click',toggleProjectActive)
        item.addEventListener('click', renderProjectContent(item))
    })
    
}

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
    let modal = document.getElementById('modal')

    titleInput.addEventListener('input', add.checkTitleInput) 
    dateInput.addEventListener('input', add.checkDateInput)


    submitButton.addEventListener('click', ()=>{
        if(add.checkValidity() === true){
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

    titleInput.addEventListener('input', add.checkProjectTitleInput)

    submitButton.addEventListener('click',()=>{
        if(add.checkProjectValidity() === true){
            add.addProject()
            modal.classList.remove('activeProject')
            add.emptyProjectInput()
            renderProjectSidebar()
            removeActive()
            let project = document.querySelector(`div[data-project="${Project.getProjectId()}"]`)
            project.classList.add('active')
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

    let contentHeader = document.getElementById('contentHeader')

    contentHeader.classList.add('inboxHeader')
    contentHeader.innerText = contentValue

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
    renderTaskCompletionListener()

}
function renderTaskData(item){        

    let taskHeader = document.getElementById('contentHeader')
    taskHeader.classList.add('inboxHeader')
    taskHeader.classList.remove('milestoneHeader')

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

    let contentHeader = document.getElementById('contentHeader')
    contentHeader.classList.add('milestoneHeader')
    contentHeader.innerText = 'Milestone'

    let contentBody = document.getElementById('contentBody')
    contentBody.innerHTML = ''

    let milestoneTask = myTask.filter(item =>{
        if(item.milestone === true && item.dateCompletion !== ''){
            return true
        }
    })

    let mySortedTask = milestoneTask
    console.log(mySortedTask)
    mySortedTask.forEach(item => renderMilestoneData(item));

}

export function renderProjectContent(contentValue){
    emptySortedTask()
    emptyEventListener()
    let filteredTask = myTask.filter(item =>(contentValue === item.project)? true : false )
    filteredTask.forEach(item=>{
        mySortedTask.push(item)
    })

    let contentBody = document.getElementById('contentBody')
    contentBody.innerHTML = ''

    console.log(mySortedTask)
    
    mySortedTask.forEach(item => renderTaskData(item))
    let contentHeader = document.getElementById('contentHeader')
    contentHeader.innerText = contentValue

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

    contentBody.append(milestoneData)
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
    projectSelect.innerHTML ='';

    let defaultOption = document.createElement('option')
    defaultOption.setAttribute('value',"General")
    defaultOption.setAttribute('disabled','' )
    defaultOption.setAttribute('selected','')
    defaultOption.innerText = "Project"

    projectSelect.append(defaultOption)

    myProject.forEach(item=>{
        let option = document.createElement('option')
        option.innerText = item.title
        option.setAttribute('value',item.title)
        projectSelect.append(option)
    })
}