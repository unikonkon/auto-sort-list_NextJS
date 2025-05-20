'use client'

import React, { useEffect, useState } from 'react';
import { fetchUsers, } from '@/lib/services/userService';
import { User, SummaryResult } from '@/lib/types/user';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [usersSummary, setUsersSummary] = useState<SummaryResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const fetchDataSummary = async () => {
        setIsSummaryLoading(true);
        try {
            const response = await fetch(`/api/summary`);
            const data = await response.json();
            setUsersSummary(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsSummaryLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-lg font-bold mb-4">Users Summary by Department</h1>
            <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${isSummaryLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => {
                    fetchDataSummary();
                }}
                disabled={isSummaryLoading}
            >
                {isSummaryLoading ? 'Generating...' : 'Generate Summary'}
            </button>
            {isLoading ? (
                <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            ) : usersSummary ? (
                <pre className="text-xs p-4 rounded-lg overflow-auto">
                    {JSON.stringify(usersSummary, null, 2)}
                </pre>
            ) : (
                <pre className="text-xs p-4 rounded-lg overflow-auto">
                    {JSON.stringify(users, null, 2)}
                </pre>
            )}
        </div>
    );
}
