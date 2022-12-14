// For slapping the buzzing mosquitos

let randomMosquito1 = document.querySelector(".small-mosquito1");
let randomMosquito2 = document.querySelector(".small-mosquito2");

function slapRandomMosquito() {
  randomMosquito1.addEventListener("mouseenter", function() {
    document.body.style.cursor = "pointer";
  });

  randomMosquito1.addEventListener("click", function() {
    randomMosquito1.src = "assets/images/splat.png";
    randomMosquito1.style.pointerEvents = "none";
    document.body.style.cursor = "default";
  });

  randomMosquito1.addEventListener("mouseout", function() {
    document.body.style.cursor = "default";
  });

  randomMosquito2.addEventListener("mouseenter", function() {
    document.body.style.cursor = "pointer";
  });

  randomMosquito2.addEventListener("click", function() {
    randomMosquito2.src = "assets/images/splat.png";
    randomMosquito2.style.pointerEvents = "none";
    document.body.style.cursor = "default";
  });

  randomMosquito2.addEventListener("mouseout", function() {
    document.body.style.cursor = "default";
  });
}

slapRandomMosquito();
