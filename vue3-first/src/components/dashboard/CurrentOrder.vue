<template>
  <div class="text-white">
    <div class="card pre-scrollable" v-show="count > 0">
      <table class="table">
        <thead class="table-light">
          <th>주문 번호</th>
          <th>주문 시간</th>
          <th>주문 상태</th>
          <th>경과 시간</th>
        </thead>

        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ order.id }}</td>
            <td>{{ order.orderTime.substr(0, 5) }}</td>
            <td>{{ order.status }}</td>
            <td>
              <b>{{ setTime(index) }} {{ order.elapsedTime }}</b> 분
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-show="count == 0">진행중인 주문이 없습니다.</div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "@/axios/axiossetting.js";
export default {
  setup() {
    const orders = ref([]);
    const count = ref(0);
    let interval = "";

    const getCurrentOrders = async () => {
      try {
        const res = await axios.get("api/orders/now");
        orders.value = res.data;
        count.value = orders.value.length;
      } catch (arr) {
        console.log(err);
      }
    };

    getCurrentOrders();

    const setTime = (index) => {
      getTime(index);
      interval = setInterval(getTime, 100000, index); //index를 매개변수로 넘겨 getTime 실행
    };

    const getTime = (index) => {
      console.log(orders.value[index].id + " getTime");
      const time = orders.value[index].orderTime.substr(0, 5);
      const now = new Date();

      const hour = now.getHours() - time.substring(0, 2);

      const minutes = hour * 60 + (now.getMinutes() - time.substring(3, 5));
      orders.value[index].elapsedTime = minutes;
    };
    const clearTime = () => {
      clearInterval(interval);
    };

    return {
      orders,
      count,
      setTime,
      clearTime,
    };
  },
};
</script>

<style scoped>
.card {
  height: 300px;
}
</style>
