/* ==========================================================
   Altitude — Class Finder Quiz
   Drop-in vanilla JS. Renders into <div id="class-quiz"></div>.
   Edit QUIZ CONTENT below; you shouldn't need to touch the rest.
   ========================================================== */
(function () {
  "use strict";

  /* ---------- QUIZ CONTENT ---------- */

  // Where "See the schedule" goes (your Mindbody schedule page).
  var SCHEDULE_URL = "plan-your-visit.html#classes";

  // Tie-break order: earlier = wins ties (gentlest first).
  var ORDER = ["cd", "vin", "yin", "sculpt", "power", "lift"];

  var CLASSES = {
    cd: {
      name: "Climb & Descend",
      tag: "A little effort, a lot of ease. You want both, and that’s the whole point.",
      desc: "The perfect blend of movement and stillness. You’ll move through a slow vinyasa before slowing down with long, restorative holds."
    },
    vin: {
      name: "Vinyasa",
      tag: "You like to keep things moving. Breath leads, body follows.",
      desc: "Link breath to movement by continuously moving from one posture to the next."
    },
    yin: {
      name: "Yin “Descent”",
      tag: "Your nervous system called. It would like a long, quiet hold.",
      desc: "Known to calm the nervous system and increase flexibility. Poses are held for extended periods of time to let connective tissue and fascia release tension."
    },
    sculpt: {
      name: "Yoga Sculpt",
      tag: "Why choose between a mat and a dumbbell?",
      desc: "The mindful movement of yoga meets the strength and sculpting power of a full-body workout: yoga, dumbbell-based strength training, and a stretch cooldown, all in one class."
    },
    power: {
      name: "Power",
      tag: "You came to work. You’ll leave standing a little taller.",
      desc: "A fitness-based style of vinyasa focused on building strength, flexibility, and endurance."
    },
    lift: {
      name: "Lift",
      tag: "Put the playlist on. Pick up the weights. Head to toe.",
      desc: "A structured, full-body strength class set to music, with dumbbells throughout. Segments target legs, glutes, back, arms, and core, building steady, controlled movement to fatigue the muscle and keep your heart rate up."
    }
  };

  // Each answer's "s" adds points to classes. Highest total wins.
  var QUESTIONS = [
    { eyebrow: "Set the scene", q: "It’s Saturday morning. What sounds best?", a: [
      { t: "Slow coffee. Possibly still in a blanket.", s: { yin: 2, cd: 1 } },
      { t: "A walk that accidentally turns into a hike.", s: { vin: 2, cd: 1 } },
      { t: "An early workout. Brunch is earned.", s: { power: 2, sculpt: 1 } },
      { t: "Playlist on, something heavy in my hands.", s: { lift: 2, sculpt: 1 } }
    ]},
    { eyebrow: "Be honest", q: "How has your week been?", a: [
      { t: "Running on fumes.", s: { yin: 2, cd: 1 } },
      { t: "Scattered. I need to focus.", s: { vin: 2 } },
      { t: "Restless. I need to burn it off.", s: { power: 2, sculpt: 1 } },
      { t: "Pretty good, actually. Challenge me.", s: { lift: 1, sculpt: 1, power: 1 } }
    ]},
    { eyebrow: "Pace", q: "Pick your tempo.", a: [
      { t: "Flow, and keep flowing.", s: { vin: 2, power: 1 } },
      { t: "Warm up, then settle in.", s: { cd: 2 } },
      { t: "Be still and go deep.", s: { yin: 2 } },
      { t: "Structured rounds. Count me in.", s: { lift: 2, sculpt: 1 } }
    ]},
    { eyebrow: "The big question", q: "How do you feel about dumbbells in yoga?", a: [
      { t: "Yes, please. Best of both.", s: { sculpt: 2, lift: 1 } },
      { t: "Skip the yoga, keep the dumbbells.", s: { lift: 2 } },
      { t: "Bodyweight is plenty, thanks.", s: { power: 1, vin: 1 } },
      { t: "The only thing I’m lifting is my mood.", s: { yin: 2, cd: 1 } }
    ]},
    { eyebrow: "Soundtrack", q: "What’s playing in the room?", a: [
      { t: "Something soft and low.", s: { yin: 1, cd: 1 } },
      { t: "A steady beat to move with.", s: { vin: 1, power: 1 } },
      { t: "Loud enough to lift to.", s: { lift: 2, sculpt: 1 } },
      { t: "Doesn’t matter. I’m in my own head.", s: { vin: 1, yin: 1 } }
    ]},
    { eyebrow: "Last one", q: "How do you want to walk out?", a: [
      { t: "Loose, quiet, a little floaty.", s: { yin: 2 } },
      { t: "Balanced. Worked, but calm.", s: { cd: 2, vin: 1 } },
      { t: "Sweaty and proud of it.", s: { power: 2, sculpt: 1 } },
      { t: "Strong. Sore tomorrow, the good kind.", s: { lift: 2, sculpt: 1 } }
    ]}
  ];

  /* ---------- QUIZ LOGIC ---------- */

  var root = document.getElementById("class-quiz");
  if (!root) return;

  var step = -1;      // -1 = intro, 0..n-1 = question, n = result
  var picks = [];

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function score() {
    var totals = {};
    ORDER.forEach(function (k) { totals[k] = 0; });
    picks.forEach(function (ans, i) {
      var pts = QUESTIONS[i].a[ans].s;
      Object.keys(pts).forEach(function (k) { totals[k] += pts[k]; });
    });
    return ORDER.slice().sort(function (a, b) {
      return (totals[b] - totals[a]) || (ORDER.indexOf(a) - ORDER.indexOf(b));
    });
  }

  function renderIntro() {
    return (
      '<div class="aq-screen aq-intro">' +
        '<p class="aq-eyebrow">Class finder</p>' +
        '<h2 class="aq-display">Not sure where to start?</h2>' +
        '<p class="aq-lede">Six quick questions, no wrong answers. We’ll point you toward the class that fits how you want to feel today.</p>' +
        '<button type="button" class="aq-btn aq-btn-primary" data-action="start">Find my class</button>' +
        '<p class="aq-small">About one minute</p>' +
      '</div>'
    );
  }

  function renderQuestion() {
    var q = QUESTIONS[step];
    var segs = QUESTIONS.map(function (_, i) {
      return '<span class="aq-seg' + (i <= step ? " is-on" : "") + '"></span>';
    }).join("");
    var answers = q.a.map(function (a, j) {
      var sel = picks[step] === j ? " is-selected" : "";
      return (
        '<button type="button" class="aq-opt' + sel + '" data-action="pick" data-index="' + j + '">' +
          '<span class="aq-letter" aria-hidden="true">' + "ABCD"[j] + '</span>' +
          '<span class="aq-opt-text">' + esc(a.t) + '</span>' +
        '</button>'
      );
    }).join("");

    return (
      '<div class="aq-screen aq-question">' +
        '<div class="aq-topbar">' +
          '<button type="button" class="aq-back" data-action="back" aria-label="Previous question">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' +
          '</button>' +
          '<div class="aq-progress" role="progressbar" aria-valuemin="1" aria-valuemax="' + QUESTIONS.length + '" aria-valuenow="' + (step + 1) + '">' + segs + '</div>' +
          '<span class="aq-count">' + (step + 1) + ' of ' + QUESTIONS.length + '</span>' +
        '</div>' +
        '<p class="aq-eyebrow aq-accent">' + esc(q.eyebrow) + '</p>' +
        '<h2 class="aq-heading" tabindex="-1">' + esc(q.q) + '</h2>' +
        '<div class="aq-options">' + answers + '</div>' +
      '</div>'
    );
  }

  function renderResult() {
    var ranked = score();
    var top = CLASSES[ranked[0]];
    var alt = CLASSES[ranked[1]];
    return (
      '<div class="aq-screen aq-result">' +
        '<div class="aq-result-head">' +
          '<p class="aq-eyebrow">Your class is</p>' +
          '<h2 class="aq-display aq-accent" tabindex="-1">' + esc(top.name) + '</h2>' +
          '<p class="aq-tagline">' + esc(top.tag) + '</p>' +
        '</div>' +
        '<div class="aq-card">' +
          '<p class="aq-desc">' + esc(top.desc) + '</p>' +
          '<div class="aq-alt"><span>Also worth a try:</span><span class="aq-chip">' + esc(alt.name) + '</span></div>' +
          '<div class="aq-actions">' +
            '<a class="aq-btn aq-btn-primary" href="' + esc(SCHEDULE_URL) + '">See the schedule</a>' +
            '<button type="button" class="aq-btn aq-btn-ghost" data-action="retake">Retake the quiz</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function render() {
    if (step < 0) root.innerHTML = renderIntro();
    else if (step < QUESTIONS.length) root.innerHTML = renderQuestion();
    else root.innerHTML = renderResult();

    // Move focus to the new heading for keyboard / screen-reader users.
    var h = root.querySelector("[tabindex='-1']");
    if (h && step >= 0) h.focus({ preventScroll: true });
  }

  root.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");

    if (action === "start") { step = 0; picks = []; }
    else if (action === "pick") { picks[step] = Number(btn.getAttribute("data-index")); step++; }
    else if (action === "back") { step--; }
    else if (action === "retake") { step = -1; picks = []; }
    render();
  });

  render();
})();
