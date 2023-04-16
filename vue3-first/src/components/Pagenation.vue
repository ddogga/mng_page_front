<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getList(currentPage - 1)"
          >
            Previous
          </a>
        </li>
        <li
          v-for="page in pageList"
          :key="page"
          class="page-item"
          :class="currentPage == page ? 'active' : ''"
        >
          <a style="cursor: pointer" class="page-link" @click="getList(page)">{{
            page
          }}</a>
        </li>
        <li v-if="totalPages > currentPage" class="page-item">
          <a
            style="cursor: pointer"
            class="page-link"
            @click="getList(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { watch, ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const totalPages = ref(1);
    const currentPage = ref(1);
    const pageList = ref([]); // size에

    watch(
      () => store.state.userListStore.pageInfo,
      () => {
        totalPages.value = store.state.userListStore.pageInfo.totalPages;
        currentPage.value = store.state.userListStore.pageInfo.currentPage;
        pageList.value = store.state.userListStore.pageInfo.pageList;
      }
    );

    //페이지 네이션의 페이지 번호를 클릭한 경우
    //store의 state.page 값을 선택한 페이지로 변경합니다.
    const getList = (page) => {
      store.dispatch("userListStore/update_page", page);
    };

    return {
      currentPage,
      pageList,
      totalPages,
      getList,
    };
  },
};
</script>

<style scoped>
ul.pagination {
  justify-content: center;
}
</style>
