import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    userName: "",
  },
  mutations: {
    //state의 값을 변경하는 곳
    set_userName(state, payload) {
      state.userName = payload;
    },
  },

  actions: {
    //mutation을 실행시키는 역할

    set_userName(context, userName) {
      //commit(mutations에 정의된 함수이름, 함수에 넘길 값)
      context.commit("set_userName", userName);
    },
  },
  plugins: [
    createPersistedState({
      paths: ["userName"],
    }),
  ],
});
