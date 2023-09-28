import { format, parse } from 'date-fns';
import { el } from 'date-fns/locale';
import * as add from './add.js';
import * as check from './check.js';
import {
  myProject,
  myTask,
  mySortedTask,
  emptySortedTask,
  setMyTaskDateCompletion,
  taskListeners,
  emptyTaskListeners,
  Project,
  mySortedListedTask,
  sortListListeners,
  saveMyTaskToLocalStorage,
} from './class.js';
import { deleteProject, deleteTask } from './delete.js';
import { editProject, editMyTask } from './edit.js';
import * as sort from './sort.js';


const removeTabIndex = ()=>{
  let addButton = document.getElementById('addButton')
  let overviewItems = Array.from(document.getElementsByClassName('overviewItem'))
  let dropdown = document.getElementById('dropdown')
  let sortOptions = Array.from(document.getElementsByClassName('sortOptions'))

  let addProjectButton = document.getElementById('addProjectButton')
  let projects = Array.from(document.getElementsByClassName('project'))
  let sideEditProjects = Array.from(document.getElementsByClassName('sideEditProject'))
  let sideDeleteProjects = Array.from(document.getElementsByClassName('sideDeleteProject'))
  let taskDatas = Array.from(document.getElementsByClassName('taskData'))
  let editTasks = Array.from(document.getElementsByClassName('editTask'))
  let trashTasks = Array.from(document.getElementsByClassName('trashTask'))
  let infoTasks = Array.from(document.getElementsByClassName('infoTask'))

  addButton.setAttribute('tabindex', '-1')
  overviewItems.forEach(element => element.setAttribute('tabindex', '-1'))
  dropdown.setAttribute('tabindex', '-1')
  sortOptions.forEach(element=> element.setAttribute('tabindex', '-1'))

  addProjectButton.setAttribute('tabindex', '-1')
  projects.forEach(element=>element.setAttribute('tabindex', '-1'))
  sideEditProjects.forEach(element=>element.setAttribute('tabindex', '-1'))
  sideDeleteProjects.forEach(element=>element.setAttribute('tabindex', '-1'))
  taskDatas.forEach(element=>element.setAttribute('tabindex', '-1'))
  editTasks.forEach(element=>element.setAttribute('tabindex', '-1'))
  trashTasks.forEach(element=>element.setAttribute('tabindex', '-1'))
  infoTasks.forEach(element=>element.setAttribute('tabindex', '-1'))
}

const minimizeTab = (()=>{
  let menuBar = document.getElementById('menuBar')
  let body = document.getElementById('body')
  menuBar.addEventListener('click', ()=>{
    
    body.classList.toggle('minimizedSidebar')
  })
})()

const setTabIndex = ()=>{
  let addButton = document.getElementById('addButton')
  let overviewItems = Array.from(document.getElementsByClassName('overviewItem'))
  let dropdown = document.getElementById('dropdown')
  let sortOptions = Array.from(document.getElementsByClassName('sortOptions'))

  let addProjectButton = document.getElementById('addProjectButton')
  let projects = Array.from(document.getElementsByClassName('project'))
  let sideEditProjects = Array.from(document.getElementsByClassName('sideEditProject'))
  let sideDeleteProjects = Array.from(document.getElementsByClassName('sideDeleteProject'))
  let taskDatas = Array.from(document.getElementsByClassName('taskData'))
  let editTasks = Array.from(document.getElementsByClassName('editTask'))
  let trashTasks = Array.from(document.getElementsByClassName('trashTask'))
  let infoTasks = Array.from(document.getElementsByClassName('infoTask'))

  addButton.setAttribute('tabindex', '1')
  overviewItems.forEach(element => element.setAttribute('tabindex', '2'))
  dropdown.setAttribute('tabindex', '3')
  sortOptions.forEach(element=> element.setAttribute('tabindex', '3'))

  addProjectButton.removeAttribute('tabindex')
  projects.forEach(element=>element.removeAttribute('tabindex'))
  sideEditProjects.forEach(element=>element.removeAttribute('tabindex'))
  sideDeleteProjects.forEach(element=>element.removeAttribute('tabindex'))
  taskDatas.forEach(element=>element.removeAttribute('tabindex'))
  editTasks.forEach(element=>element.removeAttribute('tabindex'))
  trashTasks.forEach(element=>element.removeAttribute('tabindex'))
  infoTasks.forEach(element=>element.removeAttribute('tabindex'))

}

