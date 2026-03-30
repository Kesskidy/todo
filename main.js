const form = document.querySelector("#form form");
const input = document.querySelector("#field");
const tasklist = document.querySelector("#tasklist");

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
          <span class="wtf-text">WTF?</span>
          <span class="card-hint">CLICK 2 REVEAL</span>
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