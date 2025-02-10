import { reactive } from 'vue';

const state = reactive({
    userId: 1,
});

const setUserId = (id) => {
    state.userId = id;
};

export { state, setUserId };