export const renderProjectSidebar = function () {
  const oldProjects = Array.from(document.getElementsByClassName('project'));
  oldProjects.forEach((item) => {
    item.removeEventListener('click', toggleProjectActive);
  });
  const olddeleteButton = Array.from(
    document.getElementsByClassName('sideDeleteProject'),
  );
  olddeleteButton.forEach((item) => {
    item.removeEventListener('click', displayDeleteProject);
  });

  const projectList = document.getElementById('projectList');
  projectList.innerHTML = '';

  myProject.forEach((item) => {
    const div = document.createElement('button');
    div.classList.add('project');
    div.setAttribute('data-project', item.projectId);
    const span1 = document.createElement('button');
    span1.classList.add('sideEditProject');
    span1.setAttribute('data-project-edit', item.projectId);
    const span2 = document.createElement('button');
    span2.setAttribute('data-project-delete', item.projectId);
    span2.classList.add('sideDeleteProject');
    const span3 = document.createElement('span');
    div.textContent = (item.title.length > 9)?`${item.title.slice(0,9)}...`: item.title;
    div.setAttribute('data-title',item.title)
    div.append(span1);
    div.append(span2);
    div.append(span3);

    projectList.append(div);
  });

  const projects = Array.from(document.getElementsByClassName('project'));
  const deleteButton = Array.from(
    document.getElementsByClassName('sideDeleteProject'),
  );
  const editButton = Array.from(
    document.getElementsByClassName('sideEditProject'),
  );

  projects.forEach((item) => {
    item.addEventListener('click', toggleProjectActive);
    item.addEventListener('click', renderProjectContent(item));
  });

  deleteButton.forEach((item) => {
    item.addEventListener('click', displayDeleteProject);
  });

  editButton.forEach((item) => {
    item.addEventListener('click', displayEditProject);
  });
};

function displayDeleteTask(e) {
  e.stopPropagation();
  const taskId = e.currentTarget.getAttribute('data-task');
  const taskData = e.currentTarget.parentElement.parentElement;
  const deleteButton = document.getElementById('DeleteButton');
  const modal = document.getElementById('modal');
  deleteButton.setAttribute('data-deletetaskid', taskId);

  if (taskData.classList.contains('checked')) {
    const deleteId = deleteButton.getAttribute('data-deletetaskid');
    const headerContent = document.getElementById('contentHeader').innerText;
    deleteTask(deleteId);
    if (
      headerContent === 'Inbox' ||
      headerContent === 'Today' ||
      headerContent === 'Week'
    ) {
      renderOverviewContent(headerContent);
    } else {
      renderProjectContent(headerContent);
    }
  } else {
    const taskName = taskData.children[0].children[1].innerText;
    const modal = document.getElementById('modal');
    modal.classList.add('activeDeleteTask');
    removeTabIndex()
    const textbody = document.getElementById('modalDeleteTaskTextBody');
    textbody.innerHTML = '';
    textbody.innerHTML = `Task ${taskName} will be deleted <span>forever<span>`;
  }
}

function displayInfoTask(e) {
  e.stopPropagation();
  const taskId = e.currentTarget.getAttribute('data-task');
  const modal = document.getElementById('modal');
  const task = myTask.find((item) => item.taskId === Number(taskId));
  const { title } = task;
  const desc = task.description;
  const { project } = task;
  const { date } = task;
  const { dateCompletion } = task;

  const titleInput = document.getElementById('infoTitle');
  const descInput = document.getElementById('infoDesc');
  const projectInput = document.getElementById('infoProject');
  const dateInput = document.getElementById('infoDue');
  const dateCompletionInput = document.getElementById('infoCompletion');

  titleInput.innerText = title;
  descInput.innerText = desc;
  projectInput.innerText = project;
  dateInput.innerText = date;
  dateCompletionInput.innerText = dateCompletion;

  modal.classList.add('activeInfoTask');
  removeTabIndex()
}

const renderCancelInfoButton = (function () {
  const modal = document.getElementById('modal');
  const cancelButton = document.getElementById('cancelInfoButton');
  const titleInput = document.getElementById('infoTitle');
  const descInput = document.getElementById('infoDesc');
  const projectInput = document.getElementById('infoProject');
  const dateInput = document.getElementById('infoDue');
  const dateCompletionInput = document.getElementById('infoCompletion');

  cancelButton.addEventListener('click', () => {
    titleInput.innerHTML = '';
    descInput.innerHTML = '';
    projectInput.innerHTML = '';
    dateInput.innerHTML = '';
    dateCompletionInput.innerHTML = '';
    modal.classList.remove('activeInfoTask');
    setTabIndex()
  });
})();

