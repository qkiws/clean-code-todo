const newTaskInput = document.querySelector('#new-task');
const addTaskButton = document.querySelector('#add-task');
const todoTaskList = document.querySelector('#todo-list');
const completedTaskList = document.querySelector('#completed-list');
const taskLists = [todoTaskList, completedTaskList];

function createTaskElement(taskText) {
  const listItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImage = document.createElement('img');

  checkbox.type = 'checkbox';
  label.className = 'task';
  label.textContent = taskText;
  editInput.type = 'text';
  editInput.className = 'task';
  editButton.type = 'button';
  editButton.className = 'edit';
  editButton.textContent = 'Edit';
  deleteButton.type = 'button';
  deleteButton.className = 'delete';
  deleteButton.setAttribute('aria-label', 'Delete task');
  deleteButtonImage.src = './remove.svg';
  deleteButtonImage.alt = '';
  deleteButton.appendChild(deleteButtonImage);

  listItem.append(checkbox, label, editInput, editButton, deleteButton);

  return listItem;
}

function addTask() {
  const taskText = newTaskInput.value.trim();

  if (!taskText) {
    return;
  }

  todoTaskList.appendChild(createTaskElement(taskText));
  newTaskInput.value = '';
}

function toggleTaskEditMode(listItem, editButton) {
  const label = listItem.querySelector('label');
  const editInput = listItem.querySelector('input[type="text"]');
  const isEditing = listItem.classList.contains('editMode');

  if (isEditing) {
    label.textContent = editInput.value;
    editButton.textContent = 'Edit';
  } else {
    editInput.value = label.textContent;
    editButton.textContent = 'Save';
  }

  listItem.classList.toggle('editMode');
}

function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const button = event.target.closest('button');
  const listItem = button?.closest('li');

  if (!button || !listItem) {
    return;
  }

  if (button.classList.contains('edit')) {
    toggleTaskEditMode(listItem, button);
  } else if (button.classList.contains('delete')) {
    listItem.remove();
  }
}

function handleTaskListChange(event) {
  if (
    !(event.target instanceof HTMLInputElement) ||
    event.target.type !== 'checkbox'
  ) {
    return;
  }

  const listItem = event.target.closest('li');

  if (!listItem) {
    return;
  }

  const destinationList = event.target.checked
    ? completedTaskList
    : todoTaskList;

  destinationList.appendChild(listItem);
}

addTaskButton.addEventListener('click', addTask);

taskLists.forEach((taskList) => {
  taskList.addEventListener('click', handleTaskListClick);
  taskList.addEventListener('change', handleTaskListChange);
});
