const form = document.querySelector("#form form");
const input = document.querySelector("#field");
const tasklist = document.querySelector("#tasklist");
const themeToggle = document.querySelector("#theme-toggle");

let tasks = [];
try {
    const saved = localStorage.getItem("wtf_tasks");
    if (saved) tasks = JSON.parse(saved) || [];
} catch (e) {
    console.error("Failed to parse tasks");
    tasks = [];
}

// Load initial theme from localStorage
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "DARK MODE";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    
    if (isLight) {
        themeToggle.textContent = "DARK MODE";
    } else {
        themeToggle.textContent = "LIGHT MODE";
    }
});

function saveTasks() {
    localStorage.setItem("wtf_tasks", JSON.stringify(tasks));
}

function renderTasks(animateId = null) {
    tasklist.innerHTML = "";

    if (tasks.length === 0) {
        tasklist.innerHTML = `
            <div class="w-full flex justify-center items-center py-10 md:py-20 pop-in">
                <h2 class="empty-state">
                    YOU HAVE NOTHING TO DO?
                    <br><span class="text-[#00f632] shadow-none">BULLSHIT.</span>
                    <br>ADD A TASK!
                </h2>
            </div>
        `;
        return;
    }

    tasks.forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");
        if (task.id === animateId) {
            card.classList.add("pop-in");
        }
        if (task.flipped) {
            card.classList.add("flipped");
        }
        card.dataset.id = task.id;
        
        card.innerHTML = `
          <div class="card-inner">
            <div class="card-front bg-[${task.color}]">
              <span class="wtf-text">WTF?</span>
              <span class="card-hint">CLICK 2 REVEAL</span>
            </div>
            <div class="card-back">
              <span class="task-text">${task.text}</span>
              <button class="nuke-btn">Nuke it</button>
            </div>
          </div>
        `;

        const nukeBtn = card.querySelector('.nuke-btn');
        nukeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          card.classList.add('exploding');
          setTimeout(() => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
          }, 350);
        });

        card.addEventListener("click", () => {
          card.classList.toggle("flipped");
          task.flipped = card.classList.contains("flipped");
        });

        tasklist.appendChild(card);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();

    if (value === "") {
        input.classList.add("shake");
        setTimeout(() => input.classList.remove("shake"), 400);
        return;
    }

    const colors = ["#ff1493", "#00f632", "#00bfff"];
    const value_color = colors[Math.floor(Math.random() * colors.length)];
    
    const newTask = {
        id: Date.now(),
        text: value,
        color: value_color
    };
    
    tasks.push(newTask);

    saveTasks();
    renderTasks(newTask.id);
    input.value = "";
});

// Initial render
renderTasks();