const renderDeleteTaskButton = (function () {
  const deleteButton = document.getElementById('DeleteButton');
  const modal = document.getElementById('modal');
  deleteButton.addEventListener('click', () => {
    const deleteId = deleteButton.getAttribute('data-deletetaskid');
    const headerContent = document.getElementById('contentHeader').innerText;
    deleteTask(deleteId);
    if (
      headerContent === 'Inbox' ||
      headerContent === 'Today' ||
      headerContent === 'Week'
    ) {
      renderOverviewContent(headerContent);
    } else {
      renderProjectContent(headerContent);
    }
    modal.classList.remove('activeDeleteTask');
    setTabIndex()
  });
})();

const renderCancelDeleteTask = (function () {
  const cancelButton = document.getElementById('cancelDeleteButton');
  const modal = document.getElementById('modal');
  cancelButton.addEventListener('click', () => {
    modal.classList.remove('activeDeleteTask');
    setTabIndex()
  });
})();

function displayEditTask(e) {
  e.stopPropagation();
  const taskId = e.currentTarget.getAttribute('data-task');
  const modal = document.getElementById('modal');
  modal.classList.add('activeEditTask');
  removeTabIndex()
  const editButton = document.getElementById('editButton');
  editButton.setAttribute('data-editTaskId', taskId);

  const editedTask = myTask.find((item) => item.taskId === Number(taskId));

  const textInput = document.getElementById('titleEdit');
  const descInput = document.getElementById('descEdit');
  const dateInput = document.getElementById('dateEdit');
  const projectInput = document.getElementById('projectEdit');
  const milestoneInput = document.getElementById('milestoneEdit');

  const date = parse(editedTask.date, 'MM/dd/yyyy', new Date());
  date.setHours(date.getHours() + 8);
  textInput.value = editedTask.title;
  descInput.value = editedTask.description;
  dateInput.valueAsDate = date;
  projectInput.value = editedTask.project;
  milestoneInput.checked = editedTask.milestone;

  if (dateInput.value !== '') {
    dateInput.classList.add('active');
  }
  projectInput.classList.add('active');
}

const renderEditButton = (function () {
  const editButton = document.getElementById('editButton');
  const modal = document.getElementById('modal');

  const titleInput = document.getElementById('titleEdit');
  const descInput = document.getElementById('descEdit');
  const dateInput = document.getElementById('dateEdit');
  const projectInput = document.getElementById('projectEdit');
  const milestoneInput = document.getElementById('milestoneEdit');
  editButton.addEventListener('click', () => {
    if (check.checkEditTaskValidity()) {
      const taskId = editButton.getAttribute('data-edittaskid');
      const milestoneValue = !!milestoneInput.checked;

      let formattedDate = '';
      if (dateInput.value !== '') {
        const date = dateInput.valueAsDate;
        formattedDate = format(date, 'MM/dd/yyyy');
      }
      editMyTask(
        taskId,
        titleInput.value,
        descInput.value,
        formattedDate,
        projectInput.value,
        milestoneValue,
      );
      const headerContent =
        document.getElementById('contentHeader').textContent;
      if (
        headerContent === 'Inbox' ||
        headerContent === 'Today' ||
        headerContent === 'Week'
      ) {
        renderOverviewContent(headerContent);
      } else {
        renderProjectContent(headerContent);
      }
      modal.classList.remove('activeEditTask');
      setTabIndex()
      add.emptyEditInputs();
    }
  });
})();

const renderCancelEditTask = (function () {
  const cancelButton = document.getElementById('cancelEditButton');
  const modal = document.getElementById('modal');
  const editForm = Array.from(document.getElementsByClassName('editForm'));
  const projectEdit = document.getElementById('projectEdit');

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('activeEditTask');
    add.emptyEditInputs();
    setTabIndex()
  });
})();

