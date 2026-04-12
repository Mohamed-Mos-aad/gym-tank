import Cookies from 'js-cookie';

const TOKEN_KEY = 'gym_tank_token';

const cookieStore = {
    // حفظ التوكن في الكوكيز (ينتهي بعد 7 أيام مثلاً)
    saveToken: (token) => {
        if (token) {
            Cookies.set(TOKEN_KEY, token, { 
                expires: 7,    // مدة الصلاحية بالأيام
                path: '/',     // متاح في كل الموقع
                secure: true,  // يعمل فقط على https في الإنتاج
                sameSite: 'strict' 
            });
        }
    },



    getToken: () => {
        return Cookies.get(TOKEN_KEY);
    },



    removeToken: () => {
        Cookies.remove(TOKEN_KEY);
    },



    isAuthenticated: () => {
        const token = Cookies.get(TOKEN_KEY);
        return !!token;
    }
};

export default cookieStore;