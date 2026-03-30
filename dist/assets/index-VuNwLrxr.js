(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#form form`),t=document.querySelector(`#field`),n=document.querySelector(`#tasklist`);e.addEventListener(`submit`,e=>{e.preventDefault();let r=t.value.trim();if(r===``)return;let i=document.createElement(`div`);i.classList.add(`card`);let a=[`#ff1493`,`#00f632`,`#00bfff`],o=a[Math.floor(Math.random()*a.length)];console.log(o),i.innerHTML=`
      <div class="card-inner">
        <div class="card-front bg-[${o}]">
          <span class="wtf-text">WTF?</span>
          <span class="card-hint">CLICK 2 REVEAL</span>
        </div>
        <div class="card-back">
          <span class="task-text">${r}</span>
          <button class="nuke-btn">Nuke it</button>
        </div>
      </div>
    `,i.querySelector(`.nuke-btn`).addEventListener(`click`,e=>{e.stopPropagation(),i.classList.add(`exploding`),setTimeout(()=>{i.remove()},1e3)}),i.addEventListener(`click`,()=>{i.classList.toggle(`flipped`)}),n.appendChild(i),t.value=``});