// Brings saved games over from the old address (josejerez27.github.io/family-game-jars).
// The old pages forward here with #carry=<their saved data>. We only fill in what this
// device doesn't already have, then remove the data from the address bar.
(function () {
  var KEYS = ["boredjar3", "xmasjar1", "babyjar1"];
  var m = location.hash.match(/^#carry=(.+)$/);
  if (!m) return;
  var data = {};
  try { data = JSON.parse(decodeURIComponent(m[1])) || {}; } catch (e) {}
  KEYS.forEach(function (k) {
    try {
      if (typeof data[k] !== "string" || localStorage.getItem(k)) return;
      JSON.parse(data[k]); // only keep it if it's valid saved data
      localStorage.setItem(k, data[k]);
    } catch (e) {}
  });
  try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
})();
