import { createContext, ReactNode, useState, useContext } from "react";

interface User {
    access_token: string;
    token_type: string; // Bearer
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {} 
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const userDetail = localStorage.getItem('user');
        return userDetail ? JSON.parse(userDetail) : null
    });

    const setUserAndStorage = (newUser: User | null) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser: setUserAndStorage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
