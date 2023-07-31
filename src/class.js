
export class Task{

    static taskId = 0
    
    static setTaskId(){

        return ++Task.taskId
    }

    constructor(title,description,date,project,milestone){
        this.taskId = Task.setTaskId()
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

    static setProjectId(){
        return ++Project.projectId
    }

    static getProjectId(){
        return Project.projectId
    }

    constructor(title){
        this.projectId = Project.setProjectId()
        this.title = title
    }
}

export let myTask = []
export let myProject = []
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