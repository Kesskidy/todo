const form = document.querySelector("#form form");
const input = document.querySelector("#field");
const tasklist = document.querySelector("#tasklist");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();

    if (value === "") return;

    const task = document.createElement("div");
    const span = document.createElement("span");

    span.textContent = value;

    task.appendChild(span);
    task.classList.add("task-item");

    tasklist.appendChild(task);
    input.value = "";
});