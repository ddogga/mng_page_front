<template>
  <div class="bg">
    <div v-if="!state">
      <!-- Page Wrapper -->
      <div id="wrapper">
        <Sidebar />

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
          <!-- Main Content -->
          <div id="content">
            <Topbar />

            <router-view @parent_getSession="getSession" :parent_id="id" />
          </div>
        </div>
      </div>

      <!-- Logout Modal-->
      <div
        class="modal fade"
        id="logoutModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                class="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <a class="btn btn-primary" href="login.html">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="state">
      <router-view @parent_getSession="getSession" :parent_id="id" />
    </div>
  </div>
</template>

<script>
import "@/assets/js/sb-admin-2.min.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "./axios/axiossetting.js";
import { useStore } from "vuex";

import Sidebar from "./components/Sidebar.vue";
import Topbar from "./components/Topbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",

  components: {
    Sidebar,
    Topbar,
  },

  setup() {
    const id = ref("");
    const router = useRouter();
    const state = ref(false);
    const store = useStore();

    const getSession = async (received_id) => {
      console.log("received_id : " + received_id);
      if (received_id == "login") {
        state.value = true;
        try {
          const res = await axios.post("api/user/logout");
          id.value = "";
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      } else if (received_id == "join") {
        state.value = true;
      } else {
        state.value = false;
        try {
          const res = await axios.get("api/get_session");
          id.value = res.data;
          console.log("App : getSession:" + id.value);
          if (id.value == "") {
            router.push({
              name: "Login",
            });
          }
          store.dispatch("set_userName", id.value);
        } catch (err) {
          console.log(err);
        }
      }
    };

    return {
      id,
      state,
      getSession,
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
}

#content {
  background: rgb(58, 58, 58);
}
</style>
