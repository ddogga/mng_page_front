const userListStore = {
  namespaced: true,
  state: () => ({
    size: 5,
    reqPage: 1,
    pageInfo: {
      totalPages: 1,
      currentPage: 1,
      pageList: [],
    },
  }),

  mutations: {
    // update_current_page(state, payload) {
    //   state.pageInfo.currentPage = payload;
    // },
    // update_total_pages(state, payload) {
    //   state.totalPages = payload;
    // },
    // update_page_list(state, payload) {
    //   state.pageInfo.pageList = payload;
    // },
    update_pageInfo(state, payload) {
      state.pageInfo = payload;
    },
    update_page(state, payload) {
      state.reqPage = payload;
    },
  },

  actions: {
    // update_current_page(context, currentPage) {
    //   context.commit("update_current_page", currentPage);
    // },
    // update_total_pages(context, totalPage) {
    //   context.commit("update_total_pages", totalPage);
    // },
    // update_page_list(context, pageList) {
    //   context.commit("update_page_list", pageList);
    // },

    update_pageInfo(context, pageInfo) {
      context.commit("update_pageInfo", pageInfo);
    },
    update_page(context, page) {
      context.commit("update_page", page);
    },
  },
};

export default userListStore;
