<template>
  <div class="card shadow mb-4">
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">
        <b>취소사유 변경</b>
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
          <div v-show="!modify" class="d-grid">
            <button type="submit" class="btn btn-danger btn-block form-btn">
              주문 취소
            </button>
          </div>

          <div v-show="modify" class="d-grid">
            <button
              type="button"
              @click="updateReason()"
              class="btn btn-danger btn-block form-btn"
            >
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
    orderId: {
      type: Number,
    },
    cancelOrderId: {
      type: Number,
    },
  },
  setup(props, context) {
    console.log("order_id: " + props.orderId);
    console.log("cancel_id: " + props.cancelOrderId);

    const modify = ref(false);

    if (props.cancelOrderId) {
      console.log("cancelOrderId : " + props.cancelOrderId);
      modify.value = true;
      console.log("modify : " + modify.value);
    }

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

    const updateReason = async () => {
      try {
        const res = await axios.put(
          "api/order/cancel/reason",
          getReasonUpdateForm()
        );

        alert(res.data);
        context.emit("onModify");
      } catch (err) {
        console.log(err);
      }
    };

    const getReasonUpdateForm = () => {
      const reasonUpdateForm = {
        id: props.cancelOrderId,
        reason: orderCancelForm.value.reason,
      };
      return reasonUpdateForm;
    };

    return {
      orderCancelForm,
      modify,
      closeModifyView,
      cancelOrder,
      updateReason,
    };
  },
};
</script>
