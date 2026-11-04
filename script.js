(function () {
  var root = document.documentElement;

  // Theme: system / light / dark, remembered per visitor.
  var themeButtons = document.querySelectorAll('[data-theme-set]');
  function applyTheme(mode) {
    if (mode === 'light' || mode === 'dark') root.dataset.theme = mode;
    else delete root.dataset.theme;
    themeButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.themeSet === mode)); });
  }
  var saved = 'system';
  try { saved = localStorage.getItem('theme') || 'system'; } catch (e) {}
  applyTheme(saved);
  themeButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      var mode = b.dataset.themeSet;
      try { localStorage.setItem('theme', mode); } catch (e) {}
      applyTheme(mode);
    });
  });

  // Mobile menu: the sidebar slides in as a drawer.
  var side = document.querySelector('.side');
  var menuBtn = document.querySelector('.menu-btn');
  function setMenu(open) {
    side.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    var use = menuBtn.querySelector('use');
    if (use) use.setAttribute('href', open ? '#i-close' : '#i-menu');
    if (open) side.querySelector('a').focus();
  }
  if (side && menuBtn) {
    menuBtn.addEventListener('click', function () { setMenu(!side.classList.contains('is-open')); });
    side.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && side.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); } });
    document.addEventListener('click', function (e) {
      if (side.classList.contains('is-open') && !side.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
  }

  // Avatar: shows assets/avatar.jpg once the file exists, otherwise the dot frame stays.
  document.querySelectorAll('.avatar img').forEach(function (img) {
    function ok() { img.closest('.avatar').classList.add('has-photo'); }
    function missing() { img.remove(); }
    if (img.complete) { img.naturalWidth ? ok() : missing(); }
    else { img.addEventListener('load', ok); img.addEventListener('error', missing); }
  });

  // Fanned project cards: clicking a card behind swings it to the front.
  var fan = document.querySelector('[data-fan]');
  if (fan) {
    var cards = Array.prototype.slice.call(fan.querySelectorAll('.pcard'));
    function front(card) {
      var i = cards.indexOf(card);
      var n = cards.length;
      cards.forEach(function (c, k) {
        var d = ((k - i + n + 1) % n) - 1;
        c.dataset.pos = String(d);
        c.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
        c.querySelectorAll('a').forEach(function (a) { a.tabIndex = d === 0 ? 0 : -1; });
      });
    }
    cards.forEach(function (c) {
      c.addEventListener('click', function (e) {
        if (c.dataset.pos !== '0' && window.matchMedia('(min-width: 901px)').matches) { e.preventDefault(); front(c); }
      });
    });
    var pick = fan.querySelectorAll('[data-fan-pick]');
    pick.forEach(function (b) {
      b.addEventListener('click', function () { front(cards[Number(b.dataset.fanPick)]); });
    });
    front(cards[Number(fan.dataset.start || 0)]);
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (m) {
      if (!m.matches) cards.forEach(function (c) { c.removeAttribute('aria-hidden'); c.querySelectorAll('a').forEach(function (a) { a.tabIndex = 0; }); });
      else front(cards[cards.findIndex(function (c) { return c.dataset.pos === '0'; })]);
    });
  }

  // Certifications come from data/certifications.js; the section stays hidden while it is empty.
  var certSec = document.querySelector('[data-certs]');
  var certs = window.CERTIFICATIONS || [];
  document.querySelectorAll('[data-certs-empty]').forEach(function (el) { el.hidden = certs.length > 0; });
  if (certSec && certs.length) {
    var grid = certSec.querySelector('.certs');
    certs.forEach(function (c) {
      var el = document.createElement('div');
      el.className = 'cert';
      el.innerHTML = '<span class="mono-tile"></span><b></b><span></span>';
      el.querySelector('.mono-tile').textContent = (c.issuer || '?').slice(0, 2).toUpperCase();
      el.querySelector('b').textContent = c.name;
      el.querySelectorAll('span')[1].textContent = [c.issuer, c.year].filter(Boolean).join(' · ');
      if (c.url) {
        var a = document.createElement('a');
        a.href = c.url; a.rel = 'noopener';
        a.innerHTML = 'verify <svg class="icon" aria-hidden="true"><use href="#i-ext"/></svg>';
        el.appendChild(a);
      }
      grid.appendChild(el);
    });
    certSec.hidden = false;
    document.querySelectorAll('[data-cert-link]').forEach(function (l) { l.hidden = false; });
  }

  // Contact form: builds an email; nothing is sent from the page.
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var lines = ['Hi Quang,', ''];
      if (d.get('message')) lines.push(String(d.get('message')), '');
      var who = [d.get('name'), d.get('role') && ('hiring for ' + d.get('role')), d.get('company') && ('at ' + d.get('company'))].filter(Boolean).join(', ');
      if (who) lines.push(who);
      var subject = 'Interview request' + (d.get('company') ? ' from ' + d.get('company') : '');
      window.location.href = 'mailto:tktnq2004@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
    });
  }

  // Copy email.
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.copy;
      var done = function () { var t = b.textContent; b.textContent = 'copied'; setTimeout(function () { b.textContent = t; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });

  // Screenshot slots on the Trạm OTA page hide until their file exists.
  document.querySelectorAll('[data-shot] img').forEach(function (img) {
    function drop() {
      var fig = img.closest('[data-shot]');
      var group = fig.parentNode;
      fig.remove();
      if (!group.querySelector('[data-shot]')) group.hidden = true;
    }
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener('error', drop);
  });
})();
