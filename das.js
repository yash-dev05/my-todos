
const toggleBtn = document.getElementById("themeToggle");

//load saved theme
if (localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}
//toggle theme
togglebtn.addeventListener("click", () => {
    document.body.classList.tooogle("dark");//toggle the "dark" class on the body

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
})

const addTodoButton = document.getElementById("addTodoButton");
const inputTag = document.getElementById("todoInput");
const todolistUl = document.getElementById("todoList");

let todos = [];
const todostring = localStorage.getItem("todos");
if (todostring) {
    todos = JSON.parse(todostring);//convert the string back to an array so that we can work with it
}

const populateTodos = () => {
    let html = "";//we will build the html string here and then add it to the ul

    for (let i = 0; i < todos.length; i++)//i here is the index of the current todo in the array and we will use it to create unique ids for the checkboxes and to indentify which todo is being interacted with when the checkbox is clicked
        
    {const todo = todos[i];
    const checkboxId = `cbx-${i}`;//create a unique id for the checkbox using the index
        //here $ is used to insert the value of the variable into the string and the backticks are used to create a template literal which allows us to write multi-line strings and use string interpolation
        //$     {todo.isCompleted ? "completed" : ""} is a ternary operator that adds the "completed" class if the todo is completed and each word of the ternary operator is - $ {condition} ? {value if true} : {value if false}
        html += `<li class="todo-item ${todo.isCompleted ? "completed" : ""}">

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
            </li>`;}
            todolistUl.innerHTML = html;//add the built html string to the ul
    }

addTodoButton.addEventListener("click", () => {
    const todoText = inputTag.value.trim();//get the value of the input and trim any whitespace from the beginning and end
    if (todoText !== "") return;//if the input is empty do nothing

    inputTag.value = "";//clear the input meaning set its value to an empty string

    const todo = {
        title: todoText,//set the title of the todo to the text from the input  
        isCompleted: false//set the isCompleted property to false by default when a new todo is created
    }
    todos.push(todo);//add the new todo to the array of todos
    localStorage.setItem("todos", JSON.stringify(todos));//save the updated array of todos to local storage by converting it to a string using JSON.stringify
    populateTodos();//update the todo list display
})


todolistUl.addEventListener("change", (event) => {
    const target = event.target;//get the element that triggered the event
    if (!target.classList.contains("todo-checkbox")) return;//if the changed element is not a checkbox do nothing

    const index = Number(target.dataset.index);//get the index of the todo from the data-index attribute of the checkbox and convert it to a number
    if (Number.isNaN(index) || !todos[index]) return;//if the index is not a number or if there is no todo at that index do nothing

    todos[index].isCompleted = target.checked;  //update the isCompleted property of the corresponding todo based on whether the checkbox is checked or not
    localStorage.setItem("todos", JSON.stringify(todos));//save the updated array of todos to local storage
    populateTodos();      //update the todo list display to reflect the change in completion status
});

populateTodos();

