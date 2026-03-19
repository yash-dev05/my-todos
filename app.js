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

    const addTodoButton = document.getElementById("addTodoButton");
    const inputTag = document.getElementById("todoInput");

    let todoText;

    addTodoButton.addEventListener("click",()=>{ console.log("Button Clicked")
        todoText = inputTag.value;
        console.log(todoText);
        inputTag.value = "";
     })