function displayEditProject(e) {
  e.stopPropagation();
  const projectName = e.currentTarget.parentElement.innerText;
  const projectId = e.currentTarget.parentElement.getAttribute('data-project');
  const modal = document.getElementById('modal');
  modal.classList.add('activeEditProject');
  removeTabIndex()
  const textInput = document.getElementById('projectEditTitle');
  textInput.value = projectName;

  const editButton = document.getElementById('EditProjectButton');
  editButton.setAttribute('data-projecteditid', projectId);
}

const renderCancelEditButton = (function () {
  const cancelButton = document.getElementById('cancelEditProjectButton');
  const modal = document.getElementById('modal');
  const textInput = document.getElementById('projectEditTitle');

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('activeEditProject');
    setTabIndex()
    textInput.value = '';
  });
})();

const renderEditProjectButton = (function () {
  const editButton = document.getElementById('EditProjectButton');
  const modal = document.getElementById('modal');
  const textInput = document.getElementById('projectEditTitle');


  editButton.addEventListener('click', () => {
    const editId = editButton.getAttribute('data-projecteditid');
    if (check.checkEditValidity()) {
      editProject(editId);
      removeActive();
      renderProjectSidebar();
      const project = document.querySelector(`button[data-project="${editId}"]`);
      renderProjectContent(project.innerText);
      displaySortList();
      renderProjectList();
      textInput.value = '';
      project.classList.add('active');
      textInput.classList.remove('invalid')
      modal.classList.remove('activeEditProject');
      setTabIndex()
    }
  });
})();

function displayDeleteProject(e) {
  e.stopPropagation();
  const projectName = e.currentTarget.parentElement.innerText;
  const projectId = e.currentTarget.parentElement.getAttribute('data-project');
  const modal = document.getElementById('modal');
  modal.classList.add('activeDeleteProject');
  removeTabIndex()
  const textbody = document.getElementById('modalDeleteTextBody');
  textbody.innerHTML = '';
  textbody.innerHTML = `Project ${projectName} will be deleted <span>forever<span>`;

  const deleteButton = document.getElementById('DeleteProjectButton');
  deleteButton.setAttribute('data-projectdelId', projectId);
}

const renderCancelDeleteButton = (function () {
  const cancelButton = document.getElementById('cancelDeleteProjectButton');
  const modal = document.getElementById('modal');

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('activeDeleteProject');
    setTabIndex()
  });
})();

const renderDeleteButton = (function () {
  const deleteButton = document.getElementById('DeleteProjectButton');
  const modal = document.getElementById('modal');

  deleteButton.addEventListener('click', () => {
    const deleteId = deleteButton.getAttribute('data-projectdelid');
    deleteProject(deleteId);
    const inbox = document.getElementsByClassName('overviewItem')[0];
    removeActive();
    inbox.classList.add('active');
    modal.classList.remove('activeDeleteProject');
    renderProjectSidebar();
    renderOverviewContent('Inbox');
    contentHeader.innerText = 'Inbox';
    renderProjectList();
    setTabIndex()
  });
})();

let toggleProjectActive = function (project) {
  project = project.currentTarget;
  project = project.innerHTML;
  let name = myProject.find(item => item.title === this.getAttribute('data-title'))
  if (project !== '') {
    removeActive();
    this.classList.add('active');
    renderProjectContent(name.title);
  }
};

export function removeActive() {
  const projects = Array.from(document.getElementsByClassName('project'));
  const overviewItem = Array.from(
    document.getElementsByClassName('overviewItem'),
  );

  projects.forEach((item) => item.classList.remove('active'));

  overviewItem.forEach((item) => item.classList.remove('active'));
}

const displayValidity = (function () {
  const submitButton = document.getElementById('submitButton');
  const cancelButton = document.getElementById('cancelButton');
  const titleInput = document.getElementById('titleAdd');
  const dateInput = document.getElementById('dateAdd');
  const projectInput = document.getElementById('projectAdd');
  const modal = document.getElementById('modal');

  titleInput.addEventListener('input', check.checkTitleInput);
  dateInput.addEventListener('input', check.checkDateInput);
  projectInput.addEventListener('click', check.checkProjectInput);

  const titleEditInput = document.getElementById('titleEdit');
  const dateEditInput = document.getElementById('dateEdit');

  titleEditInput.addEventListener('input', check.checkEditTitleInput);
  dateEditInput.addEventListener('input', check.checkEditDateInput);

  submitButton.addEventListener('click', () => {
    if (check.checkValidities() === true) {
      add.addTask();
      modal.classList.remove('active');
    }
  });

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('active');
    add.emptyInputs();
  });
})();

