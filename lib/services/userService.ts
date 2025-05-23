import { User, UserApiResponse, SummaryResult } from '../types/user';

/**
 * Fetches users from the dummyjson.com API
 */
export async function fetchUsers(): Promise<User[]> {
  try {
    // Fetch with a limit of 100 to get more users for better results
    const response = await fetch('https://dummyjson.com/users');

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: UserApiResponse = await response.json();

    // Process the users to ensure they have department information
    return data.users.map(user => ({
      ...user,
      // Use company department as the user's department
      department: user.company.department
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

/**
 * Generates a summary of users grouped by department
 * Optimized for performance with a single pass through the data
 */
export function generateUserSummary(users: User[]): SummaryResult {
  // Initialize the result object
  const summary: SummaryResult = {};

  // Process each user in a single pass
  for (const user of users) {
    const department = user.department || 'Unknown';

    // Initialize department summary if it doesn't exist
    if (!summary[department]) {
      summary[department] = {
        male: 0,
        female: 0,
        ageRange: '',
        hair: {},
        addressUser: {}
      };
    }

    const departmentSummary = summary[department];

    // Count by gender
    if (user.gender === 'male') {
      departmentSummary.male++;
    } else if (user.gender === 'female') {
      departmentSummary.female++;
    }

    // Update hair color count
    const hairColor = user.hair.color;
    if (hairColor) {
      departmentSummary.hair[hairColor] = (departmentSummary.hair[hairColor] || 0) + 1;
    }

    // Add to addressUser map
    const nameKey = `${user.firstName} ${user.lastName}`;
    departmentSummary.addressUser[nameKey] = user.address.postalCode;
  }

  // Calculate age range for each department
  for (const department in summary) {
    const departmentUsers = users.filter(user => (user.department || 'Unknown') === department);
    const ages = departmentUsers.map(user => user.age);
    if (ages.length > 0) {
      summary[department].ageRange = sumAge(ages);
    }
  }

  return summary;
}

/**
 * Generates an age range in format "XX-XX" for a department
 * @param ages Array of ages to calculate the range from
 * @returns Age range in format "XX-XX"
 */
export function sumAge(ages: number[]): string {
  if (!ages || ages.length === 0) return '';

  const min = Math.min(...ages);
  const max = Math.max(...ages);

  return `${min}-${max}`;
}

