// Ported from Chalk's application.js / scrollappear.js without jQuery.
document.addEventListener("DOMContentLoaded", function () {
  // ScrollAppear: fade elements in once they enter the viewport.
  var els = document.querySelectorAll(".scrollappear");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("appeared");
          observer.unobserve(entry.target);
        }
      });
    });
    els.forEach(function (el) {
      el.classList.add("appear");
      observer.observe(el);
    });
  }

  // Text size control next to the byline: − / Aa / +. "Aa" cycles through the
  // four sizes; − and + step down and up. The choice is remembered across pages.
  var root = document.documentElement;
  var sizes = ["small", "medium", "large", "x-large"];
  var sizeNames = { small: "small", medium: "default", large: "large", "x-large": "extra large" };
  var controls = document.querySelectorAll(".text-size");
  function currentIndex() {
    var i = sizes.indexOf(root.dataset.textSize);
    return i === -1 ? 1 : i;
  }
  function setSize(i) {
    var size = sizes[i];
    if (size === "medium") { delete root.dataset.textSize; } else { root.dataset.textSize = size; }
    try { localStorage.setItem("textSize", size); } catch (e) {}
    showTextSize();
  }
  function showTextSize() {
    var i = currentIndex();
    controls.forEach(function (control) {
      control.dataset.step = i + 1;
      control.querySelector(".text-size-current").setAttribute("aria-label", "Text size: " + sizeNames[sizes[i]] + ". Change text size");
      control.querySelector(".text-size-down").disabled = i === 0;
      control.querySelector(".text-size-up").disabled = i === sizes.length - 1;
    });
  }
  controls.forEach(function (control) {
    control.querySelectorAll("button").forEach(function (button) {
      button.addEventListener("click", function () {
        var change = button.dataset.textSizeChange;
        var i = currentIndex();
        if (change === "cycle") { setSize((i + 1) % sizes.length); }
        else { setSize(Math.min(sizes.length - 1, Math.max(0, i + Number(change)))); }
      });
    });
  });
  showTextSize();

  // Zooming: click an image to enlarge it.
  if (window.Zooming) {
    new Zooming({ customSize: "100%", scaleBase: 0.9, scaleExtra: 0, bgColor: "#dcdad9" }).listen(".zooming");
  }
});
