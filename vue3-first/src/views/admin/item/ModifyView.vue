<template>
  <!-- Area Table -->

  <div class="card shadow mb-4">
    <div
      class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
    >
      <h6 class="m-0 font-weight-bold text-primary">상품수정 폼</h6>
      <div>
        <button class="btn btn-info btn-sm" @click="closeModifyView">
          닫기
        </button>
      </div>
    </div>

    <div class="card-body">
      <form>
        <div class="form-floating mb-3">
          <label class="label" for="inputID"><b>상품명</b></label>
          <input
            class="form-control"
            id="inputID"
            type="text"
            placeholder="상품명"
            maxlength="20"
            v-model="itemInfo.name"
            required
          />
        </div>

        <div class="form-floating mb-3">
          <label class="label" for="inputPassword"><b>상품 가격</b></label>
          <input
            class="form-control"
            id="inputPassword"
            type="test"
            placeholder="상품 가격"
            v-model="itemInfo.price"
            required
          />
        </div>

        <div class="form-floating mb-3">
          <label class="label" for="inputPasswordConfirm"
            ><b>상품 원가</b></label
          >
          <input
            class="form-control"
            id="inputPasswordConfirm"
            type="text"
            placeholder="상품 원가"
            v-model="itemInfo.itemCost"
            required
          />
        </div>
        <div class="form-floating mb-3">
          <label class="label" for="inputPasswordConfirm"
            ><b>재고 수량</b></label
          >
          <input
            class="form-control"
            id="inputPasswordConfirm"
            type="text"
            placeholder="재고 수량"
            v-model="itemInfo.stockQuantity"
            required
          />
        </div>
        <div class="form-floating mb-3">
          <div class="custom-switch">
            <label class="label" for="inputPasswordConfirm"
              ><b>판매 상태</b></label
            >
            <input
              class="custom-control-input"
              type="checkbox"
              id="switch"
              v-model="saleState"
            />
            <label for="switch" class="custom-control-label">{{
              selectedState
            }}</label>
          </div>
        </div>

        <div class="mt-4 mb-0">
          <div class="d-grid">
            <button type="submit" class="btn btn-primary btn-block form-btn">
              상품 수정
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
    id: {
      type: Number,
    },
  },
  setup(props, context) {
    const saleState = ref(false);
    const selectedState = ref("판매중");
    const itemInfo = ref({
      name: "",
      price: "",
      itemCost: "",
      stockQuantity: "",
      itemStatus: "",
    });

    const getItem = async () => {
      try {
        const res = await axios.get("api/item", {
          params: { id: props.id },
        });
        itemInfo.value = res.data;
        if (itemInfo.value.itemStatus == "OS") {
          saleState.value = true;
        }
      } catch (err) {
        console.log(err);
      }
    };

    getItem();

    const closeModifyView = () => {
      context.emit("onClose");
    };

    watch(
      () => saleState.value,
      (next, prev) => {
        if (saleState.value) {
          selectedState.value = "판매중";
        } else {
          selectedState.value = "판매 중지";
        }
      }
    );

    return {
      itemInfo,
      saleState,
      selectedState,
      closeModifyView,
    };
  },
};
</script>

<style scoped>
.label {
  float: left;
  padding-left: 5%;
}

input {
  margin-bottom: 3%;
}

form {
  padding: 5%;
  padding-top: 2%;
}

.form-btn {
  margin-top: 7%;
}
</style>
