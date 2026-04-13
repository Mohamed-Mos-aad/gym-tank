// ** Hooks && Tools
import Cookies from 'js-cookie';



// ** Constant
const TOKEN_KEY = 'gym_tank_token';



const cookieStore = {
    saveToken: (token) => {
        if (token) {
            Cookies.set(TOKEN_KEY, token, { 
                expires: 7,
                path: '/',
                secure: true,
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