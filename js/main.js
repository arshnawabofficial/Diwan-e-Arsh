document.addEventListener("DOMContentLoaded", function(){


/* ===============================
   Mobile Menu Toggle
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
   Active Menu
=============================== */

const currentPage = location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link=>{
if(link.getAttribute("href") === currentPage){
link.classList.add("active-link");
}
});


/* ===============================
   Dark Mode
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

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
if(themeToggle) themeToggle.innerHTML="☀️";
}


/* ===============================
   Load Ashaar
=============================== */

const ashaarContainer=document.getElementById("ashaar-container");

if(ashaarContainer){

fetch("/content/ashaar.json")
.then(res=>res.json())
.then(data=>{

if(!data.items) return;

data.items.slice().reverse().forEach(item=>{

const el=document.createElement("div");
el.classList.add("ashaar");

el.innerHTML=`
<p>${item.text.replace(/\n/g,"<br>")}</p>
<hr>
`;

ashaarContainer.appendChild(el);

});

})
.catch(err=>console.log("Ashaar error",err));

}


/* ===============================
   Load Ghazal
=============================== */

const ghazalContainers=document.querySelectorAll(".ghazal-container");

if(ghazalContainers.length){

fetch("/content/ghazal.json")
.then(res=>res.json())
.then(data=>{

if(!data.items) return;

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

})
.catch(err=>console.log("Ghazal error",err));

}


/* ===============================
   Load Rubai
=============================== */

const rubaiContainer=document.getElementById("rubai-container");

if(rubaiContainer){

fetch("/content/rubai.json")
.then(res=>res.json())
.then(data=>{

if(!data.items) return;

data.items.slice().reverse().forEach(item=>{

const el=document.createElement("div");

el.classList.add("rubai");

el.innerHTML=`
<p>${item.text.replace(/\n/g,"<br>")}</p>
<hr>
`;

rubaiContainer.appendChild(el);

});

})
.catch(err=>console.log("Rubai error",err));

}


/* ===============================
   Load Kalaam
=============================== */

fetch("/content/kalaam.json")
.then(res=>res.json())
.then(data=>{

if(!data.items) return;

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

})
.catch(err=>console.log("Kalaam error",err));


/* ===============================
   Load Khutoot
=============================== */

const khutootContainer=document.getElementById("khutoot-container");

if(khutootContainer){

fetch("/content/khutoot.json")
.then(res=>res.json())
.then(data=>{

if(!data.items) return;

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

})
.catch(err=>console.log("Khutoot error",err));

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
