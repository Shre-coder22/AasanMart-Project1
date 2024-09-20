
// <=========================================================================>
// Select the input field, button, todo list, and filter dropdown from the DOM
// <=========================================================================>

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


// Show/hide the input bar when the 'add' button is clicked
document.getElementById('add-btn').addEventListener('click', function() {
    const inputBar = document.getElementById('input-bar');
   
    if (inputBar.style.display === 'none' || inputBar.style.display === '') {
        inputBar.style.display = 'flex';
    } else {
        inputBar.style.display = 'none';
    }
});



// <============>
// HELPER FUNCTIONS
// <============>

// Add a new todo item
const addTodo = (event) => {
    event.preventDefault(); 

    // Create a new 'div' to wrap the todo item
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); 

    // Create the 'li' element that contains the todo text
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; // Set the input text as the todo
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Save the todo to local storage
    saveLocalTodos(todoInput.value);

    // Create 'completed' button 
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Create 'trash' button for deletion
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Add the new todo item to the todo list
    todoList.appendChild(todoDiv);

    // Clear the input field for the next todo
    todoInput.value = "";
}

// Function to handle delete or check actions
const deleteCheck = (e) => {
    const item = e.target; 

    // Delete the todo if the trash button is clicked
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement; 
        todo.classList.add("slide"); 
        removeLocalTodos(todo); // Remove the todo from local storage
        todo.addEventListener("transitionend", function() { 
            todo.remove(); // Remove the todo from the DOM
        });
    }

    // Mark todo as complete if the complete button is clicked
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed"); 
    }
}

// Function to filter todos based on the selected option
const filterTodo = (e) => {
    const todos = todoList.childNodes; 
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete": 
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// <================================>
// Manipulating the DOM/Local Storage
// <================================>

    // Save todos to local storage
    const saveLocalTodos = (todo) => {
        let todos;
    // Check if there are existing todos in local storage
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo); 
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

// Load todos from local storage when the page is reloaded
const getLocalTodos = () => {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // For each stored todo, create a corresponding element in the DOM
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        // Append the todo to the list
        todoList.appendChild(todoDiv); 
    });
}

// Remove todos from local storage
const removeLocalTodos = (todo) => {
    let todos;
    // Check if there are existing todos in local storage
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// <======================================================================================>
// Event listeners for adding todos, filtering, and handling todo actions (complete/delete)
// <======================================================================================>

    document.addEventListener("DOMContentLoaded", getLocalTodos); 
    todoButton.addEventListener("click", addTodo); 
    todoList.addEventListener("click", deleteCheck); 
    filterOption.addEventListener("change", filterTodo); 
