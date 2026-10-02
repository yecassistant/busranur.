/* Resmin Teslimatı – ortak kod
   Seçimler sayfadan sayfaya adres çubuğundaki parametrelerle taşınır:
   t = kahve|yemek, m = menü, g = gün, s = saat, n = not */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var page = document.body.dataset.page;
  var state = {};
  new URLSearchParams(location.search).forEach(function (v, k) { state[k] = v; });

  /* ---------- sayfa geçişi (giriş animasyonu CSS'te, JS gerekmez) ---------- */
  function go(url, add) {
    var p = new URLSearchParams();
    var all = Object.assign({}, state, add || {});
    Object.keys(all).forEach(function (k) { if (all[k] !== undefined && all[k] !== "") p.set(k, all[k]); });
    var q = p.toString();
    document.body.classList.add("leaving");
    setTimeout(function () { location.href = url + (q ? "?" + q : ""); }, 420);
  }
  window.addEventListener("pageshow", function (e) { if (e.persisted) { document.body.classList.remove("leaving"); document.body.style.opacity = "1"; } });

  /* ---------- çiçek çizimleri ---------- */
  function lavender(c1, c2) {
    var s = '<svg viewBox="0 0 60 140" width="W" height="H" xmlns="http://www.w3.org/2000/svg"><path d="M30 140 Q28 80 30 20" stroke="#6fa77f" stroke-width="3" fill="none"/>';
    s += '<path d="M30 112 Q12 100 8 84 Q24 90 30 106Z" fill="#7fb68f"/><path d="M30 124 Q46 114 52 100 Q36 104 30 118Z" fill="#8cc29b"/>';
    for (var i = 0; i < 10; i++) {
      var y = 20 + i * 8.5, dx = (i % 2 ? 7 : -7), r = 6.2 - i * 0.25;
      s += '<ellipse cx="' + (30 + dx) + '" cy="' + y + '" rx="' + r + '" ry="' + (r * 1.35) + '" fill="' + (i % 2 ? c1 : c2) + '" transform="rotate(' + (dx > 0 ? 25 : -25) + ' ' + (30 + dx) + ' ' + y + ')"/>';
    }
    return s + '<ellipse cx="30" cy="12" rx="5" ry="8" fill="' + c1 + '"/></svg>';
  }
  function peony(c1, c2, c3) {
    var s = '<svg viewBox="0 0 120 120" width="W" height="H" xmlns="http://www.w3.org/2000/svg">', i;
    for (i = 0; i < 10; i++) s += '<ellipse cx="60" cy="30" rx="24" ry="30" fill="' + c1 + '" transform="rotate(' + (i * 36) + ' 60 60)"/>';
    for (i = 0; i < 8; i++) s += '<ellipse cx="60" cy="40" rx="17" ry="21" fill="' + c2 + '" transform="rotate(' + (i * 45 + 20) + ' 60 60)"/>';
    for (i = 0; i < 6; i++) s += '<ellipse cx="60" cy="49" rx="10" ry="13" fill="' + c3 + '" transform="rotate(' + (i * 60 + 5) + ' 60 60)"/>';
    return s + '<circle cx="60" cy="60" r="7" fill="' + c3 + '"/></svg>';
  }
  function lily(c1, c2) {
    var s = '<svg viewBox="0 0 120 120" width="W" height="H" xmlns="http://www.w3.org/2000/svg">', i;
    for (i = 0; i < 6; i++) {
      s += '<path d="M60 60 C46 40 50 14 60 4 C70 14 74 40 60 60Z" fill="' + c1 + '" transform="rotate(' + (i * 60) + ' 60 60)"/>';
      s += '<path d="M60 56 L60 18" stroke="' + c2 + '" stroke-width="2" stroke-dasharray="2 4" transform="rotate(' + (i * 60) + ' 60 60)"/>';
    }
    for (i = 0; i < 6; i++) s += '<line x1="60" y1="60" x2="60" y2="38" stroke="#9a6b3a" stroke-width="1.5" transform="rotate(' + (i * 60 + 30) + ' 60 60)"/><circle cx="60" cy="37" r="2.8" fill="#b8562b" transform="rotate(' + (i * 60 + 30) + ' 60 60)"/>';
    return s + '<circle cx="60" cy="60" r="6" fill="#bfe08a"/></svg>';
  }
  function leaf(c) {
    return '<svg viewBox="0 0 60 100" width="W" height="H" xmlns="http://www.w3.org/2000/svg"><path d="M30 98 C4 70 6 26 30 2 C54 26 56 70 30 98Z" fill="' + c + '"/><path d="M30 96 L30 10" stroke="#5a8f69" stroke-width="2"/></svg>';
  }
  var F = {
    lav: function () { return lavender("#9b7fd1", "#b9a1ea"); },
    lav2: function () { return lavender("#7d62c4", "#a58ae0"); },
    peo: function () { return peony("#f7a9c4", "#ec6f9a", "#d94f80"); },
    peo2: function () { return peony("#ffd0de", "#ff9ebd", "#f2709a"); },
    peo3: function () { return peony("#fde2c8", "#fbb98c", "#f08f5a"); },
    lil: function () { return lily("#ffd56b", "#e89a1c"); },
    lil2: function () { return lily("#ffffff", "#f39ab6"); },
    lil3: function () { return lily("#ff9fb8", "#d9406f"); },
    leaf: function () { return leaf("#8cc29b"); },
    leaf2: function () { return leaf("#6fa77f"); }
  };
  function svgEl(key, w, h) {
    var d = document.createElement("div");
    var img = new Image();
    img.alt = ""; img.decoding = "async"; img.draggable = false;
    img.width = Math.round(w); img.height = Math.round(h);
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(F[key]().replace('width="W"', 'width="' + w + '"').replace('height="H"', 'height="' + h + '"'));
    return img;
  }

  /* kenarlardaki çiçekler: telefonda az ve küçük, içeriğin üstüne binmesin */
  var phone = innerWidth < 520;
  var garden = document.createElement("div");
  garden.className = "garden"; garden.setAttribute("aria-hidden", "true");
  document.body.prepend(garden);
  (phone ? [
    ["peo2", { left: -34, top: -30 }, 84], ["lil", { right: -30, top: -26 }, 76],
    ["peo3", { left: -30, bottom: -34 }, 78], ["lav", { left: 34, bottom: -40 }, 30],
    ["peo", { right: -34, bottom: -34 }, 84], ["lav2", { right: 42, bottom: -40 }, 30]
  ] : [
    ["peo", { left: -40, top: -30 }, 140], ["lav", { left: 70, top: -20 }, 42], ["lil2", { left: 20, top: 80 }, 70],
    ["lil", { right: -30, top: -20 }, 115], ["peo2", { right: 60, top: 50 }, 80], ["lav2", { right: 18, top: -10 }, 40],
    ["peo3", { left: -40, bottom: -30 }, 130], ["lil3", { left: 70, bottom: 30 }, 82], ["lav", { left: 14, bottom: -20 }, 46],
    ["peo2", { right: -40, bottom: -30 }, 140], ["lil", { right: 70, bottom: 40 }, 76], ["lav2", { right: 112, bottom: -18 }, 44]
  ]).forEach(function (s, i) {
    var isLav = s[0].indexOf("lav") === 0, sz = s[2];
    var el = svgEl(s[0], sz, isLav ? sz * 2.3 : sz);
    Object.keys(s[1]).forEach(function (p) { el.style[p] = s[1][p] + "px"; });
    el.style.opacity = phone ? ".75" : ".92"; el.style.animationDelay = (-i * 0.7) + "s";
    garden.appendChild(el);
  });

  /* üstteki buket: yan yana dizilmiş, birbirine girmeyen bir çelenk */
  document.querySelectorAll(".bouquet").forEach(function (b) {
    var parts = [
      // [çiçek, sol, üst, genişlik, yükseklik, açı]
      ["leaf2", 82, 6, 40, 68, -30], ["leaf", 218, 6, 40, 68, 30],
      ["lav", 4, 14, 36, 84, -14], ["lav2", 300, 14, 36, 84, 14],
      ["lil", 38, 52, 76, 76, 0], ["lil3", 226, 52, 76, 76, 0],
      ["peo", 112, 22, 116, 116, 0],
      ["lil2", 96, 118, 48, 48, 0], ["peo3", 198, 118, 48, 48, 0]
    ];
    var scale = Math.min(1, b.clientWidth / 340);
    if (innerHeight < 700) scale = Math.min(scale, 0.8);
    b.style.height = 170 * scale + "px";
    parts.forEach(function (p, i) {
      var el = svgEl(p[0], p[3] * scale, p[4] * scale);
      el.style.left = p[1] * scale + "px"; el.style.top = p[2] * scale + "px";
      el.style.setProperty("--r", p[5] + "deg"); el.style.animationDelay = (i * 0.07) + "s, " + (1 + i * 0.2) + "s";
      b.appendChild(el);
    });
  });

  /* geri dön butonları */
  document.querySelectorAll("[data-back]").forEach(function (b) {
    b.onclick = function () { go(b.dataset.back); };
  });

  /* ilerleme noktaları */
  var pr = document.querySelector(".progress");
  if (pr) {
    var step = +pr.dataset.step, total = +pr.dataset.total;
    for (var i = 1; i <= total; i++) { var dot = document.createElement("i"); if (i < step) dot.className = "done"; if (i === step) dot.className = "now"; pr.appendChild(dot); }
  }

  /* ---------- yaprak yağmuru ---------- */
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cv = document.createElement("canvas"); cv.id = "petals"; document.body.appendChild(cv);
  var ctx = cv.getContext("2d"), P = [], raf = null;
  function fit() {
    var r = Math.min(window.devicePixelRatio || 1, 1.5);
    cv.width = Math.round(innerWidth * r); cv.height = Math.round(innerHeight * r);
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
    ctx.setTransform(r, 0, 0, r, 0, 0);
  }
  fit(); addEventListener("resize", fit);
  var cols = ["#9b7fd1", "#b9a1ea", "#ec6f9a", "#f7a9c4", "#ffd56b", "#ffffff", "#ff9ebd", "#fbb98c"];
  function burst(n) {
    if (reduce) return;
    if (innerWidth < 520) n = Math.round(n * 0.5);
    for (var i = 0; i < n; i++) P.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.6, s: 6 + Math.random() * 9,
      vy: 1.2 + Math.random() * 2.2, vx: -1 + Math.random() * 2, r: Math.random() * 6.28, vr: -0.06 + Math.random() * 0.12,
      c: cols[(Math.random() * cols.length) | 0], w: Math.random() * 6.28 });
    if (!raf) loop();
  }
  function loop() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    P.forEach(function (p) {
      p.w += 0.04; p.x += p.vx + Math.sin(p.w) * 0.8; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.ellipse(0, 0, p.s * 0.55, p.s, 0, 0, 6.28); ctx.fill(); ctx.restore();
    });
    P = P.filter(function (p) { return p.y < innerHeight + 30; });
    raf = P.length ? requestAnimationFrame(loop) : null;
  }

  /* ---------- tek seçimli liste: seçince sonraki sayfa ---------- */
  function choices(boxId, items, key, next) {
    var box = $(boxId);
    items.forEach(function (it) {
      var b = document.createElement("button"); b.type = "button"; b.className = "opt";
      b.innerHTML = '<span class="ico" style="background:' + it.bg + '">' + it.ico + "</span><span><b>" + it.label + "</b><small>" + it.sub + "</small></span>";
      if (state[key] === it.label) b.classList.add("on");
      b.onclick = function () {
        box.querySelectorAll(".opt").forEach(function (o) { o.classList.remove("on"); });
        b.classList.add("on"); burst(25);
        var add = {}; add[key] = it.label; setTimeout(function () { go(next, add); }, 350);
      };
      box.appendChild(b);
    });
  }

  /* ================= SAYFALAR ================= */

  /* 1 · Resmin hazır */
  if (page === "hazir") {
    var f = $("frame");
    var tease = function () {
      f.classList.remove("shake"); void f.offsetWidth; f.classList.add("shake");
      setTimeout(function () { go("davet.html"); }, 600);
    };
    f.onclick = tease; $("open").onclick = tease;
  }

  /* 2 · Davet – Hayır demek mümkün değil */
  if (page === "davet") {
    var no = $("no"), yes = $("yes"), hint = $("hint"), n = 0;
    var texts = ["Emin misin?", "Haydaa", "Bir daha düşün", "Lavantalar üzüldü", "Şakayıklar soluyor", "Lilyumlar ağlıyor",
      "Estağfurullah", "Bu buton bozuk", "Yakalayamazsın", "Hanımefendi lütfen", "Pes et artık", "Evet'e bas"];
    var hints = ["", "", "Hmm, bu buton biraz utangaç.", "Evet butonu büyüyor, fark ettin mi?", "Biraz fazla heyecanlıyım, biliyorum 😅", "Bence işaret belli."];
    function growYes() {
      /* her denemede azıcık büyür, en fazla ~1.6 kat */
      var k = Math.min(n, 6);
      yes.style.fontSize = (1.08 + k * 0.05) + "rem";
      yes.style.padding = (15 + k * 1.4) + "px " + (30 + k * 2) + "px";
      if (n >= 5) yes.textContent = "Evet, buluşalım\u00a0🌸";
      if (n >= 9) yes.textContent = "Evet, buluşalım\u00a0💐";
      if (n >= 12) { no.hidden = true; hint.textContent = "Hayır butonu kaçtı gitti. Geriye bir seçenek kaldı."; }
    }
    var last = 0;
    function dodge(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      var now = Date.now(); if (now - last < 300) return; last = now;
      n++;
      if (no.classList.contains("parked")) {
        var r = no.getBoundingClientRect(); no.classList.remove("parked");
        no.style.left = r.left + "px"; no.style.top = r.top + "px"; void no.offsetWidth;
      }
      no.textContent = texts[(n - 1) % texts.length];
      try { if (navigator.vibrate) navigator.vibrate(18); } catch (err) {}
      var bw = no.offsetWidth, bh = no.offsetHeight, pad = 16;
      var yr = yes.getBoundingClientRect(), x, y, tries = 0;
      do {
        x = pad + Math.random() * Math.max(0, innerWidth - bw - pad * 2);
        y = pad + 40 + Math.random() * Math.max(0, innerHeight - bh - pad * 2 - 40);
        tries++;
      } while (tries < 20 && x < yr.right + 20 && x + bw > yr.left - 20 && y < yr.bottom + 20 && y + bh > yr.top - 20);
      no.style.left = x + "px"; no.style.top = y + "px";
      no.style.transform = "scale(" + Math.max(0.6, 1 - n * 0.04) + ") rotate(" + (Math.random() * 16 - 8) + "deg)";
      growYes();
      if (n < 12) hint.textContent = hints[Math.min(n, hints.length - 1)];
    }
    no.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") dodge(e); });
    no.addEventListener("pointerdown", dodge);
    no.addEventListener("touchstart", dodge, { passive: false });
    no.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); });
    no.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") dodge(e); });
    yes.onclick = function () { burst(120); setTimeout(function () { go("tercih.html"); }, 650); };
  }

  /* 3 · Kahve mi yemek mi */
  if (page === "tercih") {
    document.querySelectorAll("[data-t]").forEach(function (b) {
      b.onclick = function () { burst(40); var t = b.dataset.t; setTimeout(function () { go("secim.html", { t: t, m: "", s: "" }); }, 350); };
    });
  }

  /* 4 · Menü */
  if (page === "secim") {
    if (!state.t) state.t = "kahve";
    var isK = state.t !== "yemek";
    $("title").innerHTML = isK ? "Hangi <em>kahve</em> olsun?" : "Ne <em>yiyelim</em>?";
    $("sub").textContent = isK ? "Sen seç, ben uyarım." : "Canın ne çekiyorsa, oraya gideriz.";
    choices("opts", isK ? [
      { ico: "☕", bg: "#fff0c9", label: "Türk kahvesi", sub: "Yanında lokumla" },
      { ico: "🥛", bg: "#efe7fb", label: "Latte / Cappuccino", sub: "Bol köpüklü" },
      { ico: "🍰", bg: "#fdd9e6", label: "Kahve ve tatlı", sub: "Cheesecake'i paylaşırız" },
      { ico: "🌊", bg: "#e3f1ee", label: "Sahilde kahve", sub: "Elimizde kahve, deniz kenarında yürüyüş" },
      { ico: "🎁", bg: "#fff0c9", label: "Sen seç", sub: "Sürprize açığım" }
    ] : [
      { ico: "🍝", bg: "#fdd9e6", label: "İtalyan", sub: "Makarna ve pizza" },
      { ico: "🍣", bg: "#efe7fb", label: "Sushi", sub: "Çubuk kullanmayı öğrenirim" },
      { ico: "🥟", bg: "#fff0c9", label: "Ev usulü mantı", sub: "Sıcacık, klasik" },
      { ico: "🍔", bg: "#fdd9e6", label: "Burger", sub: "Patatesi paylaşırız" },
      { ico: "🎁", bg: "#efe7fb", label: "Sen seç", sub: "Sürprize açığım" }
    ], "m", "gun.html");
  }

  /* 5 · Gün */
  if (page === "gun") {
    var box = $("days"), today = new Date();
    for (var d = 1; d <= 14; d++) {
      var dt = new Date(today); dt.setDate(today.getDate() + d);
      var label = dt.toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" });
      var b = document.createElement("button"); b.type = "button"; b.className = "day";
      if (dt.getDay() === 0 || dt.getDay() === 6) b.classList.add("weekend");
      if (state.g === label) b.classList.add("on");
      b.innerHTML = "<small>" + dt.toLocaleDateString("tr-TR", { weekday: "short" }) + "</small><b>" + dt.getDate() + "</b><small>" + dt.toLocaleDateString("tr-TR", { month: "short" }) + "</small>";
      b.dataset.label = label;
      b.onclick = function () {
        box.querySelectorAll(".day").forEach(function (o) { o.classList.remove("on"); });
        this.classList.add("on"); burst(25);
        var l = this.dataset.label; setTimeout(function () { go("saat.html", { g: l }); }, 350);
      };
      box.appendChild(b);
    }
    /* kendi gününü seçsin */
    var dbox = $("customBox"), dinp = $("customDate");
    var pad2 = function (x) { return (x < 10 ? "0" : "") + x; };
    var iso = function (dd) { return dd.getFullYear() + "-" + pad2(dd.getMonth() + 1) + "-" + pad2(dd.getDate()); };
    var minD = new Date(today); minD.setDate(today.getDate() + 1);
    var maxD = new Date(today); maxD.setDate(today.getDate() + 120);
    dinp.min = iso(minD); dinp.max = iso(maxD);
    $("customToggle").onclick = function () {
      dbox.hidden = false; this.classList.add("on");
      box.querySelectorAll(".day").forEach(function (o) { o.classList.remove("on"); });
      try { dinp.focus(); if (dinp.showPicker) dinp.showPicker(); } catch (e) {}
    };
    $("customGo").onclick = function () {
      if (!dinp.value) { $("customHint").textContent = "Önce bir gün seç."; return; }
      var p = dinp.value.split("-"), dd = new Date(+p[0], +p[1] - 1, +p[2]);
      var l = dd.toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" });
      burst(25); setTimeout(function () { go("saat.html", { g: l }); }, 350);
    };
  }

  /* 6 · Saat */
  if (page === "saat") {
    choices("opts", state.t === "yemek" ? [
      { ico: "🌤️", bg: "#fff0c9", label: "13:00", sub: "Öğle arası" },
      { ico: "🏙️", bg: "#fdd9e6", label: "19:00", sub: "İş çıkışı" },
      { ico: "🌙", bg: "#efe7fb", label: "20:30", sub: "Akşam yemeği, acelesiz" }
    ] : [
      { ico: "🌸", bg: "#fdd9e6", label: "11:00", sub: "Güne kahveyle başlarız" },
      { ico: "☀️", bg: "#fff0c9", label: "15:00", sub: "Öğleden sonra molası" },
      { ico: "🏙️", bg: "#efe7fb", label: "18:00", sub: "İş çıkışı" }
    ], "s", "not.html");
    /* kendi saatini seçsin */
    var box = $("customBox"), inp = $("customTime");
    if (state.s && /^\d\d:\d\d$/.test(state.s)) inp.value = state.s;
    $("customToggle").onclick = function () {
      box.hidden = false; this.classList.add("on");
      $("opts").querySelectorAll(".opt").forEach(function (o) { o.classList.remove("on"); });
      try { inp.focus(); if (inp.showPicker) inp.showPicker(); } catch (e) {}
    };
    $("customGo").onclick = function () {
      if (!inp.value) { $("customHint").textContent = "Önce bir saat seç."; return; }
      burst(25); var v = inp.value; setTimeout(function () { go("not.html", { s: v }); }, 350);
    };
  }

  /* 7 · Not */
  if (page === "not") {
    var ta = $("note"); ta.value = state.n || "";
    var quicks = document.querySelectorAll(".quick");
    /* hangi hazır notlar metinde var: işaretli göster */
    function syncQuicks() {
      quicks.forEach(function (q) { q.classList.toggle("on", ta.value.indexOf(q.dataset.t) !== -1); });
    }
    function tidy(s) { return s.replace(/\s{2,}/g, " ").trim(); }
    syncQuicks();
    ta.addEventListener("input", syncQuicks);
    quicks.forEach(function (q) {
      q.onclick = function () {
        var t = q.dataset.t;
        if (ta.value.indexOf(t) !== -1) {
          /* zaten ekli: kaldır */
          ta.value = tidy(ta.value.split(t).join(" "));
        } else {
          ta.value = tidy(ta.value + " " + t); burst(12);
        }
        syncQuicks();
      };
    });
    $("next").onclick = function () { go("bilet.html", { n: ta.value.trim() }); };
    $("skip").onclick = function () { go("bilet.html", { n: "" }); };
  }

  /* 8 · Bilet */
  if (page === "bilet") {
    if (!state.t || !state.m || !state.g || !state.s) { location.replace("index.html"); return; }
    var kind = state.t === "yemek" ? "Yemek" : "Kahve";
    $("tKind").textContent = kind; $("tMenu").textContent = state.m;
    $("tDay").textContent = state.g; $("tTime").textContent = state.s;
    if (state.n) $("tNote").textContent = state.n; else $("tNoteRow").hidden = true;
    var msg = "Peki madem 😅 Davetini kabul ediyorum.\n\n" +
      (kind === "Kahve" ? "☕ " : "🍽️ ") + kind + ": " + state.m + "\n" +
      "📅 " + state.g + "\n" +
      "🕰️ " + state.s + "\n" +
      (state.n ? "📝 " + state.n + "\n" : "") +
      "\nResmimi de getirmeyi unutma 🎨";
    /* Mesaj direkt bu numaraya gider */
    var PHONE = "905318864491";
    $("wa").href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg);
    $("copy").onclick = function () {
      var ok = function () { $("copyMsg").textContent = "Kopyalandı. Şimdi bana yapıştırıp gönderebilirsin."; };
      var fail = function () { $("copyMsg").textContent = msg; };
      try { navigator.clipboard.writeText(msg).then(ok, fail); } catch (e) { fail(); }
    };
    $("again").onclick = function () { go("tercih.html"); };
    $("wa").addEventListener("click", function () {
      $("copyMsg").textContent = "WhatsApp açıldı. Gönder'e basmayı unutma; kod gelince yukarıdaki kutuya yaz 😅";
    });
    /* Instagram / Facebook içindeki tarayıcıda WhatsApp açılmayabilir */
    if (/Instagram|FBAN|FBAV|FB_IAB/i.test(navigator.userAgent)) $("inapp").hidden = false;
    /* resme dokununca büyük bak */
    var lb = $("lightbox");
    $("frame").onclick = function () { lb.hidden = false; document.body.style.overflow = "hidden"; };
    lb.onclick = function () { lb.hidden = true; document.body.style.overflow = ""; };
    setTimeout(function () { $("frame").classList.add("open"); burst(180); }, 500);

    /* ---------- filigran ve kod ----------
       Bilet sana gelince ona bu kodu veriyorsun; kodu girince filigran kalkıyor.
       Kodu değiştirmek için sadece bu satırı değiştir (büyük/küçük harf ve boşluk fark etmez): */
    var CODE = "LAVANTA26";

    /* filigran: en sevdiği çiçeklerden (lavanta, şakayık, lilyum) örülü bir örtü */
    function tile(key, x, y, w, h, rot) {
      var s = F[key]().replace('width="W"', 'width="' + w + '"').replace('height="H"', 'height="' + h + '"');
      s = s.replace('<svg ', '<svg x="' + x + '" y="' + y + '" ');
      return rot ? '<g transform="rotate(' + rot + ' ' + (x + w / 2) + ' ' + (y + h / 2) + ')">' + s + '</g>' : s;
    }
    var pattern = '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">' +
      tile("leaf", 96, 2, 26, 46, -35) + tile("leaf2", 200, 150, 26, 46, 30) +
      tile("peo", 4, 4, 92, 92, 0) + tile("lil", 118, 10, 80, 80, 12) +
      tile("lav", 66, 98, 34, 80, -12) + tile("lav2", 184, 84, 30, 70, 14) +
      tile("lil2", 128, 128, 72, 72, -8) + tile("peo3", 8, 130, 62, 62, 0) +
      tile("lil3", 40, 180, 40, 40, 20) + tile("peo2", 150, 196, 44, 44, 0) +
      tile("lil3", 102, 76, 42, 42, -15) + tile("peo2", 90, 166, 46, 46, 0) +
      '</svg>';
    document.querySelectorAll(".wm").forEach(function (w) {
      w.style.backgroundImage = 'url("data:image/svg+xml;charset=utf-8,' + encodeURIComponent(pattern) + '")';
    });
    function norm(s) {
      return String(s || "").replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase().replace(/[\s\-_.]/g, "");
    }
    var wrongs = [
      "Yanlış kod. Tahmin etmeye çalışıyorsun, belli 😅",
      "Olmadı. Bileti gerçekten gönderdin mi?",
      "Hâlâ yanlış. Kodu uyduruyorsun, biliyorum 😅",
      "Bu da değil. Kod bende, bilet sende; takas yapalım 😅",
      "Pes etme ama kodu da bir bana sor 😅"
    ];
    var tries = 0, free = false;
    try { free = localStorage.getItem("bn_free") === "1"; } catch (e) {}
    function unlock(celebrate) {
      $("frame").classList.add("free"); lb.classList.add("free");
      $("codebox").classList.add("done");
      $("codeTitle").textContent = "Çiçekler çekildi 🎉";
      $("codeText").textContent = "Resim artık tamamen senin. Resme uzun basıp kaydedebilirsin; aslını da elden getiriyorum.";
      $("coderow").hidden = true; $("steps").hidden = true; $("codeHint").textContent = "";
      $("lock").hidden = true; $("lbHint").textContent = "Kapatmak için dokun";
      try { localStorage.setItem("bn_free", "1"); } catch (e) {}
      if (celebrate) burst(200);
    }
    if (free) unlock(false);
    function check() {
      var v = norm($("code").value);
      if (!v) { $("codeHint").textContent = "Önce kodu yaz. Kod bende, bileti gönderince geliyor 😅"; return; }
      if (v === norm(CODE)) { unlock(true); return; }
      tries++;
      $("codeHint").textContent = wrongs[Math.min(tries - 1, wrongs.length - 1)];
      $("code").value = "";
      var cb = $("codebox"); cb.classList.remove("shake"); void cb.offsetWidth; cb.classList.add("shake");
    }
    $("codeGo").onclick = check;
    $("code").addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); check(); } });
  }
})();
