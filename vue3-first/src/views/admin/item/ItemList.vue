<template>
  <div>
    <div class="container-fluid">
      <!-- Page Heading -->
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-white">상품 조회 / 삭제</h1>
      </div>

      <!-- Content Row -->
      <div class="row" :class="{ modify: isClicked }">
        <!-- Area Table -->
        <div class="left">
          <div class="card shadow mb-4">
            <div
              class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
            >
              <h6 class="m-0 font-weight-bold text-primary">상품 현황</h6>
              <div>
                <span>상품 수 : {{ count }}</span>
              </div>
            </div>
            <!-- Card Body -->
            <div class="card-body" v-show="count > 0">
              <table class="table">
                <thead class="table-light">
                  <th>#</th>
                  <th>상품명</th>
                  <th>상품 가격</th>
                  <th>재고 수량</th>
                  <th>판매 상태</th>
                  <th>상품 정보 수정</th>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in items"
                    :key="index"
                    :class="[item.itemStatus == 'EOS' ? isOnSale : '']"
                  >
                    <td>{{ startIndex + index }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.stockQuantity }}</td>
                    <td>{{ item.itemStatus }}</td>
                    <td>
                      <button
                        class="btn btn-info btn-sm"
                        @click="openModifyView(item.id)"
                      >
                        수정
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Pagenation />
            </div>
            <div class="card-body" v-show="count == 0">
              상품이 존재하지 않습니다.
            </div>
          </div>
        </div>
        <!--동적 컴포넌트 영역-->
        <div class="right">
          <component
            :is="modifyView"
            :id="selectedItemId"
            @onClose="onClose"
            @onModify="onModify"
          >
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "@/axios/axiossetting.js";

import ModifyView from "./ModifyView.vue";
import Pagenation from "@/components/Pagenation.vue";

export default {
  components: {
    ModifyView,
    Pagenation,
  },
  setup(props, context) {
    context.emit("parent_getSession", "");
    const router = useRouter();
    const store = useStore();

    // list
    const items = ref([]);
    const count = ref(0);
    const startIndex = ref(0);

    // page
    const size = store.state.pageStore.size;
    const startNum = ref(0);

    // modify view
    const isClicked = ref(false);
    const modifyView = ref(null);
    const selectedItemId = ref(0);
    const isOnSale = ref("onSale");

    watch(
      () => store.state.pageStore.reqPage,
      () => {
        getItems(store.state.pageStore.reqPage);
      }
    );

    const getItems = async (page) => {
      try {
        const res = await axios.get("api/items", {
          params: { page: page - 1, size: size },
        });

        items.value = res.data.content;
        count.value = res.data.totalElements;
        startIndex.value = (page - 1) * size + 1;

        const totalPages = res.data.totalPages;
        const startPageNum = parseInt((page - 1) / size + 1);
        const endPageNum = totalPages > size ? startNum + size : totalPages + 1;

        let pageList = [];
        for (let i = startPageNum; i < endPageNum; i++) {
          pageList.push(i);
        }

        const pageInfo = {
          totalPages: totalPages,
          currentPage: page,
          pageList: pageList,
        };

        store.dispatch("pageStore/update_pageInfo", pageInfo);
      } catch (err) {
        console.log(err);
      }
    };

    getItems(1);

    // const deleteItem = async (id) => {
    //   const answer = confirm("정말 삭제하시겠습니까?");
    //   if (answer) {
    //     try {
    //       const res = await axios.delete("api/item", {
    //         params: { id: id },
    //       });
    //       console.log(res.data);
    //       if (res.data.result == "SUCCESS") {
    //         alert("삭제 성공");
    //         getItems();
    //       } else if (res.data.result == "FAIL") {
    //         alert(res.data.reason);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    // };

    const openModifyView = (id) => {
      isClicked.value = true;
      modifyView.value = ModifyView;
      selectedItemId.value = id;
    };

    const onClose = () => {
      modifyView.value = null;
      isClicked.value = false;
    };

    const onModify = () => {
      getItems();
    };

    return {
      items,
      count,
      isClicked,
      modifyView,
      selectedItemId,
      startIndex,
      onClose,
      openModifyView,
      onModify,
      isOnSale,
    };
  },
};
</script>

<style scoped>
.row .left {
  width: 70%;
  padding: 0 15px;
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
}

.row.modify .left {
  width: 50%;
  padding: 0 15px;
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
}

.row .right {
  width: 30%;
  padding: 0 15px;
  transition: width 0.25s, opacity 0.2s;
  -webkit-transition: width 0.25s, opacity 0.2s;
}

.row.modify .right {
  width: 50%;
  padding: 0 15px;
  transition: width 0.25s, opacity 0.2s;
  -webkit-transition: width 0.25s, opacity 0.2s;
}

.onSale {
  color: red;
}
</style>
