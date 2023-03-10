<template>
  <div>
    <router-view @parent_getSession="getSession" :parent_id="id" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "./axios/axiossetting.js";

export default {
  name: "App",
  components: {},
  setup() {
    const id = ref("");

    const router = useRouter();

    const getSession = async (received_id) => {
      console.log(received_id);
      if (received_id == "login") {
        try {
          const res = await axios.post("api/user/logout");
          id.value = "";
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await axios.get("api/get_session");
          id.value = res.data;
          console.log("App : getSession:" + id.value);
          if (id.value == "") {
            router.push({
              name: "Login",
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
