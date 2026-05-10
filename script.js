console.log("JS WORKING");

const text =
"Creative AI Developer • Cinematic Editor • Visual Storyteller";

let index = 0;

function typeEffect(){

  if(index < text.length){

    document.querySelector(".typing").innerHTML +=
    text.charAt(index);

    index++;

    setTimeout(typeEffect,70);
  }
}

if(document.querySelector(".typing")){

  typeEffect();

}


// =========================
// VIDEO INTERACTION
// =========================

const videos =
document.querySelectorAll(".video-card video");

videos.forEach(video => {

  // PLAY ON HOVER

  video.addEventListener("mouseenter",()=>{

    // DON'T autoplay fullscreen video

    if(
      !document
      .querySelector(".video-lightbox")
      .classList.contains("active")
    ){

      video.play();

    }

  });

  // RESET ON LEAVE

  video.addEventListener("mouseleave",()=>{

    // ONLY reset if fullscreen NOT open

    if(
      !document
      .querySelector(".video-lightbox")
      .classList.contains("active")
    ){

      video.pause();

      video.currentTime = 0;

      video.load();

      video.muted = true;

    }

  });

  // CLICK SOUND

  video.addEventListener("click",()=>{

    video.muted = !video.muted;

  });

});


// =========================
// LIQUID GLASS CURSOR
// =========================

const cursor =
document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;


// TRACK MOUSE

document.addEventListener("mousemove",(e)=>{

  mouseX = e.clientX;
  mouseY = e.clientY;

});


// SMOOTH CURSOR

function animateCursor(){

  currentX += (mouseX - currentX) * 0.18;

  currentY += (mouseY - currentY) * 0.18;

  cursor.style.left =
  currentX + "px";

  cursor.style.top =
  currentY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();


// CURSOR HOVER

const hoverItems =
document.querySelectorAll(
"a, button, .video-card, .gallery-item, .card, .btn"
);

hoverItems.forEach(item=>{

  item.addEventListener("mouseenter",()=>{

    cursor.classList.add("active");

  });

  item.addEventListener("mouseleave",()=>{

    cursor.classList.remove("active");

  });

});


// ======================
// IMAGE LIGHTBOX
// ======================

const allImages =
document.querySelectorAll(".gallery img");

const lightbox =
document.querySelector(".lightbox");

const lightboxImage =
document.querySelector(".lightbox-img");

const closeBtn =
document.querySelector(".close-lightbox");


// OPEN LIGHTBOX

allImages.forEach((img)=>{

  img.addEventListener("click",()=>{

    lightbox.style.display = "flex";

    lightboxImage.src = img.src;

  });

});


// CLOSE BUTTON

closeBtn.addEventListener("click",()=>{

  lightbox.style.display = "none";

});


// CLOSE OUTSIDE IMAGE

lightbox.addEventListener("click",(e)=>{

  if(e.target === lightbox){

    lightbox.style.display = "none";

  }

});


// =========================
// MAGNETIC BUTTON
// =========================

const magneticBtn =
document.querySelector(".btn");

if(magneticBtn){

  magneticBtn.addEventListener("mousemove",(e)=>{

    const rect =
    magneticBtn.getBoundingClientRect();

    const x =
    e.clientX - rect.left - rect.width / 2;

    const y =
    e.clientY - rect.top - rect.height / 2;

    magneticBtn.style.transform =
    `translate(${x * 0.18}px, ${y * 0.18}px)`;

  });


  magneticBtn.addEventListener("mouseleave",()=>{

    magneticBtn.style.transform =
    "translate(0px,0px)";

  });

}


/// =========================
// VIDEO LIGHTBOX
// =========================

const previewVideos =
document.querySelectorAll(".video-card video");

const videoLightbox =
document.querySelector(".video-lightbox");

const lightboxVideo =
document.querySelector(".lightbox-video");

const closeVideoLightbox =
document.querySelector(".close-video-lightbox");


// =========================
// PREVIEW MODE
// =========================

previewVideos.forEach((video)=>{

  // ALWAYS muted in preview
  video.muted = true;

  // PLAY ON HOVER

  video.addEventListener("mouseenter",()=>{

    // DON'T play preview if lightbox open

    if(
      !videoLightbox.classList.contains("active")
    ){

      video.play();

    }

  });

  // STOP ON LEAVE

  video.addEventListener("mouseleave",()=>{

    // DON'T reset if fullscreen open

    if(
      !videoLightbox.classList.contains("active")
    ){

      video.pause();

      video.currentTime = 0;

    }

  });

  // OPEN FULLSCREEN

  video.addEventListener("click",()=>{

    // STOP ALL PREVIEW VIDEOS

    previewVideos.forEach((v)=>{

      v.pause();

      v.currentTime = 0;

    });

    // GET SOURCE

    const source =
    video.querySelector("source").src;

    // SET VIDEO

    lightboxVideo.src = source;

    // SHOW LIGHTBOX

    videoLightbox.classList.add("active");

    // ENABLE PLAYER

    lightboxVideo.controls = true;

    lightboxVideo.muted = false;

    lightboxVideo.currentTime = 0;

    // PLAY FULL VIDEO

    lightboxVideo.play();

  });

});


// =========================
// CLOSE BUTTON
// =========================

closeVideoLightbox.addEventListener("click",()=>{

  closeVideoPlayer();

});


// =========================
// CLICK OUTSIDE
// =========================

videoLightbox.addEventListener("click",(e)=>{

  if(e.target === videoLightbox){

    closeVideoPlayer();

  }

});


// =========================
// CLOSE FUNCTION
// =========================

function closeVideoPlayer(){

  videoLightbox.classList.remove("active");

  lightboxVideo.pause();

  lightboxVideo.currentTime = 0;

  lightboxVideo.src = "";

  // RESTORE THUMBNAILS

  previewVideos.forEach((v)=>{

    v.load();

  });

}
 
// =========================
// APPLE SMOOTH SCROLL
// =========================

const lenis = new Lenis({

  duration: 1.2,

  smoothWheel: true,

  easing: (t) => 1 - Math.pow(1 - t, 4),

});


function raf(time) {

  lenis.raf(time);

  requestAnimationFrame(raf);

}

requestAnimationFrame(raf);

// =========================
// LIGHTWEIGHT FLOAT EFFECT
// =========================

const floatCards =
document.querySelectorAll(
".card, .video-card, .gallery-item"
);

floatCards.forEach((card)=>{

  card.addEventListener("mouseenter",()=>{

    card.style.transform =
    "translateY(-8px) scale(1.02)";

  });

  card.addEventListener("mouseleave",()=>{

    card.style.transform =
    "translateY(0px) scale(1)";

  });

});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if(pageYOffset >= sectionTop - 200){
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === `#${current}`){
      link.classList.add("active");
    }

  });

});