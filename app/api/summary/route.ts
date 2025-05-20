import { NextResponse } from 'next/server';
import { fetchUsers, generateUserSummary } from '@/lib/services/userService';

/**
 * GET handler for /api/summary
 * Fetches users from the external API, transforms the data, and returns a summary grouped by department
 */
export async function GET() {
  try {
    // Step 1: Fetch users from the API
    const users = await fetchUsers();
    
    // Step 2: Generate summary by department
    const summary = generateUserSummary(users);
    
    // Step 3: Return the summary as JSON
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error('Error in summary API:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch or process user data' },
      { status: 500 }
    );
  }
} 