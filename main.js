const form = document.querySelector("#form form");
const input = document.querySelector("#field");
const tasklist = document.querySelector("#tasklist");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();

    if (value === "") return;

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <span class="wtf-text">WTF?</span>
          <span class="card-hint">CLICK 2 REVEAL</span>
        </div>
        <div class="card-back">
          <span class="task-text">${value}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    tasklist.appendChild(card);
    input.value = "";
});