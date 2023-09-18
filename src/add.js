import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import {
  myTask,
  Task,
  myProject,
  Project,
  getSelectedProjectId,
  saveMyTaskToLocalStorage,
  saveMyProjectToLocalStorage,
  saveTaskIdtoLocalStorage,
  saveProjectIdtoLocalStorage,
} from './class';
import {
  removeActive,
  renderOverviewContent,
  renderProjectContent,
  renderProjectList,
} from './display';

export function getCurrentDatePH() {
  const PH_UTC_OFFSET = '+08:00';

  const currentDateUTC = new Date();

  // Convert the current date to the Philippine timezone
  const currentDatePH = utcToZonedTime(currentDateUTC, PH_UTC_OFFSET);

  // Format the date in mm-dd-yy format
  const formattedDate = format(currentDatePH, 'MM/dd/yyyy');

  return formattedDate;
}

export function addTask() {
  const PH_UTC_OFFSET = '+08:00';

  const title = document.getElementById('titleAdd').value;
  const desc = document.getElementById('descAdd').value;
  const date = document.getElementById('dateAdd').value;

  formattedDate = '';

  if (date !== '') {
    const dateObject = new Date(date);
    const dateInPh = utcToZonedTime(dateObject, PH_UTC_OFFSET);
    var formattedDate = format(dateInPh, 'MM/dd/yyyy');
  }

  const project = document.getElementById('projectAdd').value;
  const milestoneInput = document.getElementById('milestoneAdd');

  const milestone = !!milestoneInput.checked;
  const task = new Task(title, desc, formattedDate, project, milestone);

  myTask.push(task);
  if (project === 'General') {
    emptyInputs();
    renderOverviewContent('Inbox');
    const inbox = document.querySelector('button[data-type="Inbox"]');
    removeActive();
    inbox.classList.add('active');
  } else {
    emptyInputs();
    renderProjectContent(project);
    removeActive();
    console.log(getSelectedProjectId(project))
    const projectDiv = document.querySelector(
      `button[data-project="${getSelectedProjectId(project)}"]`
    );
    projectDiv.classList.add('active');
  }
  saveMyTaskToLocalStorage();
  saveTaskIdtoLocalStorage();
}

export function addProject() {
  const title = document.getElementById('projectTitleAdd').value;

  const project = new Project(title);
  renderProjectContent(title);
  myProject.push(project);
  renderProjectList();
  saveProjectIdtoLocalStorage();
  saveMyProjectToLocalStorage();
}

export function emptyInputs() {
  document.getElementById('titleAdd').value = '';
  document.getElementById('descAdd').value = '';
  document.getElementById('dateAdd').value = '';
  document.getElementById('projectAdd').value = 'General';
  document.getElementById('milestoneAdd').checked = false;

  document.getElementById('titleAdd').classList.remove('invalid');
  document.getElementById('dateAdd').classList.remove('invalid');
  document.getElementById('projectAdd').classList.remove('active');
  document.getElementById('dateAdd').classList.remove('active');
}

export function emptyEditInputs() {
  document.getElementById('titleEdit').value = '';
  document.getElementById('descEdit').value = '';
  document.getElementById('dateEdit').value = '';
  document.getElementById('projectEdit').value = 'General';
  document.getElementById('milestoneEdit').checked = false;

  document.getElementById('titleEdit').classList.remove('invalid');
  document.getElementById('dateEdit').classList.remove('invalid');
  document.getElementById('projectEdit').classList.remove('active');
  document.getElementById('dateEdit').classList.remove('active');
}

export function emptyProjectInput() {
  document.getElementById('projectTitleAdd').value = '';
  document.getElementById('projectTitleAdd').classList.remove('invalid');
}
