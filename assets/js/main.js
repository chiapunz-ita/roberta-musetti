/* =========================================================
   Roberta Musetti — main.js
   Typewriter hero, constellation canvas, nav, reveal-on-scroll
   ========================================================= */
(function(){
  "use strict";

  /* ---------------- Nav: scroll state + mobile toggle ---------------- */
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 30){ nav.classList.add("is-scrolled"); }
    else{ nav.classList.remove("is-scrolled"); }
  }
  document.addEventListener("scroll", onScroll, { passive:true });
  onScroll();

  if(toggle && links){
    toggle.addEventListener("click", function(){
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------- Active nav link ---------------- */
  var here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a[href]").forEach(function(a){
    var href = a.getAttribute("href");
    if(href === here || (here === "" && href === "index.html")){
      a.classList.add("active");
    }
  });

  /* ---------------- Reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if("IntersectionObserver" in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold:.16, rootMargin:"0px 0px -40px 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("is-visible"); });
  }

  /* ---------------- Typewriter ---------------- */
  var tw = document.querySelector("[data-typewriter]");
  if(tw){
    var full = tw.getAttribute("data-typewriter") || tw.textContent.trim();
    tw.textContent = "";
    var cursor = document.createElement("span");
    cursor.className = "cursor";
    var textSpan = document.createElement("span");
    textSpan.className = "tw-text";
    tw.appendChild(textSpan);
    tw.appendChild(cursor);

    var i = 0;
    var startDelay = 500;
    var baseSpeed = 34;

    function revealFollow(){
      ["hero-sub","hero-actions","hero-credentials","scroll-cue"].forEach(function(cls, idx){
        var el = document.querySelector("." + cls);
        if(el){
          setTimeout(function(){ el.classList.add("is-visible"); }, 250 + idx * 260);
        }
      });
    }

    function typeStep(){
      if(i <= full.length){
        textSpan.textContent = full.slice(0, i);
        i++;
        var ch = full[i-2] || "";
        var pause = /[,;]/.test(ch) ? baseSpeed * 6 : /\./.test(ch) ? baseSpeed * 8 : baseSpeed + Math.random()*26;
        setTimeout(typeStep, pause);
      } else {
        revealFollow();
      }
    }
    setTimeout(typeStep, startDelay);
  } else {
    // no typewriter on this page: reveal hero extras immediately if present
    ["hero-sub","hero-actions","hero-credentials","scroll-cue"].forEach(function(cls){
      var el = document.querySelector("." + cls);
      if(el){ el.classList.add("is-visible"); }
    });
  }

  /* ---------------- Constellation canvas (hero background) ---------------- */
  var canvas = document.querySelector(".hero-canvas");
  if(canvas && canvas.getContext){
    var ctx = canvas.getContext("2d");
    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, points = [];
    var POINT_COUNT = window.innerWidth < 700 ? 34 : 64;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize(){
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * DPR; canvas.height = h * DPR;
      ctx.setTransform(DPR,0,0,DPR,0,0);
    }

    function makePoints(){
      points = [];
      for(var k=0;k<POINT_COUNT;k++){
        points.push({
          x: Math.random()*w,
          y: Math.random()*h,
          vx: (Math.random()-.5)*.18,
          vy: (Math.random()-.5)*.18,
          r: Math.random()*1.6 + .6
        });
      }
    }

    function step(){
      ctx.clearRect(0,0,w,h);
      var maxDist = Math.min(180, w*.16);
      for(var a=0;a<points.length;a++){
        var p = points[a];
        p.x += p.vx; p.y += p.vy;
        if(p.x < -20) p.x = w+20; if(p.x > w+20) p.x = -20;
        if(p.y < -20) p.y = h+20; if(p.y > h+20) p.y = -20;
      }
      for(var a2=0;a2<points.length;a2++){
        for(var b=a2+1;b<points.length;b++){
          var p1=points[a2], p2=points[b];
          var dx=p1.x-p2.x, dy=p1.y-p2.y;
          var dist=Math.sqrt(dx*dx+dy*dy);
          if(dist < maxDist){
            ctx.strokeStyle = "rgba(226,143,176," + (0.14*(1-dist/maxDist)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
          }
        }
      }
      points.forEach(function(p){
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,251,244,.9)";
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      });
      if(!reduceMotion){ requestAnimationFrame(step); }
    }

    resize(); makePoints();
    if(reduceMotion){ step(); } else { step(); }
    window.addEventListener("resize", function(){ resize(); makePoints(); }, { passive:true });
  }

  /* ---------------- Forms: mailto fallback (static hosting, no backend) ---------------- */
  document.querySelectorAll("form[data-mailto]").forEach(function(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var to = form.getAttribute("data-mailto");
      var subject = form.getAttribute("data-subject") || "Richiesta dal sito";
      var lines = [];
      form.querySelectorAll("input, textarea, select").forEach(function(field){
        if(field.type === "checkbox"){ return; }
        var label = form.querySelector('label[for="' + field.id + '"]');
        var name = field.name || (label ? label.textContent.replace("*","").trim() : field.id);
        if(field.value){ lines.push(name + ": " + field.value); }
      });
      var body = encodeURIComponent(lines.join("\n"));
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + body;
    });
  });

  /* ---------------- Current year in footer ---------------- */
  document.querySelectorAll("[data-year]").forEach(function(el){
    el.textContent = new Date().getFullYear();
  });
})();
