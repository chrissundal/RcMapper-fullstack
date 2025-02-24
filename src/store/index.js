import { createStore } from 'vuex';

export default createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        sessionId: localStorage.getItem('sessionId') || '',
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
        setSessionId(state, sessionId) {
            state.sessionId = sessionId;
            localStorage.setItem('sessionId', sessionId);
        },
        clearSessionId(state) {
            state.sessionId = '';
            localStorage.removeItem('sessionId');
        },
        updateUser(state, user) {
            state.user = { ...state.user, ...user };
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    },
    actions: {
        login({ commit }, { user, sessionId }) {
            commit('setUser', user);
            commit('setSessionId', sessionId);
        },
        logout({ commit }) {
            commit('clearUser');
            commit('clearSessionId');
        },
        updateUser({ commit }, user) {
            commit('updateUser', user);
        }
    },
    getters: {
        isAuthenticated: state => !!state.sessionId,
    }
});
