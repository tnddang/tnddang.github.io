
const taskInput				= document.getElementById("new-task");//Add a new task
const addButton				= document.getElementsByTagName("button")[0];//'Add' button
const incompleteTaskHolder	= document.getElementById("incomplete-tasks");//ul of incomplete-tasks
const completedTasksHolder	= document.getElementById("completed-tasks");//ul completed-tasks
const errorMessage			= document.getElementById("error");
const ZERO					= 0;

/* Create a new task item. */
const createNewTaskElement=function(taskString){

	//Create new elements
	const listItem 		= document.createElement("li");
	const checkBox		= document.createElement("input");
	const label			= document.createElement("label");
	const editInput		= document.createElement("input");//text
	const editButton	= document.createElement("button");//edit button
	const deleteButton	= document.createElement("button");//delete button

	//Load the elements
	label.innerText=taskString;
	checkBox.type = "checkbox";
	editInput.type = "text";
	editButton.innerText = "Edit";//innerText encodes special characters, HTML does not.
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	//Add to document
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);

	return listItem;
}

function isEmpty(input) {
	return (!input || input.length === ZERO);
}

/* Add a task. */
const addTask = function() {

	//Null check
	if (isEmpty(taskInput.value)) {
		errorMessage.innerHTML = "Input cannot be empty!";
		return;
	} else if (!isEmpty(taskInput.value)) {
		errorMessage.innerHTML = "";
	}

	let listItem = createNewTaskElement(taskInput.value);

	//Add listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	console.log("Task added.");
	taskInput.value = "";
}

/* Edit an existing task. */
const editTask = function() {

	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");
		//If class of the parent is .editmode
		if(containsClass){

		//switch to .editmode
		//label becomes the inputs value.
			label.innerText=editInput.value;
		}else{
			editInput.value=label.innerText;
		}

		//toggle .editmode on the parent.
		listItem.classList.toggle("editMode");
}

/* Delete a task. */
const deleteTask = function() {
		console.log("Task deleted.");

		let listItem = this.parentNode; //li element
		let ul = listItem.parentNode;

		//Remove the parent list item from the ul
		ul.removeChild(listItem);
}

/* Mark the task as complete. Checkbox event handler. */
const taskCompleted = function() {
		console.log("Task completed.");
	
	//Strike through text and add to completed tasks
	let listItem = this.parentNode;//li element
	completedTasksHolder.appendChild(listItem);

	bindTaskEvents(listItem, taskIncomplete);
}

/* Mark the task as incomplete. Checkbox event handler. */
const taskIncomplete = function() {
	console.log("Task incomplete.");

	//Unstrike text and add to to do list
	let listItem = this.parentNode;//li element
	incompleteTaskHolder.appendChild(listItem);

	bindTaskEvents(listItem,taskCompleted);
}

/* Add task to list on click. */
addButton.addEventListener("click",addTask);

/* Assign the necessary functions to each li element. Edit, delete, checkbox. */
const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
	console.log("Assign functions to checkbox, edit button, and delete button.");

	//select ListItems children
	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");


			//Bind editTask to edit button.
			editButton.onclick = editTask;
			//Bind deleteTask to delete button.
			deleteButton.onclick = deleteTask;
			//Bind taskCompleted to checkBoxEventHandler.
			checkBox.onchange = checkBoxEventHandler;
}

/* Loop over list of incompleted tasks. */
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

	//Bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

/* Loop over list of completed tasks. */
for (let i = 0; i < completedTasksHolder.children.length; i++) {
	//Bind events to list items chldren (tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}