import axios from 'axios';

export default class Users {
  constructor(query) {
    this.query = query;
  }

  async getUsers() {
    const prefix = 'https://cors-anywhere.herokuapp.com/';

    try {
      const response = await axios(
        `${prefix}https://dwp-techtest.herokuapp.com/users`,
      );
      return response.data;
    } catch (exception) {
      return exception.message;
    }
  }

  async filterUsers() {
    // Degrees in 1 mile
    const radius = this.query * 0.01449275362;
    // Coordinates of London for centre point
    const london = {
      latitude: 51.509865,
      longitude: -0.118092,
    };
    // Get users list from API
    const data = await this.getUsers();
    // Create results array
    const results = [];

    // If result is not an error string then map data
    if (typeof data !== 'string') {
      data.map(el => {
        if ((el.latitude - london.latitude) ** 2 +
          (el.longitude - london.longitude) ** 2 <= radius ** 2) {
          results.push(el);
        }
      });

      // Alphabetise results by last name
      results.sort((a, b) => {
        if (a.last_name < b.last_name) {
          return -1;
        }
        if (a.last_name > b.last_name) {
          return 1;
        }

        return 0;
      });
      // Return results
      return this.results = results;
    }
    // Return error message
    return this.error = data;
  }
}
