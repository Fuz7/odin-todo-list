
export class Task{

    static taskId = 0
    
    static setTaskId(){

        return ++Task.taskId
    }

    constructor(title,description,date,project,milestone,dateMade){
        this.taskId = Task.setTaskId()
        this.title = title
        this.description = description
        this.date = date
        this.project = project
        this.milestone = milestone
        this.dateMade = dateMade
    }


}

class Project{

    constructor(name){
        this.name = name
    }

}

export let myTask = []