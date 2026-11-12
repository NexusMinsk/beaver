const loader = document.getElementById("loader");
const ageAsk = document.getElementById("ageAsk");
const ageYes = document.getElementById("ageYes");
const ageNo = document.getElementById("ageNo");
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const year = document.getElementById("year");
const header = document.querySelector(".header");
const video = document.querySelector(".hero__video");

const AGE_KEY = "beaver-age-ok";
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (year) year.textContent = String(new Date().getFullYear());

function playVideo() {
  if (video && video.paused) video.play().catch(() => {});
}

function finish() {
  loader.hidden = true;
  document.documentElement.classList.remove("is-loading");
  playVideo();
}

function openSite() {
  try {
    sessionStorage.setItem(AGE_KEY, "1");
  } catch (error) {
    /* storage can be blocked; the gate still has to close */
  }
  loader.classList.add("is-gone");
  loader.style.pointerEvents = "none";
  playVideo();
  window.setTimeout(finish, reduce ? 0 : 720);
}

function armAge() {
  ageAsk.style.pointerEvents = "auto";
  ageYes.focus();
}

if (reduce) {
  armAge();
} else {
  ageAsk.addEventListener(
    "animationend",
    (event) => {
      if (event.animationName === "age-in") armAge();
    },
    { once: true }
  );
}

ageYes.addEventListener("click", openSite);

ageNo.addEventListener("click", () => {
  loader.classList.add("is-deny");
});

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  document.documentElement.classList.toggle("is-loading", open);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("is-loading");
  });
});

function paintHeader() {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
}

paintHeader();
window.addEventListener("scroll", paintHeader, { passive: true });

document.querySelectorAll(".filters button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach((item) => {
      item.classList.remove("is-active");
    });
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".menu__item").forEach((card) => {
      const show = filter === "all" || card.dataset.cat.split(" ").includes(filter);
      card.classList.toggle("is-hidden", !show);
    });
  });
});
