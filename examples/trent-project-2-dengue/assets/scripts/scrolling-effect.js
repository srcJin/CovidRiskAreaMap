// Smmoth scrolling effect when click on the links on navbar

let anchorlinks = document.querySelectorAll('a[href^="#"]');

let home = document.querySelector(".navbar-nav a");

for (let item of anchorlinks) {
  item.addEventListener("click", e => {
    let hashval = item.getAttribute("href");
    let target = document.querySelector(hashval);
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
    history.pushState(null, null, hashval);
    e.preventDefault();
  });
}
