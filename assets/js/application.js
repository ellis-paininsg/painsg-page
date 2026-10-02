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

  // Zooming: click an image to enlarge it.
  if (window.Zooming) {
    new Zooming({ customSize: "100%", scaleBase: 0.9, scaleExtra: 0, bgColor: "#f2f2f2" }).listen(".zooming");
  }
});
