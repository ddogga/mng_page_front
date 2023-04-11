<template>
  <div class="card shadow mb-4">
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">
        <b>주문번호 : </b>
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
          <label class="label" for="inputID"><b>주문 취소</b></label>
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
export default {
  setup(props, context) {
    const closeModifyView = () => {
      context.emit("onClose");
    };

    return {
      closeModifyView,
    };
  },
};
</script>
