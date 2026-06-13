/* ===================================
   SPEAKLY - Search & Filter Logic
   =================================== */

// ---- Vocabulary Search ----
const vocabInput = document.getElementById('vocab-search');

if (vocabInput) {
  vocabInput.addEventListener('input', () => {
    const query = vocabInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.vocab-card');
    let visible = 0;

    cards.forEach(card => {
      const english = card.querySelector('.vocab-english')?.textContent.toLowerCase() || '';
      const translation = card.querySelector('.vocab-translation')?.textContent.toLowerCase() || '';
      const match = english.includes(query) || translation.includes(query);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    // Show empty state
    const emptyState = document.getElementById('vocab-empty');
    if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
  });
}

// ---- Conversation Search ----
const convSearch = document.getElementById('conv-search');

if (convSearch) {
  convSearch.addEventListener('input', filterConversations);
}

// ---- Conversation Filter Buttons ----
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterConversations();
  });
});

function filterConversations() {
  const query = convSearch?.value.toLowerCase().trim() || '';
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  const cards = document.querySelectorAll('.conv-card');

  cards.forEach(card => {
    const title = card.querySelector('.conv-title')?.textContent.toLowerCase() || '';
    const category = card.dataset.category || '';
    const text = card.textContent.toLowerCase();

    const matchSearch = query === '' || text.includes(query);
    const matchFilter = activeFilter === 'all' || category === activeFilter;

    if (matchSearch && matchFilter) {
      card.classList.remove('hidden-card');
    } else {
      card.classList.add('hidden-card');
    }
  });
}
