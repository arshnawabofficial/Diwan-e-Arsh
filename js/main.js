document.addEventListener("DOMContentLoaded", function(){


/* ===============================
   Mobile Menu Toggle (Premium)
=============================== */

const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if(menuToggle && navLinks){

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active");
menuToggle.classList.toggle("active");

if(menuToggle.classList.contains("active")){
menuToggle.innerHTML="✕";
document.body.style.overflow="hidden";
}else{
menuToggle.innerHTML="☰";
document.body.style.overflow="auto";
}

});

}



/* ===============================
   Close Menu On Click
=============================== */

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

if(navLinks){
navLinks.classList.remove("active");
document.body.style.overflow="auto";
}

if(menuToggle){
menuToggle.classList.remove("active");
menuToggle.innerHTML="☰";
}

});

});



/* ===============================
   Active Menu Highlight
=============================== */

const currentPage = location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link=>{

const linkPage = link.getAttribute("href");

if(linkPage === currentPage){
link.classList.add("active-link");
}

});



/* ===============================
   Dark Mode Toggle
=============================== */

const themeToggle=document.getElementById("theme-toggle");

if(themeToggle){

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
themeToggle.innerHTML="☀️";
}else{
localStorage.setItem("theme","light");
themeToggle.innerHTML="🌙";
}

});

}



/* ===============================
   Load Saved Theme
=============================== */

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){
document.body.classList.add("dark");
if(themeToggle) themeToggle.innerHTML="☀️";
}



/* ===============================
   Smooth Scroll
=============================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

const target=document.querySelector(this.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({
behavior:"smooth"
});

}

});

});



/* ===============================
   Fade Page Animation
=============================== */

document.body.classList.add("page-loaded");



/* ===============================
   Load Ashaar
=============================== */

const ashaarContainer=document.getElementById("ashaar-container");

if(ashaarContainer){

fetch("/content/ashaar.json")
.then(res=>res.json())
.then(data=>{

data.items.slice().reverse().forEach(item=>{

const el=document.createElement("div");

el.classList.add("ashaar");

el.innerHTML=`
<p>${item.text.replace(/\n/g,"<br>")}</p>
<hr>
`;

ashaarContainer.appendChild(el);

});

});

}



/* ===============================
   Load Ghazal
=============================== */

const ghazalContainers=document.querySelectorAll(".ghazal-container");

if(ghazalContainers.length>0){

fetch("/content/ghazal.json")
.then(res=>res.json())
.then(data=>{

data.items.slice().reverse().forEach(item=>{

const id=item.category
.toLowerCase()
.replace(/ /g,"-");

const section=document.querySelector(`#${id} .ghazal-container`);

if(section){

const el=document.createElement("div");

el.classList.add("ghazal");

el.innerHTML=`
<p>${item.text.replace(/\n/g,"<br>")}</p>
<hr>
`;

section.appendChild(el);

}

});

});

}



/* ===============================
   Load Rubai
=============================== */

const rubaiContainer=document.getElementById("rubai-container");

if(rubaiContainer){

fetch("/content/rubai.json")
.then(res=>res.json())
.then(data=>{

data.items.slice().reverse().forEach(item=>{

const el=document.createElement("div");

el.classList.add("rubai");

el.innerHTML=`
<p>${item.text.replace(/\n/g,"<br>")}</p>
<hr>
`;

rubaiContainer.appendChild(el);

});

});

}



/* ===============================
   Load Kalaam
=============================== */

fetch("/content/kalaam.json")
.then(res=>res.json())
.then(data=>{

data.items.slice().reverse().forEach(item=>{

const container=document.getElementById(item.section+"-container");

if(container){

const el=document.createElement("div");

el.classList.add("kalaam");

el.innerHTML=`
<p>${item.text.replace(/\n/g,"<br>")}</p>
`;

container.appendChild(el);

}

});

});



/* ===============================
   Load Khutoot
=============================== */

const khutootContainer=document.getElementById("khutoot-container");

if(khutootContainer){

fetch("/content/khutoot.json")
.then(res=>res.json())
.then(data=>{

data.items.slice().reverse().forEach(item=>{

const el=document.createElement("div");

el.classList.add("khutoot");

el.innerHTML=`

<div class="khutoot-header">
<div class="khutoot-date">${item.date||""}</div>
<div class="khutoot-title">${item.title||""}</div>
</div>

<div class="khutoot-content">
${item.text.replace(/\n/g,"<br>")}
</div>

<div class="khutoot-sign">
— Arsh
</div>

`;

khutootContainer.appendChild(el);

});

});

}



/* ===============================
   WhatsApp Form
=============================== */

const form=document.getElementById("appreciationForm");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const msg=document.getElementById("appreciationMessage").value;

const phone="917417775579";

window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,"_blank");

});

}


});