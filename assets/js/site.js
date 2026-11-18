// News list on the top page: coloured labels, a filter, and "show all".
// Without JavaScript the list is simply shown in full.
(function () {
  'use strict';
  var news = document.getElementById('news');
  if (!news) return;
  var items = Array.prototype.slice.call(news.querySelectorAll(':scope > ul > li'));
  if (!items.length) return;

  var KINDS = [
    ['paper', 'Papers & books', /publication|paper|preprint|book/i],
    ['grant', 'Grants', /grant|award/i],
    ['talk', 'Talks & meetings', /talk|conference|workshop|symposium/i],
    ['event', 'Lab events', /./]
  ];
  var FIRST = 12;

  items.forEach(function (item) {
    // Items separated by blank lines in Markdown come wrapped in a <p>.
    var li = item.querySelector(':scope > p') || item;
    // "[Invited Talk] ..." -> label
    var t = li.firstChild;
    var m = t && t.nodeType === 3 && t.nodeValue.match(/^\s*\[([^\]]+)\]\s*/);
    var label = m ? m[1] : 'Event';
    var kind = 'event';
    for (var k = 0; k < KINDS.length; k++) if (KINDS[k][2].test(label)) { kind = KINDS[k][0]; break; }
    item.dataset.kind = kind;
    if (m) {
      t.nodeValue = t.nodeValue.slice(m[0].length);
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = label;
      li.insertBefore(tag, t);
    }
    // "English<br>日本語" -> the Japanese part goes on its own, quieter line
    var br = li.querySelector(':scope > br');
    if (br) {
      var ja = document.createElement('span');
      ja.className = 'ja'; ja.lang = 'ja';
      while (br.nextSibling) ja.appendChild(br.nextSibling);
      var jt = ja.firstChild;
      if (jt && jt.nodeType === 3) jt.nodeValue = jt.nodeValue.replace(/^\s*\[[^\]]+\]\s*/, '');
      li.replaceChild(ja, br);
    }
  });

  var current = 'all', expanded = false;
  var bar = document.createElement('div');
  bar.className = 'filters';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Filter news');
  var more = document.createElement('button');
  more.type = 'button';
  more.className = 'more';

  function apply() {
    var shown = 0, total = 0;
    items.forEach(function (li) {
      var ok = current === 'all' || li.dataset.kind === current;
      if (ok) total++;
      var show = ok && (expanded || shown < FIRST);
      if (show) shown++;
      li.hidden = !show;
    });
    more.hidden = expanded || total <= FIRST;
    more.textContent = 'Show all ' + total;
  }

  [['all', 'All']].concat(KINDS).forEach(function (k) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = k[1];
    b.dataset.kind = k[0];
    b.setAttribute('aria-pressed', k[0] === 'all');
    b.addEventListener('click', function () {
      current = k[0]; expanded = false;
      Array.prototype.forEach.call(bar.children, function (c) { c.setAttribute('aria-pressed', c === b); });
      apply();
    });
    bar.appendChild(b);
  });
  more.addEventListener('click', function () { expanded = true; apply(); });

  var list = items[0].parentNode;
  list.parentNode.insertBefore(bar, list);
  list.parentNode.insertBefore(more, list.nextSibling);
  news.classList.add('enhanced');
  apply();
})();
