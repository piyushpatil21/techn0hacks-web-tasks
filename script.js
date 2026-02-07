/* ---------------- THEME TOGGLE ---------------- */
const themeToggle = document.querySelector(".theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

/* ---------------- CURSOR GLOW ---------------- */
const cursorGlow = document.createElement("div");
cursorGlow.classList.add("cursor-glow");
document.body.appendChild(cursorGlow);
document.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

/* ---------------- CURSOR PARTICLES ---------------- */
document.addEventListener("mousemove", e => {
  const particle = document.createElement("div");
  particle.classList.add("cursor-particle");
  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 500);
});

/* ---------------- 3D PROFILE CARD TILT ---------------- */
const card = document.querySelector(".profile-card");
document.addEventListener("mousemove", e => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width/2;
  const y = e.clientY - rect.top - rect.height/2;
  card.style.transform = `rotateY(${x*0.05}deg) rotateX(${-y*0.05}deg)`;
});
card.addEventListener("mouseleave", () => {
  card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

/* ---------------- TYPING EFFECT ---------------- */
class TypeWriter {
  constructor(txtElement, words, wait = 2000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length-1) : fullTxt.substring(0, this.txt.length+1);
    this.txtElement.innerHTML = `<span class="typing">${this.txt}</span>`;
    let typeSpeed = 100;
    if(this.isDeleting) typeSpeed /= 2;
    if(!this.isDeleting && this.txt === fullTxt){
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 200;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const txtElement = document.querySelector(".typing");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  new TypeWriter(txtElement, words);
});

/* ---------------- SCROLL REVEAL ---------------- */
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const trigger = window.innerHeight*0.85;
    if(top < trigger) el.classList.add("active");
  });
});

/* ---------------- MODAL HANDLER ---------------- */
const modals = document.querySelectorAll(".modal");
const modalBtns = document.querySelectorAll("[data-modal-target]");
const modalClose = document.querySelectorAll(".modal-close");

modalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = document.querySelector(btn.dataset.modalTarget);
    modal.classList.add("active");
  });
});
modalClose.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").classList.remove("active");
  });
});
window.addEventListener("click", e => {
  modals.forEach(modal => {
    if(e.target === modal) modal.classList.remove("active");
  });
});

/* ---------------- CONTACT FORM SUBMISSION ---------------- */
const contactForm = document.querySelector(".contact-form");
contactForm?.addEventListener("submit", e => {
  e.preventDefault();
  const name = contactForm.querySelector("input[name='name']").value;
  const email = contactForm.querySelector("input[name='email']").value;
  const message = contactForm.querySelector("textarea[name='message']").value;
  alert(`Thanks ${name}! Your message has been sent successfully. 🚀`);
  contactForm.reset();
});

/* ---------------- PARTICLE BACKGROUND ---------------- */
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
for(let i=0;i<120;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*2+1,
    dx: (Math.random()-0.5)*1.2,
    dy: (Math.random()-0.5)*1.2
  });
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if(p.x<0||p.x>canvas.width) p.dx*=-1;
    if(p.y<0||p.y>canvas.height) p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = "rgba(56,189,248,0.7)";
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener("resize", () => { canvas.width=window.innerWidth; canvas.height=window.innerHeight; });

/* ---------------- VOICE INTRO ---------------- */
const msg = new SpeechSynthesisUtterance(
  "Hi! I am Piyush Patil, an IT Engineer and Software Developer. Welcome to my ultra-cyberpunk portfolio!"
);
msg.rate = 1;   // speed of speech
msg.pitch = 1.2; // pitch of voice
window.speechSynthesis.speak(msg);
