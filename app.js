// ===============================
// THEME TOGGLE SYSTEM
// ===============================

const toggleBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";

    } else {

        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";

    }

});


// ===============================
// TODO STORAGE + ELEMENT REFERENCES
// ===============================

const addTodoButton = document.getElementById("addTodoButton");
const inputTag = document.getElementById("todoInput");
const todolistUl = document.getElementById("todoList");

let todos = [];

// LOAD TODOS FROM LOCAL STORAGE
const todosString = localStorage.getItem("todos");

if (todosString) {

    todos = JSON.parse(todosString);

}


// ===============================
// FILTER STATE (ADDED)
// This remembers which filter is active
// ===============================

let currentFilter = "all";


// ===============================
// MAIN RENDER FUNCTION (ADDED)
// Replaces populateTodos() everywhere
// Fixes filter breaking issue
// ===============================

const renderTodos = () => {

    let filteredTodos = [];

    // APPLY CURRENT FILTER

    if (currentFilter === "active") {

        filteredTodos = todos.filter(todo => !todo.isCompleted);

    }

    else if (currentFilter === "completed") {

        filteredTodos = todos.filter(todo => todo.isCompleted);

    }

    else {

        filteredTodos = todos;

    }

    let html = "";

    filteredTodos.forEach(todo => {

        // IMPORTANT FIX:
        // Use ORIGINAL INDEX instead of filtered index

        const index = todos.indexOf(todo);

        const checkboxId = `cbx-${index}`;

        html += `

        <li class="todo-item ${todo.isCompleted ? "completed" : ""}">

            <div class="checkbox-wrapper-46">

                <input
                type="checkbox"
                class="inp-cbx todo-checkbox"
                id="${checkboxId}"
                data-index="${index}"
                ${todo.isCompleted ? "checked" : ""}
                />

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

    });

    todolistUl.innerHTML = html;

};


// ===============================
// ADD TODO FUNCTIONALITY
// ===============================

addTodoButton.addEventListener("click", () => {

    const todoText = inputTag.value.trim();

    if (!todoText) return;

    inputTag.value = "";

    const todo = {

        title: todoText,
        isCompleted: false

    };

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    renderTodos(); // FIXED (was populateTodos)

    updateItemsLeft();

});


// ===============================
// CHECKBOX TOGGLE FUNCTIONALITY
// ===============================

todolistUl.addEventListener("change", (event) => {

    const target = event.target;

    if (!target.classList.contains("todo-checkbox")) return;

    const index = Number(target.dataset.index);

    if (Number.isNaN(index) || !todos[index]) return;

    todos[index].isCompleted = target.checked;

    localStorage.setItem("todos", JSON.stringify(todos));

    renderTodos(); // FIXED

    updateItemsLeft();

});


// ===============================
// DELETE TODO FUNCTIONALITY
// ===============================

todolistUl.addEventListener("click", (event) => {

    if (!event.target.classList.contains("delete-btn")) return;

    const todoItem = event.target.closest("li");

    const index = Number(
        todoItem.querySelector(".todo-checkbox").dataset.index
    );

    if (Number.isNaN(index) || !todos[index]) return;

    todos.splice(index, 1);

    localStorage.setItem("todos", JSON.stringify(todos));

    renderTodos(); // FIXED

    updateItemsLeft();

});


// ===============================
// ITEMS LEFT COUNTER
// ===============================

const itemsLeft = document.getElementById("itemsLeft");

const updateItemsLeft = () => {

    const count = todos.filter(todo => !todo.isCompleted).length;

    itemsLeft.textContent =
        `${count} item${count !== 1 ? "s" : ""} left`;

};


// ===============================
// CLEAR COMPLETED BUTTON
// ===============================

const clearBtn = document.getElementById("clearCompletedBtn");

clearBtn.addEventListener("click", () => {

    todos = todos.filter(todo => !todo.isCompleted);

    localStorage.setItem("todos", JSON.stringify(todos));

    renderTodos(); // FIXED

    updateItemsLeft();

});


// ===============================
// FILTER BUTTON FUNCTIONALITY
// FIXED VERSION (IMPORTANT)
// ===============================

const filterBtn = document.querySelectorAll(".filter-btn");

filterBtn.forEach(button => {

    button.addEventListener("click", () => {

        // SAVE CURRENT FILTER
        currentFilter = button.dataset.filter;

        // REMOVE ACTIVE FROM ALL BUTTONS

        filterBtn.forEach(btn =>
            btn.classList.remove("active")
        );

        // ADD ACTIVE CLASS TO CLICKED BUTTON

        button.classList.add("active");

        // RENDER WITH FILTER APPLIED

        renderTodos();

    });

});


// ===============================
// INITIAL PAGE LOAD RENDER
// ===============================

renderTodos();

updateItemsLeft();