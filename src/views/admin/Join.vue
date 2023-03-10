<template>
  <div>
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-7">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                  <div class="card-header">
                    <h3 class="text-center font-weight-light my-4">
                      Create Account
                    </h3>
                  </div>
                  <div class="card-body">
                    <form @submit.prevent="joinProcess">
                      <div class="form-floating mb-3">
                        <input
                          class="form-control"
                          id="inputID"
                          type="text"
                          placeholder="ID"
                          v-model="join.id"
                          maxlength="12"
                          required
                        />
                        <label for="inputID">ID</label>
                      </div>
                      <span :class="id_color">{{ id_message }}</span>

                      <div class="row mb-3">
                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input
                              class="form-control"
                              id="inputPassword"
                              type="password"
                              placeholder="Create a password"
                              v-model="join.password"
                              required
                            />
                            <label for="inputPassword">Password</label>
                          </div>
                          <span :class="pass_color">{{ pass_message }}</span>
                        </div>

                        <div class="col-md-6">
                          <div class="form-floating mb-3 mb-md-0">
                            <input
                              class="form-control"
                              id="inputPasswordConfirm"
                              type="password"
                              placeholder="Confirm password"
                              v-model="checkPass"
                              required
                            />
                            <label for="inputPasswordConfirm"
                              >Confirm Password</label
                            >
                          </div>
                          <span :class="check_pass_color">{{
                            check_pass_message
                          }}</span>
                        </div>
                      </div>

                      <div class="mt-4 mb-0">
                        <div class="d-grid">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block"
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="card-footer text-center py-3">
                    <div class="small">
                      <router-link to="/shop/login">
                        <span>Have an account? Go to login</span>
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
import axios from "../../axios/axiossetting";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    const id_message = ref("");
    const id_color = ref("");

    const pass_message = ref("");
    const check_pass_message = ref("");
    const pass_color = ref("");
    const check_pass_color = ref("");

    const join = ref({
      id: "",
      password: "",
    });

    const checkPass = ref("");

    const idcheck = async () => {
      try {
        console.log("idcheck=" + join.value.id);
        //const res = await axios.get(`members/idcheck?id{join.value.id}`);
        const res = await axios.get("api/users/idcheck", {
          params: { id: join.value.id },
        });
        console.log("res.data=" + res.data);
        if (res.data == 1) {
          id_message.value = "이미 사용중인 아이디 입니다.";
          id_color.value = "red";
        } else {
          id_message.value = "사용가능한 아이디 입니다.";
          id_color.value = "green";
        }
      } catch (err) {
        console.log("err" + err);
      }
    };

    watch(
      () => join.value.id,
      (next, prev) => {
        console.log("watch(id):" + prev + "=>" + next);
        var pattern = /^\w{5,12}$/;
        if (!pattern.test(join.value.id)) {
          id_message.value = "영문자 숫자 _로 5~12자 가능합니다.";
          id_color.value = "red";
        } else {
          idcheck();
        }
      }
    );

    watch(
      () => join.value.password,
      (next, prev) => {
        console.log("watch(password):" + prev + "=>" + next);
        var pattern =
          /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if (!pattern.test(join.value.password)) {
          pass_message.value =
            "영문자 숫자 특수 문자가 들어간 조합으로 6~12자 가능합니다.";
          pass_color.value = "red";
        } else {
          pass_message.value = "";
          pass_color.value = "";
        }
      }
    );

    watch(
      () => checkPass.value,
      (next, prev) => {
        console.log("watch(checkPass):" + prev + "=>" + next);
        if (checkPass.value != join.value.password) {
          check_pass_message.value = "입력된 비밀번호와 일치하지 않습니다.";
          check_pass_color.value = "red";
        } else {
          check_pass_message.value = "";
          check_pass_color.value = "";
        }
      }
    );

    const joinProcess = async () => {
      if (id_color.value == "red") {
        alert("아이디를 확인하세요");
      } else if (pass_color.value == "red" || check_pass_color.value == "red") {
        alert("비밀번호를 확인하세요");
      } else {
        try {
          const res = await axios.post("api/users/admin/new", join.value);
          if (res.data) {
            console.log(res.data);
            alert(res.data.name + "님 회원 가입을 축하합니다.");
            router.push({
              name: "Login",
            });
          } else {
            console.log("회원가입 실패");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    return {
      join,
      checkPass,
      id_message,
      id_color,
      pass_message,
      check_pass_message,
      pass_color,
      check_pass_color,
      joinProcess,
    };
  },
};
</script>

<style scoped>
.red {
  color: red;
}
.green {
  color: green;
}
.form-floating {
  margin-bottom: 0px;
}
</style>
