'use client';

import { useUser } from '@/contexts/UserContext';

export default function SidebarHeader() {
    const user = useUser();

    // Get initials from user's name
    const initials = user.name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase();

    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-medium">{initials}</span>
            </div>
            <h1>Your PDFs</h1>
        </div>
    );
}