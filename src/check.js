import { myProject } from './class';

export function checkValidities() {
  const titleInput = document.getElementById('titleAdd');
  const dateInput = document.getElementById('dateAdd');

  if (titleInput.value === '' && !dateInput.checkValidity()) {
    titleInput.classList.add('invalid');
    dateInput.classList.add('invalid');
    return false;
  }

  if (titleInput.value === '') {
    titleInput.classList.add('invalid');
    return false;
  }

  if (!dateInput.checkValidity()) {
    dateInput.classList.add('invalid');
    return false;
  }

  return true;
}

export function checkEditTaskValidity() {
  const titleInput = document.getElementById('titleEdit');
  const dateInput = document.getElementById('dateEdit');

  if (titleInput.value === '' && !dateInput.checkValidity()) {
    titleInput.classList.add('invalid');
    dateInput.classList.add('invalid');
    return false;
  }

  if (titleInput.value === '') {
    titleInput.classList.add('invalid');
    return false;
  }

  if (!dateInput.checkValidity()) {
    dateInput.classList.add('invalid');
    return false;
  }

  return true;
}

export function checkEditValidity() {
  const titleInput = document.getElementById('projectEditTitle');
  const dateInput = document.getElementById('dateEdit');
  const span = document.getElementById('editErrorSpan');

  if (titleInput.value === '') {
    span.innerText = 'Please fill out this field.';
    titleInput.classList.add('invalid');
    return false;
  }
  if (titleInput.value === 'General') {
    span.innerText =
      'This name is already taken.(Projectless task default value)';
    titleInput.classList.add('invalid');
    return false;
  }

  if (!dateInput.checkValidity()) {
    dateInput.classList.add('invalid');
  }

  return true;
}

export function checkTitleInput() {
  const titleInput = document.getElementById('titleAdd');

  if (titleInput.value !== '') {
    titleInput.classList.remove('invalid');
  }
}

export function checkProjectTitleInput() {
  const titleInput = document.getElementById('projectTitleAdd');

  if (titleInput.value !== '') {
    titleInput.classList.remove('invalid');
  }
}

export function checkDateInput() {
  const dateInput = document.getElementById('dateAdd');
  dateInput.classList.add('active');
  if (dateInput.checkValidity()) {
    dateInput.classList.remove('invalid');
  }
}

export function checkProjectInput() {
  const projectInput = document.getElementById('projectAdd');
  projectInput.classList.add('active');
}

export function checkEditTitleInput() {
  const titleEditInput = document.getElementById('titleEdit');
  if (titleEditInput.value !== '') {
    titleEditInput.classList.remove('invalid');
  }
}

export function checkEditDateInput() {
  const dateEditInput = document.getElementById('dateEdit');
  dateEditInput.classList.add('active');
  if (dateEditInput.checkValidity()) {
    dateEditInput.classList.remove('invalid');
  }
}

export function checkProjectValidity() {
  const titleInput = document.getElementById('projectTitleAdd');
  const span = document.getElementById('addErrorSpan');

  if (titleInput.value === '') {
    span.innerText = 'Please fill out this field.';
    titleInput.classList.add('invalid');
    return false;
  }
  if (titleInput.value === 'General') {
    span.innerText =
      'This name is already taken.(Projectless task default value)';
    titleInput.classList.add('invalid');
    return false;
  }

  let checkValid = true;

  myProject.forEach((item) => {
    if (item.title === titleInput.value) {
      span.innerText = 'This name is already taken.';
      titleInput.classList.add('invalid');
      checkValid = false;
    }
  });

  if (checkValid) {
    return true;
  }
  return false;
}