const displayProjectValidity = (function () {
  const submitButton = document.getElementById('submitProjectButton');
  const titleInput = document.getElementById('projectTitleAdd');
  const modal = document.getElementById('modal');
  const cancelButton = document.getElementById('cancelProjectButton');

  titleInput.addEventListener('input', check.checkProjectTitleInput);

  submitButton.addEventListener('click', () => {
    if (check.checkProjectValidity() === true) {
      add.addProject();
      modal.classList.remove('activeProject');
      add.emptyProjectInput();
      renderProjectSidebar();
      removeActive();
      setTabIndex()
      const project = document.querySelector(
        `button[data-project="${Project.getProjectId()}"]`,
      );
      let data = myProject.find((item) => item.title === project.getAttribute('data-title'))
      project.classList.add('active');
      const header = document.getElementById('contentHeader');
      header.innerHTML = '';
      header.innerText = data.title;
    }
  });

  cancelButton.addEventListener('click', () => {
    modal.classList.remove('activeProject');
    add.emptyProjectInput();
    setTabIndex()
  });
})();

const displayAddMenu = (function () {
  const addButton = document.getElementById('addButton');
  const modal = document.getElementById('modal');
  addButton.addEventListener('click', () => {
    modal.classList.add('active');
    removeTabIndex()
  });
})();

const displayAddProjectMenu = (function () {
  const addProjectButton = document.getElementById('addProjectButton');
  const modal = document.getElementById('modal');

  addProjectButton.addEventListener('click', () => {
    modal.classList.add('activeProject');
    removeTabIndex()
  });
})();

const sidebarDisplay = (function () {
  const overviewItem = Array.from(
    document.getElementsByClassName('overviewItem'),
  );

  overviewItem.forEach((item) => {
    item.addEventListener('click', function () {
      removeActive();
      this.classList.add('active');
      if (this.innerText !== 'Milestone') {
        renderOverviewContent(this.innerText);
      } else {
        renderMilestoneContent();
      }
    });
  });
})();

