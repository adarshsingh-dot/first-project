const modal = document.getElementById('requestModal');
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const requestForm = document.getElementById('requestForm');
const formError = document.getElementById('formError');
const toast = document.getElementById('toast');
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const searchInput = document.getElementById('searchInput');
const requestRows = document.getElementById('requestRows');
const resultCount = document.getElementById('resultCount');
const totalCount = document.getElementById('totalCount');
const filterButton = document.getElementById('filterButton');
const filterMenu = document.getElementById('filterMenu');
let activeStatus = 'all';

function setModal(open) {
  modal.classList.toggle('open', open);
  modal.setAttribute('aria-hidden', String(!open));
  if (open) modal.querySelector('input').focus();
}

openModalButton.addEventListener('click', () => setModal(true));
closeModalButton.addEventListener('click', () => setModal(false));
modal.addEventListener('click', (event) => {
  if (event.target === modal) setModal(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setModal(false);
});

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(requestForm);
  const farmer = String(formData.get('farmer')).trim();
  const village = String(formData.get('village')).trim();
  const quantity = Number(formData.get('quantity'));

  if (!farmer || !village || !Number.isInteger(quantity) || quantity < 1) {
    formError.textContent = 'Enter a farmer, village, and a whole-number quantity from 1 to 100.';
    return;
  }

  const fertilizer = String(formData.get('fertilizer'));
  const initials = farmer.split(/\s+/).slice(0, 2).map((name) => name[0]).join('').toUpperCase();
  const requestId = `REQ-${24820 + requestRows.querySelectorAll('tr').length}`;
  const newRow = document.createElement('tr');
  newRow.innerHTML = `<td><div class="farmer-cell"><span class="table-avatar green">${initials}</span><div><strong>${escapeHtml(farmer)}</strong><small>${escapeHtml(village)}</small></div></div></td><td class="muted">${requestId}</td><td>${escapeHtml(fertilizer)}</td><td>${quantity} bags</td><td class="muted">Just now</td><td><span class="status pending">Pending review</span></td><td><button class="row-menu" aria-label="Request options">...</button></td>`;
  requestRows.prepend(newRow);
  totalCount.textContent = Number(totalCount.textContent) + 1;
  formError.textContent = '';
  setModal(false);
  requestForm.reset();
  applyRequestFilters();
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 3200);
});

menuButton.addEventListener('click', () => sidebar.classList.toggle('open'));

sidebar.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => sidebar.classList.remove('open'));
});

searchInput.addEventListener('input', (event) => {
  applyRequestFilters(event.target.value);
});

function applyRequestFilters(query = searchInput.value) {
  const normalizedQuery = query.toLowerCase().trim();
  const rows = [...requestRows.querySelectorAll('tr')];
  let visibleRows = 0;

  rows.forEach((row) => {
    const matchesSearch = row.textContent.toLowerCase().includes(normalizedQuery);
    const status = row.querySelector('.status')?.textContent.trim() || '';
    const matchesStatus = activeStatus === 'all' || status === activeStatus;
    const matches = matchesSearch && matchesStatus;
    row.hidden = !matches;
    if (matches) visibleRows += 1;
  });

  resultCount.textContent = visibleRows;
}

filterButton.addEventListener('click', () => {
  const isOpen = !filterMenu.hidden;
  filterMenu.hidden = isOpen;
  filterButton.setAttribute('aria-expanded', String(!isOpen));
});

filterMenu.addEventListener('click', (event) => {
  const option = event.target.closest('button[data-status]');
  if (!option) return;
  activeStatus = option.dataset.status;
  filterMenu.hidden = true;
  filterButton.setAttribute('aria-expanded', 'false');
  applyRequestFilters();
  showToast(activeStatus === 'all' ? 'Showing all requests.' : `Showing ${activeStatus.toLowerCase()} requests.`);
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.filter-wrap')) {
    filterMenu.hidden = true;
    filterButton.setAttribute('aria-expanded', 'false');
  }
});

requestRows.addEventListener('click', (event) => {
  const action = event.target.closest('.row-menu');
  if (!action) return;
  const row = action.closest('tr');
  const farmer = row.querySelector('.farmer-cell strong').textContent;
  showToast(`Request options opened for ${farmer}.`);
});

document.getElementById('notificationButton').addEventListener('click', () => showToast('You have 18 requests awaiting review.'));
document.getElementById('profileButton').addEventListener('click', () => showToast('Signed in as Ravi Agarwal, district officer.'));
document.getElementById('stockOptions').addEventListener('click', () => showToast('Stock options are available in the inventory view.'));
document.getElementById('inventoryButton').addEventListener('click', () => showToast('Inventory view selected.'));
document.getElementById('viewAllButton').addEventListener('click', () => {
  searchInput.value = '';
  activeStatus = 'all';
  applyRequestFilters();
  showToast('Showing all available farmer requests.');
});

document.querySelectorAll('.nav-item[data-section]').forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelectorAll('.nav-item').forEach((navItem) => navItem.classList.remove('active'));
    item.classList.add('active');
    showToast(`${item.dataset.section} is ready for the next module.`);
    sidebar.classList.remove('open');
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

document.getElementById('reviewRequests').addEventListener('click', () => {
  document.getElementById('requests').scrollIntoView({ behavior: 'smooth' });
});
