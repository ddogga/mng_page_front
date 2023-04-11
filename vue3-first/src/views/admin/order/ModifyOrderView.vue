<template>
  <div class="card shadow mb-4">
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">
        <b>주문번호 : {{ modifyForm.orderId }} </b>
      </h6>
      <div>
        <button class="btn btn-info btn-sm" @click="closeModifyView">
          닫기
        </button>
      </div>
    </div>

    <div class="card-body d-flex justify-content-center">
      <form class="form" @submit.prevent="updateOrderStatus">
        <div class="form-floating mb-3">
          <label class="label" for="inputID"><b>주문상태 변경</b></label>
          <select
            id="inputID"
            class="form-control mt-4"
            v-model="modifyForm.status"
          >
            <option disabled value="">상태를 선택해 주세요</option>
            <option>ORDER</option>
            <option>PICKING</option>
            <option>PACKING</option>
            <option>DELIVERY</option>
            <option>FINISH</option>
          </select>
        </div>

        <div class="mt-5 mb-1">
          <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-block form-btn">
              수정
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/axiossetting";
import { ref, watch } from "vue";

export default {
  props: {
    orderInfo: {
      type: Object,
    },
  },
  setup(props, context) {
    const modifyForm = ref({
      status: props.orderInfo.status,
      orderId: props.orderInfo.id,
    });

    const closeModifyView = () => {
      context.emit("onClose");
    };

    const updateOrderStatus = async () => {
      try {
        const res = await axios.put("api/order/status", modifyForm.value);

        alert(res.data);
        context.emit("onModify");
      } catch (err) {
        console.log(err);
      }
    };

    return {
      modifyForm,
      closeModifyView,
      updateOrderStatus,
    };
  },
};
</script>

<style scoped>
/* .card-body {
  width: 70%;
} */
.form {
  width: 70%;
}
</style>
