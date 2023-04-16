import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import userListStore from "@/store/modules/userListStore.js";

export default createStore({
  modules: {
    //store.state.명시된 store 모듈 이름.state값으로 접근
    userListStore: userListStore,
  },
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
