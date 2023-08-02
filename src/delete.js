import {
  emptyTask,
  myProject,
  myTask,
  saveMyProjectToLocalStorage,
  saveMyTaskToLocalStorage,
} from './class';

export function deleteProject(id) {
  let projectTitle;
  for (let i = 0; i < myProject.length; i++) {
    if (myProject[i].projectId === parseInt(id)) {
      projectTitle = myProject[i].title;
      myProject.splice(i, 1);
    }
  }

  const remainingTask = myTask.filter((item) => item.project !== projectTitle);
  emptyTask();
  remainingTask.forEach((item) => myTask.push(item));
  saveMyProjectToLocalStorage();
  saveMyTaskToLocalStorage();
}

export function deleteTask(id) {
  for (let i = 0; i < myTask.length; i++) {
    const task = myTask[i];
    if (task.taskId !== Number(id)) {
      continue;
    }

    if (task.milestone === true && task.dateCompletion !== '') {
      myTask[i].removed = true;
      break;
    } else {
      myTask.splice(i, 1);
      break;
    }
  }
  saveMyTaskToLocalStorage();
}
