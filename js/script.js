const ready=document.getElementById("screen-ready");
const loading=document.getElementById("screen-loading");
const countdown=document.getElementById("screen-countdown");
const launch=document.getElementById("screen-launch");
const progress = document.getElementById("screen-progress");
const count=document.getElementById("countNumber");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const videoScreen = document.getElementById("screen-video");
const launchVideo = document.getElementById("launchVideo");
const beepSound = document.getElementById("beepSound");
const whooshSound = document.getElementById("whooshSound");

let launched = false;

function show(screen){

    ready.classList.remove("active");
    loading.classList.remove("active");
    progress.classList.remove("active");
    countdown.classList.remove("active");
    launch.classList.remove("active");
    videoScreen.classList.remove("active");

    screen.classList.add("active");

}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function flashScreen(){

    playWhoosh();

    gsap.fromTo(
        "#flash",
        { opacity:0 },
        {
            opacity:1,
            duration:0.1,
            yoyo:true,
            repeat:1
        }
    );

    await wait(250);

}

window.startLaunch = async function(){

    if (launched) return;

    launched = true;

    // Loading
    show(loading);
    
    await wait(2000);

    // Progress
    await runProgress();

    // Countdown
    show(countdown);

    for(let i = 10; i >= 1; i--){

        count.innerHTML = i;
        playBeep();

        gsap.fromTo(
    count,
    {
        scale:0.2,
        opacity:0,
        rotation:-15
    },
    {
        scale:1,
        opacity:1,
        rotation:0,
        duration:0.45,
        ease:"back.out(1.7)"
    }
);

gsap.to(count,{
    scale:1.15,
    duration:0.25,
    repeat:1,
    yoyo:true
});

        await wait(1000);

    }

    // Launch
    await flashScreen();

    show(launch);

        gsap.from("#screen-launch",{
            scale:0.8,
            opacity:0,
            duration:0.8,
            ease:"back.out(1.5)"
        });
        launchConfetti();
        await wait(6000);

        show(videoScreen);

        launchVideo.currentTime = 0;
        launchVideo.play();

}

async function runProgress(){

    show(progress);

    progressBar.style.width = "0%";
    progressText.innerHTML = "0%";

    for(let i=0; i<=100; i++){

        progressBar.style.width = i + "%";
        progressText.innerHTML = i + "%";

        await wait(40);

    }

}

window.addEventListener("load", () => {

    const tl = gsap.timeline();

    tl.from("#logo", {
        opacity: 0,
        scale: 0.5,
        duration: 0.8
    })

    .from("#schoolName", {
        opacity: 0,
        y: -30,
        duration: 0.5
    }, "-=0.2")

    .from("#mainTitle", {
        opacity: 0,
        y: 50,
        duration: 0.6
    }, "-=0.2")

    .from("#subTitle", {
        opacity: 0,
        y: 40,
        duration: 0.5
    }, "-=0.3")

    .from("#year", {
        opacity: 0,
        duration: 0.4
    })

    .from("#statusBox", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6
    });

});

launchVideo.addEventListener("ended", () => {

    show(ready);

    launched = false;

});

function launchConfetti() {

    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {

        confetti({
            particleCount: 4,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 4,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();

}

function playBeep(){

    beepSound.pause();
    beepSound.currentTime = 0;

    beepSound.play().catch(() => {});

}

function playWhoosh(){

    whooshSound.pause();
    whooshSound.currentTime = 0;

    whooshSound.play().catch(() => {});

}