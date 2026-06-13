/* ===================================
  SPEAKLY - Dark Mode Toggle
   =================================== */

const toggle = document.getElementById('dark-mode-toggle');
const STORAGE_KEY = 'speakly-theme';

// Initialize theme from localStorage
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    updateToggleIcon(true);
  }
}

function updateToggleIcon(isLight) {
  if (!toggle) return;
  toggle.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
}

toggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  localStorage.setItem(STORAGE_KEY, isLight ? 'light' : 'dark');
  updateToggleIcon(isLight);
});

initTheme();
