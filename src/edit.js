import { emptyTask, myProject, myTask, saveMyProjectToLocalStorage, saveMyTaskToLocalStorage } from "./class";

export function editProject(id){
    
    let inputText = document.getElementById('projectEditTitle').value
    let previousTitle

    myProject.forEach(item=>{
        if(item.projectId === Number(id)){
            previousTitle = item.title
            item.title = inputText
        }
    })

    let sortedTask = myTask.map(item=>{
        if (item.project === previousTitle){
            item.project = inputText
        }
        return item
    })
    
    emptyTask()

    sortedTask.forEach(item=>{
        myTask.push(item)
    })
    saveMyProjectToLocalStorage()
    saveMyTaskToLocalStorage() 
}

export function editMyTask(id,title,desc,date,project,milestone){
    let selectedTask = myTask.find(item=>item.taskId === Number(id))
    selectedTask.title = title
    selectedTask.description = desc
    selectedTask.date = date
    selectedTask.project = project
    selectedTask.milestone = milestone
    saveMyTaskToLocalStorage()
}