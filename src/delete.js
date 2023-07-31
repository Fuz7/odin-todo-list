import { emptyTask, myProject, myTask } from "./class";

export function deleteProject(id){
    let projectTitle
    for(let i = 0;i < myProject.length; i++){
        if(myProject[i].projectId === parseInt(id)){
            projectTitle = myProject[i].title
            myProject.splice(i,1)
        }
    }

    let remainingTask = myTask.filter(item => (item.project === projectTitle)? false: true)
    emptyTask()
    remainingTask.forEach(item=>myTask.push(item))
}

export function deleteTask(id){
    for(let i = 0;i < myTask.length;i++){
        let task = myTask[i]
        if(task.taskId !== Number(id)){
            continue
        }

        if(task.milestone === true && task.dateCompletion !==''){
            myTask[i].removed = true
            break;
        }else{
            myTask.splice(i,1)
            break;
        }
    }
}