export function renderOverviewContent(contentValue) {
  emptyEventListener();
  emptySortedTask();
  removeSortedListListener();

  const dropdown = document.getElementById('dropdown');
  dropdown.classList.remove('hide');

  const contentHeader = document.getElementById('contentHeader');

  contentHeader.classList.add('inboxHeader');
  contentHeader.classList.remove('milestoneHeader');
  contentHeader.innerText = contentValue;

  const oldInfoTask = Array.from(document.getElementsByClassName('infoTask'));
  oldInfoTask.forEach((item) =>
    item.removeEventListener('click', displayInfoTask),
  );
  const oldEditTask = Array.from(document.getElementsByClassName('editTask'));
  oldEditTask.forEach((item) =>
    item.removeEventListener('click', displayEditTask),
  );
  const oldDeleteTask = Array.from(
    document.getElementsByClassName('trashTask'),
  );
  oldDeleteTask.forEach((item) =>
    item.removeEventListener('click', displayDeleteTask),
  );

  const dropdownDisplay = document.getElementById('dropdownDisplay');
  const sortContainer = document.getElementById('sortContainer');
  const defaultOption = sortContainer.children[0];
  removeActiveSortList();
  dropdownDisplay.innerText = 'Default';
  defaultOption.classList.add('active');

  const contentBody = document.getElementById('contentBody');
  contentBody.innerHTML = '';

  if (contentValue === 'Inbox') {
    sort.sortInbox();
  } else if (contentValue === 'Today') {
    sort.sortToday();
  } else if (contentValue === 'Week') {
    sort.sortWeek();
  }

  mySortedTask.forEach((item) => {
    if (item.removed !== true) renderTaskData(item);
  });
  displaySortList();
  renderTaskCompletionListener();
  renderSortedListListener();

  const infoTask = Array.from(document.getElementsByClassName('infoTask'));
  infoTask.forEach((item) => item.addEventListener('click', displayInfoTask));
  const editTask = Array.from(document.getElementsByClassName('editTask'));
  editTask.forEach((item) => item.addEventListener('click', displayEditTask));
  const deleteTask = Array.from(document.getElementsByClassName('trashTask'));
  deleteTask.forEach((item) =>
    item.addEventListener('click', displayDeleteTask),
  );
}
function renderTaskData(item) {
  const taskData = document.createElement('button');
  taskData.classList.add('taskData');
  taskData.setAttribute('data-task', item.taskId);
  if (item.dateCompletion !== '') {
    taskData.classList.add('checked');
  }

  const leftSideData = document.createElement('div');
  leftSideData.classList.add('leftSideData');

  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkboxContainer');

  if (item.date === '') {
    checkboxContainer.classList.add('noDue');
  } else if (sort.isAlreadyDue(item.date)) {
    checkboxContainer.classList.add('alreadyDue');
  }

  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', `checkbox${item.taskId}`);
  checkbox.setAttribute('data-task', item.taskId);
  checkbox.setAttribute('disabled', 'disabled');
  if (item.dateCompletion !== '') {
    checkbox.setAttribute('checked', '');
  }

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', `checkbox${item.taskId}`);

  const taskText = document.createElement('p');
  taskText.classList.add('task-text');
  taskText.innerHTML = item.title;

  checkboxContainer.append(checkbox);
  checkboxContainer.append(checkboxLabel);
  leftSideData.append(checkboxContainer);
  leftSideData.append(taskText);
  taskData.append(leftSideData);

  const rightSideData = document.createElement('div');
  rightSideData.classList.add('rightSideData');

  const dueDate = document.createElement('dueDate');
  dueDate.classList.add('dueDate');
  const span1 = document.createElement('span');
  const dateData = document.createElement('div');
  dateData.innerHTML = item.date;
  const span2 = document.createElement('span');

  const milestone = document.createElement('div');
  milestone.classList.add('milestone');

  if (item.milestone === true) {
    milestone.classList.add('true');
  }

  const editTask = document.createElement('button');
  editTask.classList.add('editTask');
  editTask.setAttribute('data-task', item.taskId);
  const trashTask = document.createElement('button');
  trashTask.classList.add('trashTask');
  trashTask.setAttribute('data-task', item.taskId);
  const infoTask = document.createElement('button');
  infoTask.classList.add('infoTask');
  infoTask.setAttribute('data-task', item.taskId);

  if (item.date !== '') {
    dueDate.append(span1);
    dueDate.append(dateData);
    dueDate.append(span2);
    rightSideData.append(dueDate);
  } else {
    const span = document.createElement('span');
    rightSideData.append(span);
  }

  rightSideData.append(milestone);
  rightSideData.append(editTask);
  rightSideData.append(trashTask);
  rightSideData.append(infoTask);

  taskData.append(rightSideData);

  contentBody.append(taskData);
}

function renderMilestoneContent() {
  emptySortedTask();
  emptyEventListener();
  removeSortedListListener();

  const dropdown = document.getElementById('dropdown');
  dropdown.classList.remove('hide');
  const oldInfoTask = Array.from(document.getElementsByClassName('infoTask'));
  oldInfoTask.forEach((item) =>
    item.removeEventListener('click', displayInfoTask),
  );

  const dropdownDisplay = document.getElementById('dropdownDisplay');
  const sortContainer = document.getElementById('sortContainer');
  const defaultOption = sortContainer.children[0];
  removeActiveSortList();
  dropdownDisplay.innerText = 'Default';
  defaultOption.classList.add('active');

  const contentHeader = document.getElementById('contentHeader');
  contentHeader.classList.add('milestoneHeader');
  contentHeader.innerText = 'Milestone';

  const contentBody = document.getElementById('contentBody');
  contentBody.innerHTML = '';

  sort.sortByMilestone();
  displaySortList();
  mySortedTask.forEach((item) => renderMilestoneData(item));
  const infoTask = Array.from(document.getElementsByClassName('infoTask'));
  infoTask.forEach((item) => item.addEventListener('click', displayInfoTask));
  renderSortedListListener();
}

