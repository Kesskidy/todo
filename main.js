const form = document.querySelector("#form form");
const input = document.querySelector("#field");
const tasklist = document.querySelector("#tasklist");
const themeToggle = document.querySelector("#theme-toggle");

// Load initial theme from localStorage
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-theme");
  themeToggle.textContent = "DARK MODE";
  themeToggle.classList.replace("bg-[#ccff00]", "bg-[#ff1493]");
  themeToggle.classList.replace("shadow-[6px_6px_0_#ff1493]", "shadow-[6px_6px_0_#ccff00]");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  if (isLight) {
    themeToggle.textContent = "DARK MODE";
    themeToggle.classList.replace("bg-[#ccff00]", "bg-[#ff1493]");
    themeToggle.classList.replace("shadow-[6px_6px_0_#ff1493]", "shadow-[6px_6px_0_#ccff00]");
  } else {
    themeToggle.textContent = "LIGHT MODE";
    themeToggle.classList.replace("bg-[#ff1493]", "bg-[#ccff00]");
    themeToggle.classList.replace("shadow-[6px_6px_0_#ccff00]", "shadow-[6px_6px_0_#ff1493]");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();

  if (value === "") return;

  const card = document.createElement("div");
  card.classList.add("card");
  const colors = ["#ff1493", "#00f632", "#00bfff"];
  const value_color = colors[Math.floor(Math.random() * colors.length)];
  console.log(value_color);
  card.innerHTML = `
      <div class="card-inner">
        <div class="card-front bg-[${value_color}]">
          <span class="wtf-text [.light-theme_&]:!bg-white [.light-theme_&]:!text-black [.light-theme_&]:!border-black">WTF?</span>
          <span class="card-hint [.light-theme_&]:!bg-white [.light-theme_&]:!text-black [.light-theme_&]:!border-black">CLICK 2 REVEAL</span>
        </div>
        <div class="card-back">
          <span class="task-text">${value}</span>
          <button class="nuke-btn">Nuke it</button>
        </div>
      </div>
    `;

  const nukeBtn = card.querySelector('.nuke-btn');
  nukeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    card.classList.add('exploding');
    setTimeout(() => {
      card.remove();
    }, 1000);
  });

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  tasklist.appendChild(card);
  input.value = "";
});