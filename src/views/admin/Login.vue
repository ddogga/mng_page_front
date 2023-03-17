<template>
  <div>
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-5">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">Login</h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="loginProcess">
                      <div class="form-floating mb-3">
                        <input
                          class="form-control"
                          type="text"
                          placeholder="ID"
                          v-model="id"
                          required
                        />
                        <label for="inputEmail">ID</label>
                      </div>
                      <div class="form-floating mb-3">
                        <input
                          class="form-control"
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          v-model="password"
                          required
                        />
                        <label for="inputPassword">Password</label>
                      </div>
                      <div
                        class="d-flex align-items-center justify-content-between mt-4 mb-0"
                      >
                        <a class="small" href="password.html"
                          >Forgot Password?</a
                        >
                        <button type="submit" class="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center py-3">
                    <div class="small">
                      <router-link to="/shop/join">
                        <span>Need an account? Sign up!</span>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

import { ref } from "vue";
import axios from "../../axios/axiossetting.js";

export default {
  emits: ["parent_getSession"],
  setup(props, context) {
    context.emit("parent_getSession", "login");

    const router = useRouter();

    const id = ref("");
    const password = ref("");

    const loginProcess = async () => {
      try {
        const res = await axios.post("api/user/admin/login", {
          id: id.value,
          password: password.value,
        });
        console.log("login.vue:res.data=" + res.data);
        const result = res.data;
        if (result == -1) {
          alert("아이디가 존재하지 않습니다.");
        } else if (result == 0) {
          alert("비밀번호가 일치하지 않습니다.");
        } else if (result == 1) {
          router.push({
            name: "Dashboard",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      id,
      password,
      loginProcess,
    };
  },
};
</script>
