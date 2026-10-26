//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const todoTaskList = document.getElementById('todo-list');
const completedTaskList = document.getElementById('completed-list');

//New task list item
const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input');
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImg = document.createElement('img'); //delete button image

  label.innerText = taskText;
  label.className = 'task';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  todoTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  newTaskInput.value = '';
};

//Edit an existing task.

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditing = listItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditing) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const listItem = this.parentNode;
  listItem.remove();
};

//Mark task completed
function taskCompleted() {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  todoTaskList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//The glue to hold it all together.

addTaskButton.addEventListener('click', addTask);

function bindTaskEvents(taskListItem, checkboxChangeHandler) {
  //select ListItems children
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkbox.onchange = checkboxChangeHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < todoTaskList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoTaskList.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTaskList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTaskList.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
