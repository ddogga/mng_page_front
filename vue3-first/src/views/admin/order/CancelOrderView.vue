<template>
  <div class="card shadow mb-4">
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">
        <b>주문번호 : {{ orderCancelForm.orderId }}</b>
      </h6>
      <div>
        <button class="btn btn-info btn-sm" @click="closeModifyView">
          닫기
        </button>
      </div>
    </div>

    <div class="card-body d-flex justify-content-center">
      <form class="form" @submit.prevent="cancelOrder">
        <div class="form-floating mb-3">
          <label class="label" for="inputID"><b>취소사유</b></label>
          <textarea
            class="form-control"
            placeholder="주문 취소사유 입력"
            v-model="orderCancelForm.reason"
            id="inputID"
            cols="45"
            rows="5"
            required
          >
          </textarea>
        </div>

        <div class="mt-5 mb-1">
          <div class="d-grid">
            <button type="submit" class="btn btn-danger btn-block form-btn">
              주문 취소
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
    orderId: {
      type: String,
    },
  },
  setup(props, context) {
    console.log("order_id: " + props.orderId);
    const orderCancelForm = ref({
      status: "CANCEL",
      orderId: props.orderId,
      reason: "",
    });

    const closeModifyView = () => {
      context.emit("onClose");
    };

    const cancelOrder = async () => {
      try {
        const res = await axios.put("api/order/cancel", orderCancelForm.value);

        alert(res.data);
        context.emit("onCancel");
      } catch (err) {
        console.log(err);
      }
    };

    return {
      orderCancelForm,
      closeModifyView,
      cancelOrder,
    };
  },
};
</script>
