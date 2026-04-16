📌 My Todos — Smart Todo Web App

A clean, responsive, and persistent Todo List Web Application built using Vanilla JavaScript, HTML, and CSS.
It helps users stay organized by managing daily tasks with completion tracking, theme switching, and local storage persistence.

This project demonstrates strong fundamentals of DOM manipulation, event handling, localStorage usage, and UI state management without using any frameworks.


## Live Demo

https://yash-dev05.github.io/my-todos/

✨ Features

✅ Add new tasks
✅ Mark tasks as completed
✅ Delete individual tasks
✅ Persistent storage using localStorage
✅ Dark / Light theme toggle 🌙☀️
✅ Dynamic "items left" counter
✅ Clear UI with animated custom checkboxes
✅ Responsive layout

🧠 What This Project Demonstrates

This project was built to strengthen:

JavaScript fundamentals
DOM manipulation
Event delegation
Dynamic UI rendering
LocalStorage persistence
State synchronization with UI
Template literals usage
Clean UI logic structuring

It avoids frameworks intentionally to focus on core frontend engineering skills.

📂 Project Structure
my-todos/
│
├── index.html
├── app.js
├── style.css (optional if separated)
└── README.md
⚙️ How It Works (Under the Hood)

1️⃣ Todos Stored as Objects

Each todo is stored like:

{
  title: "Study JavaScript",
  isCompleted: false
}

2️⃣ Data Persistence

Tasks are saved using:

localStorage.setItem("todos", JSON.stringify(todos));

This ensures tasks remain after refreshing the browser.

3️⃣ Dynamic Rendering

Todos are rendered using:

populateTodos()

which rebuilds the UI based on the latest app state.

4️⃣ Event Delegation

Instead of attaching listeners to every checkbox individually:

todolistUl.addEventListener("change", handler)

This improves performance and scalability.

🌙 Theme Switching Logic

The app remembers the user's preferred theme:

localStorage.setItem("theme", "dark")

Theme is restored automatically when the page reloads.

📊 Items Left Counter Logic

Remaining tasks are calculated dynamically:

todos.filter(todo => !todo.isCompleted).length

Updates instantly after:

adding tasks
deleting tasks
completing tasks
🚀 How to Run Locally

Clone the repository:

git clone https://github.com/yash-dev05/my-todos.git

Open:

index.html

in your browser.

No installation required ✅

🛠 Tech Stack

Frontend

HTML5
CSS3
JavaScript (ES6)

No frameworks used intentionally.

📈 Future Improvements (Planned)

Possible upgrades:

Edit existing tasks
Drag & drop reordering
Task categories
Due date support
Search functionality
Backend integration
User authentication
Cloud sync

🎯 Why I Built This Project

This project was created to strengthen my understanding of:

real-world UI state handling
persistent frontend storage
clean modular JavaScript structure
event-driven architecture

It represents a foundational step toward building larger intelligent web apps like Folic AI.

👨‍💻 Author

Yash Srivastava

Aspiring engineer building practical, scalable web and AI-powered applications.

GitHub:

https://github.com/yash-dev05
⭐ If You Like This Project

Consider starring the repository — it helps support future development!
