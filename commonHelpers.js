import{a as u,i as l,S as f}from"./assets/vendor-6e0bf343.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const p="https://pixabay.com/api/",d="43225005-d66d61a579372833bf726388e";async function y(i){const o=new URLSearchParams({key:d,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0});try{return(await u.get(`${p}?${o}`)).data}catch(r){throw console.error("Error fetching images:",r),r}}function g(i){return i.map(({webformatURL:o,largeImageURL:r,tags:n,views:e,downloads:t,likes:s,comments:m})=>`
    <li class="imageItme">
    <a class="gallery-link" href="${r}">
    <img class="imgAdd" src="${o}" alt="${n}">
    <ul class="imgInfo">
    <li class="info_item"><p>Likes</p>${s}</li>
    <li class="info_item"><p>Views</p>${e}</li>
    <li class="info_item"><p>Comments</p>${m}</li>
    <li class="info_item"><p>Downloads</p>${t}</li>
    </ul>
    </a>
    </li>
`).join("")}const h=document.querySelector(".form"),L=document.querySelector(".gallery"),c=document.getElementById("loader"),a=document.querySelector("#nameImg");h.addEventListener("submit",b);function b(i){if(i.preventDefault(),console.log(a.value),a.value===""){l.error({position:"topRight",message:"The field is empty! Enter image name!"});return}const{nameImg:o}=i.currentTarget.elements;c.style.display="inline-block",y(o.value).then(r=>{r.total===0&&l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),L.innerHTML=g(r.hits),S()}).catch(r=>alert(r)).finally(()=>{c.style.display="none"}),a.value=""}function S(){new f(".gallery a",{overlayOpacity:.8,scrollZoom:!1,captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
