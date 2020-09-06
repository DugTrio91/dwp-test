import { elements } from './base';

// Get value of input from DOM
export const getInput = () => elements.searchInput.value;

// Clear the contents of the input
export const clearInput = () => {
  elements.searchInput.value = '';
};

// Clear the current list of results from the DOM
export const clearResults = () => {
  elements.resultsList.innerHTML = '';
  elements.searchFooter.innerHTML = '';
};

// Display how many results were found
export const countResults = (count, query) => {
  elements.resultsCount.innerHTML = `
    <strong>${count}</strong> people found within <strong>${query} miles</strong> of London.
  `;
};

// Clear the results count
export const clearCount = () => {
  elements.resultsCount.innerHTML = '';
};

// Show the loading spinner
export const renderSpinner = () => {
  const spinner = `
      <div class="spinner" aria-hidden="true"></div>
  `;
  elements.results.insertAdjacentHTML('afterbegin', spinner);
};

// Clear the loading spinner
export const clearSpinner = () => {
  const loader = document.querySelector('.spinner');

  if (loader) loader.parentElement.removeChild(loader);
};

// Render an error alert
export const renderError = (error) => {
  const spinner = `
      <div class="l-alert alert" role="alert">
        <p class="l-alert__title alert__title">
          Sorry, there was an error. Please try again later
        </p>
        <p class="l-alert__details alert__details">Error details: ${error}</p>
      </div>
  `;
  elements.results.insertAdjacentHTML('afterbegin', spinner);
};

// Clear error alert
export const clearError = () => {
  const alert = document.querySelector('.alert');

  if (alert) alert.parentElement.removeChild(alert);
};

// Render the results list
export const renderResults = (users, page = 1, resultsPerPage = 10) => {
  // Render results of current page
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;

  users.slice(start, end).forEach(renderUser);

  // Render pagination buttons
  if (users.length > resultsPerPage) {
    renderButtons(page, users.length, resultsPerPage);
  }
};

const renderButtons = (page, numberOfResults, resultsPerPage) => {
  const pages = Math.ceil(numberOfResults / resultsPerPage);
  let pageCount = createPageCount(page, pages);
  let button;

  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `${createButton(page, 'prev')}
              ${createButton(page, 'next')}`;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }

  elements.searchFooter.insertAdjacentHTML('afterbegin', pageCount);
  elements.searchFooter.insertAdjacentHTML('beforeend', button);
};

// Create pagination buttons. Type: prev or next
const createButton = (page, type) => `
  <button 
    class="l-search-footer__btn search-footer__btn l-search-footer__btn--${type}" 
    data-goto="${type === 'prev' ? page - 1 : page + 1}"
    aria-label="Go to page ${type === 'prev' ? page - 1 : page + 1}"
  >
    ${type === 'prev' ? 'Previous' : 'Next'}
  </button>
`;

// Render page count text
const createPageCount = (page, pages) => `
  <span class="l-search-footer__count search-footer__count">
    Page ${page} of ${pages}
  </span>
`;

// Render result list item
const renderUser = user => {
  const markup = `
    <li class="l-results__list-result results__list-result">
        <p class="l-results__list-result-name results__list-result-name">
          <strong>Name:</strong> ${user.first_name} ${user.last_name}
        </p>
        <p class="l-results__list-result-email results__list-result-email">
          <strong>Email Address:</strong> <a href="mailto:${user.email}">${user.email}</a>
        </p>
    </li>
  `;
  elements.resultsList.insertAdjacentHTML('beforeend', markup);
};
