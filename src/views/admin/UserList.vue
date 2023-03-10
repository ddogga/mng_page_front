<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">회원 조회 / 수정</h1>
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
                <tr v-for="(item, index) in users" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.createdDate }}</td>
                  <td>{{ item.role }}</td>
                  <td>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="userDelete(item.id)"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "../../axios/axiossetting.js";
export default {
  setup(props, context) {
    context.emit("parent_getSession", "");
    const users = ref([]);
    const count = ref(0);

    const getUsers = async () => {
      try {
        const res = await axios.get("api/users/role_users", {
          params: { role: "user" },
        });
        console.log(res.data);
        users.value = res.data;
        count.value = users.value.length;
      } catch (arr) {
        console.log(err);
      }
    };

    const userDelete = async (id) => {
      const answer = confirm("정말 삭제하시겠습니까?");
      if (answer) {
        try {
          const res = await axios.delete("api/users", {
            params: { id: id },
          });
          console.log(res.data);
          if (res.data.result == "SUCCESS") {
            alert("삭제 성공");
            getList();
          } else if (res.data.result == "FAIL") {
            alert(res.data.reason);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    getUsers();
    return {
      users,
      count,
      userDelete,
    };
  },
};
</script>
