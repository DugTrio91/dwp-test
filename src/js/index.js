import Users from './models/Users';
import * as polyfill from './polyfill';
import * as usersView from './views/usersView';
import { elements } from './views/base';

const state = {};

const usersController = async () => {
  // Get miles query from view or 50
  const query = usersView.getInput() ? usersView.getInput() : 50;

  if (query) {
    // New User object and add to state
    state.users = new Users(query);

    // Prepare UI
    elements.results.setAttribute('aria-busy', 'true');
    usersView.clearError();
    usersView.renderSpinner();
    usersView.clearInput();
    usersView.clearResults();
    usersView.clearCount();

    try {
      // Get Users
      await state.users.filterUsers();

      if (!state.users.error) {
        // Render count of results on view
        usersView.countResults(state.users.results.length, query);
        // Render results in view
        usersView.renderResults(state.users.results);
      } else {
        usersView.renderError(state.users.error);
      }
      // Clear loading spinner
      usersView.clearSpinner();
      // Let screen readers access returned data
      elements.results.setAttribute('aria-busy', 'false');
    } catch (exception) {
      // Clear loading spinner
      usersView.clearSpinner();
      // Display error
      usersView.renderError(exception.message);
    }
  }
};

// Event listener for submit button
elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  usersController();
});

// Event listener for pagination buttons
elements.searchFooter.addEventListener('click', e => {
  polyfill.closestPolyfill()
  const btn = e.target.closest('.search-footer__btn');

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);

    usersView.clearResults();
    usersView.renderResults(state.users.results, goToPage);
  }
});

// Event listener to run query on page load with 50 miles
window.addEventListener('load', usersController);