export function renderProjectContent(contentValue) {
  emptySortedTask();
  emptyEventListener();
  removeSortedListListener();

  const dropdown = document.getElementById('dropdown');
  dropdown.classList.add('hide');
  dropdown.classList.remove('active');

  const oldInfoTask = Array.from(document.getElementsByClassName('infoTask'));
  oldInfoTask.forEach((item) =>
    item.removeEventListener('click', displayInfoTask),
  );
  const oldEditTask = Array.from(document.getElementsByClassName('editTask'));
  oldEditTask.forEach((item) =>
    item.removeEventListener('click', displayEditTask),
  );
  const oldDeleteTask = Array.from(
    document.getElementsByClassName('trashTask'),
  );
  oldDeleteTask.forEach((item) =>
    item.removeEventListener('click', displayDeleteTask),
  );

  const header = document.getElementById('contentHeader');
  header.classList.remove('milestoneHeader');
  const filteredTask = myTask.filter((item) => contentValue === item.project);
  filteredTask.forEach((item) => {
    mySortedTask.push(item);
  });

  const contentBody = document.getElementById('contentBody');
  contentBody.innerHTML = '';


  displaySortList();
  mySortedTask.forEach((item) => {
    if (item.removed !== true) renderTaskData(item);
  });

  const contentHeader = document.getElementById('contentHeader');
  contentHeader.innerText = contentValue;

  const infoTask = Array.from(document.getElementsByClassName('infoTask'));
  infoTask.forEach((item) => item.addEventListener('click', displayInfoTask));
  const editTask = Array.from(document.getElementsByClassName('editTask'));
  editTask.forEach((item) => item.addEventListener('click', displayEditTask));
  const deleteTask = Array.from(document.getElementsByClassName('trashTask'));
  deleteTask.forEach((item) =>
    item.addEventListener('click', displayDeleteTask),
  );

  renderTaskCompletionListener();
}

function renderTaskCompletionListener() {
  const taskData = Array.from(document.getElementsByClassName('taskData'));
  taskData.forEach((item) => {
    item.addEventListener('click', toggleCompletion);
    taskListeners.push(item);
  });
}

function emptyEventListener() {
  taskListeners.forEach((item) => {
    item.removeEventListener('click', toggleCompletion);
  });
  emptyTaskListeners();
}

function toggleCompletion() {
  this.classList.toggle('checked');
  const leftSideData = this.children[0];
  const checkboxContainer = leftSideData.children[0];
  const checkbox = checkboxContainer.children[0];
  if (this.classList.contains('checked')) {
    setMyTaskDateCompletion(
      this.getAttribute('data-task'),
      add.getCurrentDatePH(),
    );
    checkbox.setAttribute('checked', ' ');
  } else if (!this.classList.contains('checked')) {
    setMyTaskDateCompletion(this.getAttribute('data-task'), '');
    checkbox.removeAttribute('checked');
  }
  saveMyTaskToLocalStorage();
}

function renderMilestoneData(item) {
  const milestoneData = document.createElement('div');
  milestoneData.classList.add('milestoneData');

  const leftSideMilestoneData = document.createElement('div');
  leftSideMilestoneData.classList.add('leftSideMilestoneData');

  if (item.date === '') {
    leftSideMilestoneData.classList.add('noDue');
  } else if (sort.isAlreadyDue(item.date)) {
    leftSideMilestoneData.classList.add('alreadyDue');
  }

  const leftSpan = document.createElement('span');
  const taskText = document.createElement('p');
  taskText.classList.add('task-text');
  taskText.innerText = item.title;

  leftSideMilestoneData.append(leftSpan);
  leftSideMilestoneData.append(taskText);

  contentBody.prepend(milestoneData);
  milestoneData.append(leftSideMilestoneData);

  const rightSideMilestoneData = document.createElement('div');
  rightSideMilestoneData.classList.add('rightSideMilestoneData');

  if (item.date !== '') {
    const doneDate = document.createElement('div');
    doneDate.classList.add('doneDate');
    doneDate.innerText = item.dateCompletion;

    const dash = document.createElement('span');
    dash.classList.add('dash');

    const dueDate = document.createElement('div');
    dueDate.classList.add('dueDate');
    dueDate.innerText = item.date;

    rightSideMilestoneData.append(doneDate);
    rightSideMilestoneData.append(dash);
    rightSideMilestoneData.append(dueDate);
  }

  const separator = document.createElement('span');
  separator.classList.add('separator');

  const infoTask = document.createElement('button');
  infoTask.classList.add('infoTask');
  infoTask.setAttribute('data-task', item.taskId);

  rightSideMilestoneData.append(separator);
  rightSideMilestoneData.append(infoTask);
  milestoneData.append(rightSideMilestoneData);
}

