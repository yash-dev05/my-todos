const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");//toggle the "dark" class on the body

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
});

const addTodoButton = document.getElementById("addTodoButton");
const inputTag = document.getElementById("todoInput");
const todolistUl = document.getElementById("todoList");

let todos = [];
const todosString = localStorage.getItem("todos");
if (todosString) {
    todos = JSON.parse(todosString);//convert the string back to an array so that we can work with it
}

const populateTodos = () => {
    let html = "";//we will build the html string here and then add it to the ul

    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        const checkboxId = `cbx-${i}`;

        html += `
            <li class="todo-item ${todo.isCompleted ? "completed" : ""}">
                <div class="checkbox-wrapper-46">
                    <input type="checkbox" class="inp-cbx todo-checkbox" id="${checkboxId}" data-index="${i}" ${todo.isCompleted ? "checked" : ""} />
                    <label for="${checkboxId}" class="cbx">
                        <span>
                            <svg viewBox="0 0 12 10" height="10px" width="12px">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg>
                        </span>
                    </label>
                </div>
                <span class="todo-text">${todo.title}</span>
                <button class="delete-btn">&times;</button>
            </li>`;
    }

    todolistUl.innerHTML = html;
};

addTodoButton.addEventListener("click", () => {
    const todoText = inputTag.value.trim();
    if (!todoText) return;

    inputTag.value = "";

    const todo = {
        title: todoText,
        isCompleted: false,
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    populateTodos();
    updateItemsLeft();
});

todolistUl.addEventListener("change", (event) => {
    const target = event.target;
    if (!target.classList.contains("todo-checkbox")) return;

    const index = Number(target.dataset.index);
    if (Number.isNaN(index) || !todos[index]) return;

    todos[index].isCompleted = target.checked;
    localStorage.setItem("todos", JSON.stringify(todos));
    populateTodos();
    updateItemsLeft();
});

populateTodos();

//delete button functionality
const deleteBtn = document.querySelector(".delete-btn");
todolistUl.addEventListener("click", (event) => {
    if (!event.target.classList.contains("delete-btn")) return;//if the clicked element is not a delete button do nothing   
    const todoItem = event.target.closest("li");//find the closest li element which is the todo item that contains the delete button
    const index = Number(todoItem.querySelector(".todo-checkbox").dataset.index);//get the index of the todo from the data-index attribute of the checkbox within the todo item and convert it to a number
    if (Number.isNaN(index) || !todos[index]) return;//if the index is not a number or if there is no todo at that index do nothing
    todos.splice(index, 1);//remove the todo at the specified index from the array of todos
    localStorage.setItem("todos", JSON.stringify(todos));//save the updated array of todos to local storage
    populateTodos();//update the todo list display to reflect the removed todo
    updateItemsLeft();
}); 

//number of items left functionality
const itemsLeft = document.getElementById("itemsLeft");
const updateItemsLeft = () => {
    const count = todos.filter(todo => !todo.isCompleted).length;//count the number of todos that are not completed
    itemsLeft.textContent = `${count} item${count !== 1 ? "s" : ""} left`;//update the text content of the items left element to show the count of items left
}
//but right now the items left count is not updating when we add, complete, or delete todos. To fix this, we need to call the updateItemsLeft function whenever we make changes to the todos array. We can do this by adding calls to updateItemsLeft in the appropriate places in our code:

//call the function to update the items left count when the page loads
updateItemsLeft();

//clear completed functionality
const clearBtn = document.getElementById("clearCompletedBtn");
clearBtn.addEventListener("click", () => {  
    todos = todos.filter(todo => !todo.isCompleted);//filter out the completed todos and keep only the ones that are not completed
    localStorage.setItem("todos", JSON.stringify(todos));//save the updated array of todos to local storage
    populateTodos();    
    updateItemsLeft();
});
