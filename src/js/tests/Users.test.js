import Users from '../models/Users';

it('creates a new User object when a query passed', () => {
  const query = 100;
  expect(new Users(query)).toEqual({
    'query': 100,
  });
});

it('should return empty object if no users found', async () => {
  const users = new Users(1);
  const result = await users.filterUsers();

  expect(result).toEqual([]);
});

it('should fetch users and filter based on query', async () => {
  const expectedUsers = {
    email: 'agarnsworthy7d@seattletimes.com',
    first_name: 'Ancell',
    id: 266,
    ip_address: '67.4.69.137',
    last_name: 'Garnsworthy',
    latitude: 51.6553959,
    longitude: 0.0572553,
  };
  const users = new Users(17);
  const result = await users.filterUsers();

  expect(result).toEqual([expectedUsers]);
});
