// src/utils/authUtils.ts
export const getToken = (): string | null => localStorage.getItem('token');
export const setToken = (token: string | null): void => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
};
