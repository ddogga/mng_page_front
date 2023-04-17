<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-white">회원 조회 / 삭제</h1>
    </div>

    <!-- Content Row -->
    <div class="row">
      <!-- Area Table -->
      <div class="col-xl-10 col-lg-8">
        <div class="card shadow mb-4">
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-primary">현재 회원 현황</h6>
            <div>
              <span>회원수 : {{ count }}</span>
            </div>
          </div>
          <!-- Card Body -->
          <div class="card-body" v-show="count > 0">
            <table class="table">
              <thead class="table-light">
                <th>#</th>
                <th>Id</th>
                <th>가입일</th>
                <th>회원 분류</th>
                <th>회원 삭제</th>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="index">
                  <td>{{ startIndex + index }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.createDate }}</td>
                  <td>{{ user.role }}</td>
                  <td>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="userDelete(user.id)"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <Pagenation />
          </div>
          <div class="card-body" v-show="count == 0">
            회원이 존재하지 않습니다.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "@/axios/axiossetting.js";

import Pagenation from "@/components/Pagenation.vue";
export default {
  components: {
    Pagenation,
  },
  setup(props, context) {
    context.emit("parent_getSession", "");
    const store = useStore();

    //list
    const users = ref([]);
    const count = ref(0);
    const startIndex = ref(0);

    //page
    const size = store.state.pageStore.size;
    const startNum = ref(0);

    // console.log(
    //   "userList current page : " +
    //     computed(() => store.state.userListStore.pageInfo.currentPage)
    // );

    watch(
      () => store.state.pageStore.reqPage,
      () => {
        getUsers(store.state.pageStore.reqPage);
      }
    );

    const getUsers = async (page) => {
      try {
        const res = await axios.get("api/users", {
          params: { page: page - 1, size: size },
        });
        users.value = res.data.content;
        count.value = res.data.totalElements;
        startIndex.value = (page - 1) * size + 1;

        const totalPages = res.data.totalPages;
        const startPageNum = parseInt((page - 1) / size + 1);
        const endPageNum = totalPages > size ? startNum + size : totalPages + 1;

        let pageList = [];
        for (let i = startPageNum; i < endPageNum; i++) {
          pageList.push(i);
        }

        const pageInfo = {
          totalPages: totalPages,
          currentPage: page,
          pageList: pageList,
        };

        store.dispatch("pageStore/update_pageInfo", pageInfo);
      } catch (err) {
        console.log(err);
      }
    };

    const userDelete = async (id) => {
      const answer = confirm("정말 삭제하시겠습니까?");
      if (answer) {
        try {
          const res = await axios.delete("api/user", {
            params: { id: id },
          });
          console.log(res.data);
          if (res.data.result == "SUCCESS") {
            alert("삭제 성공");
            getUsers(1);
          } else if (res.data.result == "FAIL") {
            alert(res.data.reason);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    getUsers(1);

    return {
      users,
      count,
      startIndex,
      userDelete,
    };
  },
};
</script>
