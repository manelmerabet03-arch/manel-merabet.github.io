/* ==================================================================
   SCRIPT DU PORTFOLIO : boutons langue (FR/EN) et thème (clair/sombre)
   Utilisé par TOUTES les pages. Tu n'as pas besoin d'y toucher.
   ================================================================== */
var racine = document.documentElement;

function enregistrer(cle, valeur) {
  try { localStorage.setItem(cle, valeur); } catch (e) {}
}

function themeActuel() {
  var t = racine.getAttribute('data-theme');
  if (t) return t;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function majBoutonTheme() {
  var b = document.getElementById('bouton-theme');
  if (b) b.textContent = themeActuel() === 'dark' ? '☀' : '☾';
}

/* Le titre de l'onglet du navigateur est écrit dans la balise <html>
   avec data-title-fr="..." et data-title-en="..." */
function majTitre() {
  var t = racine.getAttribute('data-title-' + racine.getAttribute('data-lang'));
  if (t) document.title = t;
}

function appliquerLangue(langue) {
  racine.setAttribute('data-lang', langue);
  racine.lang = langue;
  majTitre();
}

function changerTheme() {
  var nouveau = themeActuel() === 'dark' ? 'light' : 'dark';
  racine.setAttribute('data-theme', nouveau);
  enregistrer('theme', nouveau);
  majBoutonTheme();
}

function changerLangue() {
  var nouvelle = racine.getAttribute('data-lang') === 'fr' ? 'en' : 'fr';
  appliquerLangue(nouvelle);
  enregistrer('lang', nouvelle);
}

/* Si on change la langue ou le thème dans un onglet,
   les autres onglets du portfolio se mettent à jour aussi */
window.addEventListener('storage', function (e) {
  if (e.key === 'lang' && e.newValue) appliquerLangue(e.newValue);
  if (e.key === 'theme' && e.newValue) { racine.setAttribute('data-theme', e.newValue); majBoutonTheme(); }
});

majBoutonTheme();
majTitre();
