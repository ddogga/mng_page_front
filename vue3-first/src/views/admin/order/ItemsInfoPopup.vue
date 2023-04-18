<template>
  <div class="row">
    <div class="card shadow mb-4">
      <div
        class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
      >
        <h6 class="m-0 font-weight-bold text-primary">
          주문 번호 : {{ orderId }} 상품 목록
        </h6>
        <div>
          <button class="btn" @click="closePopup()">x</button>
        </div>
      </div>
      <!-- Card Body -->
      <div class="card-body">
        <table class="table">
          <thead class="table-light">
            <th>상품 아이디</th>
            <th>상품명</th>
            <th>상품 낱개 가격</th>
            <th>수량</th>
            <th>총 주문 가격</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in orderItems" :key="index">
              <td>{{ item.orderItemId }}</td>
              <td>{{ item.itemName }}</td>
              <td>{{ item.orderItemPrice }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.orderItemPrice * item.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "@/axios/axiossetting.js";

export default {
  props: {
    selectedOrderid: {
      type: String,
    },
  },
  emits: ["close-popup"],
  setup(props, context) {
    const orderItems = ref([]);
    const orderId = ref("");

    const closePopup = () => {
      context.emit("close-popup");
    };

    watch(
      () => props.selectedOrderid,
      (next, prev) => {
        console.log("selectedId : " + props.selectedOrderid);
        orderId.value = props.selectedOrderid;

        getOrderItems();
      }
    );

    const getOrderItems = async () => {
      try {
        const res = await axios.get("api/order/items", {
          params: {
            id: props.selectedOrderid,
          },
        });
        orderItems.value = res.data;
      } catch (err) {
        console.log(err);
      }
    };

    return {
      orderItems,
      orderId,
      closePopup,
    };
  },
};
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  font-size: 0.8rem;
}

.row {
  border-radius: 30px;
}

th {
  font-size: 0.5rem;
}
</style>
