<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">상품 등록</h1>
    </div>

    <!-- Content Row -->
    <div class="row">
      <!-- Area Table -->
      <div class="col-xl-7 col-lg-5">
        <div class="card shadow mb-4">
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-primary">상품등록 폼</h6>
            <div>
              <span></span>
            </div>
          </div>

          <div class="card-body">
            <form @submit.prevent="insertItemProcess">
              <div class="form-floating mb-3">
                <input
                  class="form-control"
                  id="inputID"
                  type="text"
                  placeholder="상품명"
                  maxlength="20"
                  v-model="newItem.name"
                  required
                />
                <label for="inputID">상품명</label>
              </div>

              <div class="form-floating mb-3">
                <div class="mb-3 mb-md-0">
                  <input
                    class="form-control"
                    id="inputPassword"
                    type="test"
                    placeholder="상품 가격"
                    v-model="newItem.price"
                    required
                  />
                  <label for="inputPassword">상품 가격</label>
                </div>

                <div class="mb-3 mb-md-0">
                  <input
                    class="form-control"
                    id="inputPasswordConfirm"
                    type="text"
                    placeholder="재고 수량"
                    v-model="newItem.stockQuantity"
                    required
                  />
                  <label for="inputPasswordConfirm">재고 수량</label>
                </div>
              </div>

              <div class="mt-4 mb-0">
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary btn-block">
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios/axiossetting";
import { ref, watch } from "vue";
export default {
  setup() {
    const newItem = ref({
      name: "",
      price: "",
      stockQuantity: "",
    });

    const insertItemProcess = async () => {
      try {
        const res = await axios.post("api/items/new", newItem.value);
        if (res.data) {
          console.log(res.data);
          alert("상품이 등록되었습니다.");
          router.push({
            name: "NewItem",
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    return {
      newItem,
      insertItemProcess,
    };
  },
};
</script>
