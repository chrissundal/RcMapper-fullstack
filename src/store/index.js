import { createStore } from 'vuex';
import Cookies from 'js-cookie';

export default createStore({
    state: {
        user: JSON.parse(Cookies.get('user') || null),
        token: Cookies.get('token') || '',
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            Cookies.set('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = null;
            Cookies.remove('user');
        },
        setToken(state, token) {
            state.token = token;
            Cookies.set('token', token);
        },
        clearToken(state) {
            state.token = '';
            Cookies.remove('token');
        }
    },
    actions: {
        login({ commit }, { user, token }) {
            commit('setUser', user);
            commit('setToken', token);
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearToken');
        },
    },
    getters: {
        isAuthenticated: state => !!state.token,
    }
});
