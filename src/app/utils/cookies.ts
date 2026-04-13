import { cookies } from "next/headers";

const TOKEN_KEY = "gym_tank_token";

export const serverCookies = {
    saveToken: async (token: string) => {
        const cookieStore = await cookies();

        cookieStore.set(TOKEN_KEY, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        });
    },

    getToken: async () => {
        const cookieStore = await cookies();
        return cookieStore.get(TOKEN_KEY)?.value;
    },

    removeToken: async () => {
        const cookieStore = await cookies();
        cookieStore.delete(TOKEN_KEY);
    },
};