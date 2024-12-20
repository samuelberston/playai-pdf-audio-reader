import { createContext, useContext, ReactNode } from 'react';

interface User {
    userId: string;
    name: string;
    email: string;
}

// Mock user data
const mockUser: User = {
    userId: '123456789',
    name: 'Samuel Berston',
    email: 'samuelberston@gmail.com'
};

const UserContext = createContext<User>(mockUser);

export function UserProvider({ children }: { children: ReactNode }) {
    // Later, this will be replaced with actual auth logic
    return (
        <UserContext.Provider value={mockUser}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext); 