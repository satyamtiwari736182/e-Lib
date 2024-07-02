import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface TokenStore {
    token: string;
    setToken: (data: string) => void;
}

const useTokenStore = create<TokenStore>()(
    devtools(
        persist(
            (set) => ({
                token: '',
                setToken: (data: string) => set(() => ({ token: data })),
            }),
            { name: 'token-store' }
        )
    )
);
export interface Theme {
    theme: string;
    setTheme: (data: string) => void;
}

export const useTheme = create<Theme>()(
    devtools(
        persist(
            (set) => ({
                theme: "light",
                setTheme: (data: string) => set(() => ({ theme: data })),
            }),
            { name: 'theme-store' }
        )
    )
);

export default useTokenStore;
