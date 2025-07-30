import{a as f,S as d,i as n}from"./assets/vendor-DRgUjrIE.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const m="https://pixabay.com/api/",p="51404682-5edc27993faaf387ba494caba";function h(s){return f.get(m,{params:{key:p,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(t=>t.data).catch(t=>{throw console.error("Error fetching images:",t),t})}const c=document.querySelector(".gallery"),l=document.querySelector(".loader"),y=new d(".gallery a");function g(s){const t=s.map(r=>`
      <li class="gallery-item">
        <a href="${r.largeImageURL}">
          <img src="${r.webformatURL}" alt="${r.tags}" />
        </a>
        <div class="info">
          <p>Likes: ${r.likes}</p>
          <p>Views: ${r.views}</p>
          <p>Comments: ${r.comments}</p>
          <p>Downloads: ${r.downloads}</p>
        </div>
      </li>`).join("");c.insertAdjacentHTML("beforeend",t),y.refresh()}function L(){c.innerHTML=""}function b(){l.classList.remove("is-hidden")}function v(){l.classList.add("is-hidden")}const u=document.querySelector(".form"),w=u.querySelector('input[name="search-text"]');u.addEventListener("submit",s=>{s.preventDefault();const t=w.value.trim();if(!t){n.error({message:"Please enter a search term!"});return}L(),b(),h(t).then(r=>{r.hits.length===0?n.info({message:"Sorry, there are no images matching your search query. Please try again!"}):g(r.hits)}).catch(r=>{n.error({message:"Error fetching images. Try again later."}),console.error(r)}).finally(()=>{v()})});
//# sourceMappingURL=index.js.map
