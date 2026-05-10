console.log("Portfolio JS Loaded");

/* =========================
   TYPING EFFECT
========================= */

const typingText =
"Creative AI Developer • Cinematic Editor • Visual Storyteller";

const typingElement =
document.querySelector(".typing");

let typingIndex = 0;

function typeEffect(){

    if(typingElement && typingIndex < typingText.length){

        typingElement.innerHTML +=
        typingText.charAt(typingIndex);

        typingIndex++;

        setTimeout(typeEffect, 60);
    }
}

typeEffect();

/* =========================
   MOBILE NAVBAR
========================= */

const menuToggle =
document.querySelector(".menu-toggle");

const navMenu =
document.querySelector("nav ul");

if(menuToggle && navMenu){

    menuToggle.addEventListener("click", (e) => {

        e.stopPropagation();

        navMenu.classList.toggle("active");
    });

    document.querySelectorAll("nav ul li a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
        });
    });

    document.addEventListener("click", (e) => {

        if(
            !navMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ){

            navMenu.classList.remove("active");
        }
    });
}

/* =========================
   CUSTOM CURSOR
========================= */

const cursor =
document.querySelector(".cursor");

if(cursor && window.innerWidth > 768){

    document.body.style.cursor = "none";

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    document.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor(){

        currentX += (mouseX - currentX) * 0.18;

        currentY += (mouseY - currentY) * 0.18;

        cursor.style.left = currentX + "px";

        cursor.style.top = currentY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const hoverItems =
    document.querySelectorAll(
        "a, button, .gallery-item, .video-card"
    );

    hoverItems.forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.classList.add("active");
        });

        item.addEventListener("mouseleave", () => {

            cursor.classList.remove("active");
        });
    });

}

/* =========================
   IMAGE LIGHTBOX
========================= */

const galleryImages =
document.querySelectorAll(".gallery-item img");

const lightbox =
document.querySelector(".lightbox");

const lightboxImg =
document.querySelector(".lightbox img");

const closeLightbox =
document.querySelector(".close-lightbox");

galleryImages.forEach(img => {

    img.addEventListener("click", () => {

        if(lightbox && lightboxImg){

            lightbox.classList.add("active");

            lightboxImg.src = img.src;
        }
    });
});

if(closeLightbox){

    closeLightbox.addEventListener("click", () => {

        lightbox.classList.remove("active");
    });
}

if(lightbox){

    lightbox.addEventListener("click", (e) => {

        if(e.target === lightbox){

            lightbox.classList.remove("active");
        }
    });
}

/* =========================
   VIDEO LIGHTBOX + PREVIEW
========================= */

const videoCards =
document.querySelectorAll(".video-card");

const videoLightbox =
document.querySelector(".video-lightbox");

const lightboxVideo =
document.querySelector(".lightbox-video");

const closeVideoLightbox =
document.querySelector(".close-video-lightbox");

videoCards.forEach(card => {

    const video =
    card.querySelector("video");

    if(!video) return;

    /* LOAD POSTER */

    video.load();

    /* =====================
       DESKTOP HOVER PREVIEW
    ===================== */

    card.addEventListener("mouseenter", async () => {

        if(window.innerWidth > 768){

            try{

                await video.play();

            }catch(err){

                console.log(err);
            }
        }
    });

    card.addEventListener("mouseleave", () => {

        if(window.innerWidth > 768){

            video.pause();

            video.currentTime = 0;

            video.load();
        }
    });

    /* =====================
       MOBILE HOLD PREVIEW
    ===================== */

    let holdTimeout;

    card.addEventListener("touchstart", () => {

        holdTimeout = setTimeout(async () => {

            try{

                await video.play();

            }catch(err){

                console.log(err);
            }

        }, 200);

    });

    card.addEventListener("touchend", () => {

        clearTimeout(holdTimeout);

        video.pause();

        video.currentTime = 0;

        video.load();
    });

    /* =====================
       OPEN FULL VIDEO
    ===================== */

    card.addEventListener("click", () => {

        if(videoLightbox && lightboxVideo){

            const source =
            video.querySelector("source").src;

            lightboxVideo.src = source;

            videoLightbox.classList.add("active");

            lightboxVideo.play();
        }
    });

});

/* =========================
   CLOSE VIDEO LIGHTBOX
========================= */

if(closeVideoLightbox){

    closeVideoLightbox.addEventListener("click", () => {

        videoLightbox.classList.remove("active");

        lightboxVideo.pause();

        lightboxVideo.src = "";
    });
}

if(videoLightbox){

    videoLightbox.addEventListener("click", (e) => {

        if(e.target === videoLightbox){

            videoLightbox.classList.remove("active");

            lightboxVideo.pause();

            lightboxVideo.src = "";
        }
    });
}

/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            target.scrollIntoView({

                behavior: "smooth"
            });
        }
    });
});

/* =========================
   AOS
========================= */

AOS.init({

    duration: 1000,

    once: true
});