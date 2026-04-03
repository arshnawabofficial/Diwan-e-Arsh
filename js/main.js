document.addEventListener("DOMContentLoaded", function() {
  
  
  
  
  /* ===============================
     Mobile Menu Toggle
  =============================== */
  
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  
  if (menuToggle && navLinks) {
    
    menuToggle.addEventListener("click", () => {
      
      navLinks.classList.toggle("active");
      
      if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active");
        menuToggle.innerHTML = "☰";
      } else {
        menuToggle.classList.add("active");
        menuToggle.innerHTML = "✕";
      }
      
    });
    
  }
  
  
  
  
  /* ===============================
     Close Menu On Link Click
  =============================== */
  
  document.querySelectorAll(".nav-links a").forEach(link => {
    
    link.addEventListener("click", () => {
      
      if (navLinks) {
        navLinks.classList.remove("active");
      }
      
      if (menuToggle) {
        menuToggle.classList.remove("active");
        menuToggle.innerHTML = "☰";
      }
      
    });
    
  });
  
  
  
  
  /* ===============================
     Dark Mode Toggle
  =============================== */
  
  const themeToggle = document.getElementById("theme-toggle");
  
  if (themeToggle) {
    
    themeToggle.addEventListener("click", () => {
      
      document.body.classList.toggle("dark");
      
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
      
    });
    
  }
  
  
  
  
  /* ===============================
     Load Saved Theme
  =============================== */
  
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
  
  
  
  
  /* ===============================
     Load Ashaar
  =============================== */
  
  const container = document.getElementById("ashaar-container");
  
  if (container) {
    
    fetch("/content/ashaar.json")
      .then(response => response.json())
      .then(data => {
        
        data.reverse().forEach(item => {
          
          const ashaar = document.createElement("div");
          
          ashaar.classList.add("ashaar");
          
          ashaar.innerHTML = `
<p>
${item.text.replace(/\n/g,"<br>")}
</p>
<hr>
`;
          
          container.appendChild(ashaar);
          
        });
        
      })
      .catch(error => console.log("Ashaar Load Error", error));
    
  }
  
  
  
});
/* ===============================
   Ghazal Smooth Scroll
=============================== */

const ghazalLinks = document.querySelectorAll(".ghazal-nav a");

if(ghazalLinks.length > 0){

ghazalLinks.forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();

const target = document.querySelector(this.getAttribute("href"));

if(target){
target.scrollIntoView({
behavior: "smooth"
});
}

});

});

}



/* ===============================
   Load Ghazal Dynamically
=============================== */

const ghazalContainers = document.querySelectorAll(".ghazal-container");

if(ghazalContainers.length > 0){

fetch("/content/ghazal.json")
.then(res => res.json())
.then(data => {


// Latest ghazal on top

data.reverse().forEach(item => {

const section = document.querySelector(`#${item.bab} .ghazal-container`);

if(section){

const ghazal = document.createElement("div");

ghazal.classList.add("ghazal");

ghazal.innerHTML = `
<p>
${item.text.replace(/\n/g,"<br>")}
</p>
<hr>
`;

section.appendChild(ghazal);

}

});

})
.catch(err => console.log("Ghazal Load Error", err));

}
/* ===============================
   Load Rubai Dynamically
=============================== */

const rubaiContainer = document.getElementById("rubai-container");

if(rubaiContainer){

fetch("/content/rubai.json")
.then(response => response.json())
.then(data => {


// Latest Rubai on Top

data.reverse().forEach(item => {

const rubai = document.createElement("div");

rubai.classList.add("rubai");

rubai.innerHTML = `
<p>
${item.text.replace(/\n/g,"<br>")}
</p>
<hr>
`;

rubaiContainer.appendChild(rubai);

});

})
.catch(error => console.log("Rubai Load Error", error));

}



/* ===============================
   Fade Animation on Scroll
=============================== */

const rubaiObserver = new IntersectionObserver((entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

document.querySelectorAll(".rubai").forEach((el) => {
rubaiObserver.observe(el);
});
const appreciationForm = document.getElementById("appreciationForm");

if(appreciationForm){

appreciationForm.addEventListener("submit", function(e){

e.preventDefault();

const message = document.getElementById("appreciationMessage").value;

const phone = "917417775579";

const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

window.open(url, "_blank");

});

}