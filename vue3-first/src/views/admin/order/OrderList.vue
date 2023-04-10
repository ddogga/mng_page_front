<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-white">주문 상태 관리</h1>
    </div>

    <!-- Content Row -->
    <div class="row">
      <!-- Area Table -->
      <div class="col-xl-10 col-lg-8">
        <div class="card shadow mb-4">
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-primary">주문 상태 관리</h6>
            <div>
              <span>주문수 : {{ count }}</span>
            </div>
          </div>
          <!-- Card Body -->
          <div class="card-body" v-show="count > 0">
            <table class="table">
              <thead class="table-light">
                <th>주문 번호</th>
                <th>주문자</th>
                <th>주문 시간</th>
                <th>가격</th>
                <th>주문 상태</th>
                <th>주문 상품</th>
                <th>주문 상태 변경</th>
              </thead>
              <tbody>
                <tr v-for="(order, index) in orders" :key="index">
                  <td>{{ order.id }}</td>
                  <td>{{ order.userName }}</td>
                  <td>{{ order.orderDate }} {{ order.orderTime }}</td>
                  <td>{{ order.totalPrice }}</td>
                  <td>{{ order.status }}</td>
                  <td>
                    <button
                      class="btn btn-warning btn-sm"
                      @click="openOrderItemView(order.id)"
                    >
                      주문상품보기
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-info btn-sm"
                      @click="openModifyView(order.id)"
                    >
                      수정
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-body" v-show="count == 0">
            진행중인 주문이 없습니다.
          </div>
        </div>
      </div>
    </div>

    <!-- 주문 상품 Popup -->
    <div class="popup-view popup-background" :class="{ active: popupView }">
      <div class="popup-window">
        <ItemsInfo
          :selectedOrderid="selectedOrderid"
          class="pop-up"
          @close-popup="openPopup"
        >
        </ItemsInfo>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "../../../axios/axiossetting.js";

import ItemsInfo from "@/views/admin/item/ItemsInfoPopup.vue";

export default {
  components: {
    ItemsInfo,
  },
  setup(props, context) {
    context.emit("parent_getSession", "");
    const count = ref(0);
    const orders = ref([]);
    const selectedOrderid = ref("");

    const popupView = ref(false);

    const getOrders = async () => {
      try {
        const res = await axios.get("api/orders");
        console.log(res.data);
        orders.value = res.data;
        count.value = orders.value.length;
      } catch (arr) {
        console.log(err);
      }
    };

    const openOrderItemView = (id) => {
      selectedOrderid.value = id;
      openPopup();
    };

    const openPopup = () => {
      popupView.value = popupView.value ? false : true;
    };

    getOrders();
    return {
      count,
      orders,
      popupView,
      selectedOrderid,
      openPopup,
      openOrderItemView,
    };
  },
};
</script>

<style scoped>
/* PopUp */

.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.popup-window {
  position: relative;
  width: 100%;
  height: 100%;
}

.pop-up {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  padding: 0;

  /* 임시 지정 */
  width: 35%;
  height: 60%;

  /* 초기에 약간 아래에 배치 */
  transform: translate(-10%, -70%);
}

.popup-view {
  opacity: 0;
  display: none;
  visibility: hidden;
}
.active {
  opacity: 1;
  display: block;
  visibility: visible;
}
</style>
