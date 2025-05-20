import { describe, it, expect, beforeAll } from 'vitest';
import { fetchUsers, generateUserSummary } from './userService';
import { User } from '../types/user';

describe('userService', () => {
  // Store fetched users for reuse across tests
  let users: User[] = [];

  // Fetch users before all tests
  beforeAll(async () => {
    try {
      users = await fetchUsers();
    } catch (error) {
      console.error('Error fetching users for tests:', error);
    }
  });

  describe('fetchUsers', () => {
    it('should fetch users from the API', async () => {
      // Fetch users
      const fetchedUsers = await fetchUsers();

      // Verify response structure
      expect(Array.isArray(fetchedUsers)).toBe(true);
      expect(fetchedUsers.length).toBeGreaterThan(0);

      // Verify a user has the right structure
      const user = fetchedUsers[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('gender');
      expect(user).toHaveProperty('age');
      expect(user).toHaveProperty('hair');
      expect(user).toHaveProperty('address');
      expect(user).toHaveProperty('department');
    });
  });

  describe('generateUserSummary', () => {
    it('should correctly group users by department and calculate summaries', async () => {
      // Skip if no users fetched
      if (users.length === 0) {
        console.warn('Skipping test because no users were fetched');
        return;
      }

      // Generate summary
      const summary = generateUserSummary(users);

      // Check summary structure
      expect(Object.keys(summary).length).toBeGreaterThan(0);

      // Verify each department has the right structure
      for (const department of Object.keys(summary)) {
        const deptSummary = summary[department];

        expect(deptSummary).toHaveProperty('male');
        expect(typeof deptSummary.male).toBe('number');

        expect(deptSummary).toHaveProperty('female');
        expect(typeof deptSummary.female).toBe('number');

        expect(deptSummary).toHaveProperty('ageRange');

        expect(deptSummary).toHaveProperty('hair');
        expect(typeof deptSummary.hair).toBe('object');

        expect(deptSummary).toHaveProperty('addressUser');
        expect(typeof deptSummary.addressUser).toBe('object');
      }
    });

    it('should handle empty user array', () => {
      const summary = generateUserSummary([]);
      expect(summary).toEqual({});
    });

    it('should handle users without department', async () => {
      // Skip if no users fetched
      if (users.length === 0) {
        console.warn('Skipping test because no users were fetched');
        return;
      }

      // Create a modified copy of user without department
      const userWithoutDept = {
        ...users[0],
        department: undefined
      };

      // Generate summary
      const summary = generateUserSummary([userWithoutDept]);

      expect(summary).toHaveProperty('Unknown');
      expect(summary.Unknown.male).toBe(userWithoutDept.gender === 'male' ? 1 : 0);
      expect(summary.Unknown.female).toBe(userWithoutDept.gender === 'female' ? 1 : 0);
    });

    it('should correctly aggregate hair colors', async () => {
      // Skip if no users fetched
      if (users.length === 0) {
        console.warn('Skipping test because no users were fetched');
        return;
      }

      // Generate summary
      const summary = generateUserSummary(users);

      // For each department, verify hair color counts
      for (const department of Object.keys(summary)) {
        const deptSummary = summary[department];

        // Find users in this department
        const deptUsers = users.filter(user =>
          (user.department || 'Unknown') === department);

        // Count unique hair colors
        const hairColors = new Set(deptUsers.map(user => user.hair.color));

        // Check that each hair color in the department is accounted for
        expect(Object.keys(deptSummary.hair).length).toBeGreaterThanOrEqual(hairColors.size);
      }
    });

    it('should correctly map user names to postal codes', async () => {
      // Skip if no users fetched
      if (users.length === 0) {
        console.warn('Skipping test because no users were fetched');
        return;
      }

      // Generate summary
      const summary = generateUserSummary(users);

      // Take a sample user
      const sampleUser = users[0];
      const department = sampleUser.department || 'Unknown';

      // Check if the user's name maps to their postal code
      const nameKey = `${sampleUser.firstName}${sampleUser.lastName}`;

      if (summary[department]) {
        expect(summary[department].addressUser[nameKey]).toBe(sampleUser.address.postalCode);
      }
    });
  });
}); 