export function renderProjectList() {
  const projectSelect = document.getElementById('projectAdd');
  const projectEditSelect = document.getElementById('projectEdit');
  projectEditSelect.innerHTML = '';
  projectSelect.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.setAttribute('value', 'General');
  defaultOption.setAttribute('selected', '');
  defaultOption.innerText = 'General';
  const defaultEditOption = document.createElement('option');
  defaultEditOption.setAttribute('value', 'General');
  defaultEditOption.setAttribute('selected', '');
  defaultEditOption.innerText = 'General';

  projectSelect.append(defaultOption);
  projectEditSelect.append(defaultEditOption);

  myProject.forEach((item) => {
    const option = document.createElement('option');
    option.innerText = item.title;
    option.setAttribute('value', item.title);
    const editOption = document.createElement('option');
    editOption.innerText = item.title;
    editOption.setAttribute('value', item.title);
    projectSelect.append(option);
    projectEditSelect.append(editOption);
  });
}

const dropdownToggler = (function () {
  const dropdown = document.getElementById('dropdown');
  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
  });
})();

function displaySortList() {
  const sortContainer = document.getElementById('sortContainer');
  sortContainer.innerHTML = '';

  const sortOptionDefault = document.createElement('button');
  sortOptionDefault.classList.add('sortOptions');
  sortOptionDefault.classList.add('active');
  sortOptionDefault.setAttribute('tabindex','3')
  sortOptionDefault.innerHTML = 'Default';
  sortContainer.append(sortOptionDefault);

  const sortOptionGeneral = document.createElement('button');
  sortOptionGeneral.classList.add('sortOptions');
  sortOptionGeneral.setAttribute('tabindex','3')
  sortOptionGeneral.innerText = 'General';
  sortContainer.append(sortOptionGeneral);
  myProject.forEach((item) => {
    const sortOption = document.createElement('button');
    sortOption.classList.add('sortOptions');
    sortOption.innerText = item.title;
    sortOption.setAttribute('tabindex','3')
    sortContainer.append(sortOption);
  });
}

function renderSortedListListener() {
  const options = Array.from(document.getElementsByClassName('sortOptions'));

  options.forEach((item) => {
    item.addEventListener('click', renderSortedContent);
    sortListListeners.push(item);
  });
}

function removeSortedListListener() {
  sortListListeners.forEach((item) => {
    item.removeEventListener('click', renderSortedContent);
  });
}

function renderSortedContent() {
  emptyEventListener();

  const overviewItem = document.getElementsByClassName(
    'overviewItem active',
  )[0];
  if (overviewItem.innerText === 'Inbox') {
    sort.sortInbox();
  } else if (overviewItem.innerText === 'Today') {
    sort.sortToday();
  } else if (overviewItem.innerText === 'Week') {
    sort.sortWeek();
  } else if (overviewItem.innerText === 'Milestone') {
    sort.sortByMilestone();
  }

  const oldInfoTask = Array.from(document.getElementsByClassName('infoTask'));
  oldInfoTask.forEach((item) =>
    item.removeEventListener('click', displayInfoTask),
  );
  const oldEditTask = Array.from(document.getElementsByClassName('editTask'));
  oldEditTask.forEach((item) =>
    item.removeEventListener('click', displayEditTask),
  );
  const oldDeleteTask = Array.from(
    document.getElementsByClassName('trashTask'),
  );
  oldDeleteTask.forEach((item) =>
    item.removeEventListener('click', displayDeleteTask),
  );

  sort.sortByProject(this.innerText);
  const contentBody = document.getElementById('contentBody');
  contentBody.innerHTML = '';
  const dropdowntext = document.getElementById('dropdownDisplay');
  dropdowntext.innerHTML = this.innerText;
  removeActiveSortList();
  this.classList.add('active');

  if (overviewItem.innerText !== 'Milestone')
    mySortedListedTask.forEach((item) => {
      if (item.removed !== true) renderTaskData(item);
    });
  else {
    mySortedListedTask.forEach((item) => renderMilestoneData(item));
  }

  const infoTask = Array.from(document.getElementsByClassName('infoTask'));
  infoTask.forEach((item) => item.addEventListener('click', displayInfoTask));
  const editTask = Array.from(document.getElementsByClassName('editTask'));
  editTask.forEach((item) => item.addEventListener('click', displayEditTask));
  const deleteTask = Array.from(document.getElementsByClassName('trashTask'));
  deleteTask.forEach((item) =>
    item.addEventListener('click', displayDeleteTask),
  );

  renderTaskCompletionListener();
}

function removeActiveSortList() {
  const lists = Array.from(document.getElementsByClassName('sortOptions'));
  lists.forEach((item) => item.classList.remove('active'));
}
