
export class Task{

    static taskId = 0;
    
    static addTaskId(){

        return ++Task.taskId
    }

    static setTaskId(id){
        Task.taskId = id
    }

    static getTaskId(){
        return Task.taskId
    }

    constructor(title,description,date,project,milestone){
        this.taskId = Task.addTaskId()
        this.title = title
        this.description = description
        this.date = date
        this.project = project
        this.milestone = milestone  
        this.dateCompletion = ''
        this.removed = false 
    }


}

export class Project{

    static projectId = 0;

    static addProjectId(){
        return ++Project.projectId
    }

    static getProjectId(){
        return Project.projectId
    }

    static setProjectId(id){
        Project.projectId = id
    }

    constructor(title){
        this.projectId = Project.addProjectId()
        this.title = title
    }
}

Task.setTaskId(getTaskIdFromLocalStorage())
Project.setProjectId(getProjectIdFromLocalStorage())
console.log(Task.taskId)
export let myTask = getMyTaskFromLocalStorage()
export let myProject = getMyProjectFromLocalStorage()
export let mySortedTask = []
export let mySortedListedTask = []
export let myFinishedMilestone = []
export let taskListeners = [] 
export let sortListListeners = []



export function getSelectedProjectId(title){
    let id
    myProject.forEach(item =>{
        if (item.title === title){
            id = item.projectId
        }
    })
    return id
}

export function setMyTaskDateCompletion(taskId,dateCompletion){
    myTask = myTask.map(item =>{
        if (item.taskId === parseInt(taskId)){
            item.dateCompletion = dateCompletion;
            
        }
        return item
    })
}

export function emptyTask(){
    myTask = []
}

export function emptySortedListedTask(){
    mySortedListedTask = []
}

export function emptySortedTask(){
    mySortedTask = []
}

export function emptyTaskListeners(){
    taskListeners = []
}

export function getMyTaskFromLocalStorage(){
    return JSON.parse(localStorage.getItem('myTask')) || []
}

export function saveMyTaskToLocalStorage(){
    localStorage.setItem('myTask',JSON.stringify(myTask))
}

export function getMyProjectFromLocalStorage(){
    return JSON.parse(localStorage.getItem('myProject')) || []
}

export function saveMyProjectToLocalStorage(){
    localStorage.setItem('myProject',JSON.stringify(myProject))
}

export function getTaskIdFromLocalStorage(){
    return localStorage.getItem('taskId') || 0
}

export function saveTaskIdtoLocalStorage(){
    localStorage.setItem('taskId', Task.getTaskId())
}

export function getProjectIdFromLocalStorage(){
    return localStorage.getItem('projectId') || 0
}

export function saveProjectIdtoLocalStorage(){
    localStorage.setItem('ProjectId', Project.getProjectId())
}