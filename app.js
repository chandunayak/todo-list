let todoItemsContainer = document.getElementById("todoItemsContainer");
let onAddTodoButton = document.getElementById("onAddTodoButton");
let onSaveTodoButton = document.getElementById("onSaveTodoButton");

function getTodoItemsFromLocalStorage(){
    let stringifiedTodo = localStorage.getItem("todoList");
    let parsedTodo = JSON.parse(stringifiedTodo);

    if(parsedTodo === null){
        return [];
    }else {
        return parsedTodo;
    }
}

let todoList = getTodoItemsFromLocalStorage();

onSaveTodoButton.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}

function onDeleteTodo(todoId){
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteTodoIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(deleteTodoIndex,1);
}

function  onTodoStatusChange(checkboxId,labelId,todoId){
    let checkBoxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo){
        let eachTodoIndex = "todo" + eachTodo.uniqueNo;

        if(eachTodoIndex === todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];

    if(todoObject.isChecked === true){
        todoObject.isChecked = false;
    }else{
        todoObject.isChecked = true;
    }


}

function createAndAppendTodo(todo){
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputCheckbox = document.createElement("input");
    inputCheckbox.id=checkboxId;
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("todo-box");
    inputCheckbox.checked = todo.isChecked;

    inputCheckbox.onclick = function(){
        onTodoStatusChange(checkboxId,labelId,todoId);
    }

    todoElement.appendChild(inputCheckbox);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent =todo.text;
    labelElement.id =labelId;

    if(todo.isChecked === true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far","fa-trash-alt","delete-icon");

    deleteIcon.onclick = function(){
        onDeleteTodo(todoId);
    }

    deleteIconContainer.appendChild(deleteIcon);
}

onAddTodoButton.onclick = function(){
    let todosCount = todoList.length;

    let todoUserInput = document.getElementById("todoUserInput");
    let todoUserInputValue = todoUserInput.value;
    
    todosCount = todosCount + 1;
    let newTodo = {
        text : todoUserInputValue,
        uniqueNo : todosCount,
        isChecked :false
    }
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    todoUserInput.value="";
}


for(let eachTodo of todoList){
    createAndAppendTodo(eachTodo);
}


