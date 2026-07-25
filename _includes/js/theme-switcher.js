(function () {
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const label = toggle.querySelector('.label');

// 1. Appliquer le thème sauvegardé au chargement (dans <head>, avant paint)
const saved = localStorage.getItem('theme');
if (saved) {
    root.setAttribute('data-theme', saved);
}

// 2. Mettre à jour le label au chargement
updateLabel();

// 3. Toggle au clic
toggle.addEventListener('click', function () {
    const current = root.getAttribute('data-theme');

    // Déterminer le nouveau thème
    let theme;
    if (!current) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'light'
        : 'dark';
    } else {
    theme = current === 'dark' ? 'light' : 'dark';
    }

    // Appliquer le thème
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateLabel();

    // Petit hack : empêcher le focus pour éviter le state:focus qui interfère
    toggle.blur();
});

function updateLabel() {
    const current = root.getAttribute('data-theme');
    if (!current) {
    label.textContent = 'Auto';
    } else {
    label.textContent = current === 'dark' ? 'Sombre' : 'Clair';
    }
}

// 4. Listener pour les changements système en temps réel (si mode Auto)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
    root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    updateLabel();
    }
});
})();