
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
    }


}

export class Project{

    static projectId = 0;

    static setProjectId(){
        return ++Project.projectId
    }

    constructor(title){
        this.projectId = Project.setProjectId()
        this.title = title
    }

}

export let myTask = []
export let myProject = []