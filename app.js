// Elements
const btn = document.getElementById("btn");
const msg = document.getElementById("message");
const videoContainer = document.getElementById("video-container");
const video = document.getElementById("video");
const replay = document.getElementById("replay");
const music = document.getElementById("bg-music");
const bgVideo = document.getElementById("bg-video");
const jumpscare = document.getElementById("jumpscare");
const jumpscareVideo = document.getElementById("jumpscare-video");

// Queue teks bertahap (muncul → hapus → lanjut)
const texts = [
  "Happy Birthday 🎉",
  "Semoga panjang umur 🙏",
  "Sehat selalu 💪",
  "Dan semua impianmu tercapai! 💖"
];

let textIndex = 0;
let charIndex = 0;

// Typewriter satu teks
function typeWriter() {
  const current = texts[textIndex];
  if (charIndex < current.length) {
    msg.textContent += current.charAt(charIndex++);
    setTimeout(typeWriter, 60);
  } else {
    // selesai satu teks → jeda → hapus
    setTimeout(deleteText, 1500);
  }
}

// Hapus huruf satu per satu
function deleteText() {
  if (msg.textContent.length > 0) {
    msg.textContent = msg.textContent.slice(0, -1);
    setTimeout(deleteText, 40);
  } else {
    textIndex++;
    if (textIndex < texts.length) {
      charIndex = 0;
      setTimeout(typeWriter, 400);
    } else {
      // semua teks selesai & terhapus → tampilkan video container
      setTimeout(() => {
        videoContainer.style.display = "block";
        videoContainer.setAttribute("aria-hidden", "false");
      }, 1500);
    }
  }
}

// Confetti burst kiri & kanan selama beberapa detik
function launchConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Events
btn.addEventListener("click", () => {
  btn.style.display = "none";

  // tampilkan jumpscare video
  jumpscare.style.display = "flex";
  jumpscareVideo.play();

  // setelah video jumpscare selesai
  jumpscareVideo.onended = () => {
    jumpscare.style.display = "none";

    // flow lama: musik, bg video, teks, confetti
    msg.style.display = "block";
    music.play();
    bgVideo.classList.add("active");
    typeWriter();
    launchConfetti();
  };
});
