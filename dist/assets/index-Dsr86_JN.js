(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#form form`),t=document.querySelector(`#field`),n=document.querySelector(`#tasklist`),r=document.querySelector(`#theme-toggle`),i=[];try{let e=localStorage.getItem(`wtf_tasks`);e&&(i=JSON.parse(e)||[])}catch{console.error(`Failed to parse tasks`),i=[]}localStorage.getItem(`theme`)===`light`&&(document.body.classList.add(`light-theme`),r.textContent=`DARK MODE`),r.addEventListener(`click`,()=>{document.body.classList.toggle(`light-theme`);let e=document.body.classList.contains(`light-theme`);localStorage.setItem(`theme`,e?`light`:`dark`),e?r.textContent=`DARK MODE`:r.textContent=`LIGHT MODE`});function a(){localStorage.setItem(`wtf_tasks`,JSON.stringify(i))}function o(e=null){if(n.innerHTML=``,i.length===0){n.innerHTML=`
            <div class="w-full col-span-full flex justify-center items-center py-10 md:py-20 pop-in">
                <h2 class="empty-state">
                    YOU HAVE NOTHING TO DO?
                    <br><span class="text-[#00f632] shadow-none">BULLSHIT.</span>
                    <br>ADD A TASK!
                </h2>
            </div>
        `;return}i.forEach(t=>{let r=document.createElement(`div`);r.classList.add(`card`),t.id===e&&r.classList.add(`pop-in`),t.flipped&&r.classList.add(`flipped`),r.dataset.id=t.id,r.innerHTML=`
          <div class="card-inner">
            <div class="card-front bg-[${t.color}]">
              <span class="wtf-text">WTF?</span>
              <span class="card-hint">CLICK 2 REVEAL</span>
            </div>
            <div class="card-back">
              <span class="task-text">${t.text}</span>
              <button class="nuke-btn">Nuke it</button>
            </div>
          </div>
        `,r.querySelector(`.nuke-btn`).addEventListener(`click`,e=>{e.stopPropagation(),r.classList.add(`exploding`),setTimeout(()=>{let e=document.createElement(`div`);e.className=`fixed inset-0 bg-white z-[9999] pointer-events-none mix-blend-difference`,e.style.animation=`nuclearFlash 0.8s ease-out forwards`,document.body.appendChild(e),document.body.classList.add(`screen-shake`),setTimeout(()=>{e.remove(),document.body.classList.remove(`screen-shake`)},800)},360),setTimeout(()=>{i=i.filter(e=>e.id!==t.id),a(),o()},600)}),r.addEventListener(`click`,()=>{r.classList.toggle(`flipped`),t.flipped=r.classList.contains(`flipped`)}),n.appendChild(r)})}e.addEventListener(`submit`,e=>{e.preventDefault();let n=t.value.trim();if(n===``){t.classList.add(`shake`),setTimeout(()=>t.classList.remove(`shake`),400);return}let r=[`#ff1493`,`#00f632`,`#00bfff`],s=r[Math.floor(Math.random()*r.length)],c={id:Date.now(),text:n,color:s};i.push(c),a(),o(c.id),t.value=``}),o();