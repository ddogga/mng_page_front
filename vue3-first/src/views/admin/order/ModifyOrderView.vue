<template>
  <div class="card shadow mb-4">
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">주문상태 변경</h6>
      <div>
        <button class="btn btn-info btn-sm" @click="closeModifyView">
          닫기
        </button>
      </div>
    </div>

    <div class="card-body">
      <form @submit.prevent="modifyOrder">
        <div class="form-floating mb-3">
          <label class="label" for="inputID"><b>주문상태 변경</b></label>
          <input
            class="form-control"
            id="inputID"
            type="text"
            placeholder="주문상태 선택"
            maxlength="20"
            v-model="newOrderInfo.status"
            readonly
          />
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
    console.log("orderInfo : " + props.orderInfo);
    const modifyOrder = async () => {};

    const newOrderInfo = props.orderInfo;

    const closeModifyView = () => {
      context.emit("onClose");
    };

    return {
      newOrderInfo,
      modifyOrder,
      closeModifyView,
    };
  },
};
</script>
