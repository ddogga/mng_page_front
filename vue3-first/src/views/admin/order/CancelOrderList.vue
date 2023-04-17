<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-white">취소 주문 조회</h1>
    </div>

    <!-- Content Row -->
    <div class="row" :class="{ modify: isClicked }">
      <!-- Area Table -->
      <div class="left">
        <div class="card shadow mb-4">
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-primary">주문 상태 관리</h6>
            <div>
              <span>주문수 : {{ count }}</span>
            </div>
          </div>
          <!-- Card Body -->
          <div class="card-body" v-show="count > 0">
            <table class="table">
              <thead class="table-light">
                <th>주문번호</th>
                <th>주문자</th>
                <th>취소시간</th>
                <th>주문 상품</th>
                <th>가격</th>
                <th>취소사유</th>
                <th>취소사유변경</th>
              </thead>
              <tbody>
                <tr
                  v-for="(order, index) in cancelOrders"
                  :key="index"
                  :class="[clickedRow == order.orderId ? clicked : '']"
                >
                  <td>{{ order.orderId }}</td>
                  <td>{{ order.userName }}</td>
                  <td>{{ order.cancelTime }}</td>
                  <td>
                    <button
                      class="btn btn-warning btn-sm"
                      @click="openOrderItemView(order.orderId)"
                    >
                      주문상품보기
                    </button>
                  </td>
                  <td>{{ order.totalPrice }}</td>
                  <td>{{ order.reason }}</td>
                  <td>
                    <button
                      class="btn btn-primary btn-sm"
                      @click="openCancelView(order.cancelId)"
                    >
                      변경
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <Pagenation />
          </div>
          <div class="card-body" v-show="count == 0">
            진행중인 주문이 없습니다.
          </div>
        </div>
      </div>

      <!-- 동적 컴포넌트 영역-->
      <div class="right">
        <component
          :is="currentView"
          :cancelOrderId="cancelOrderId"
          @onClose="onClose"
          @onModify="onModify"
        ></component>
      </div>
    </div>

    <!-- 주문 상품 Popup -->
    <div class="popup-view popup-background" :class="{ active: popupView }">
      <div class="popup-window">
        <ItemsInfo
          :selectedOrderid="selectedOrderid"
          class="pop-up"
          @close-popup="openPopup"
        >
        </ItemsInfo>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/axiossetting";
import { ref, watch } from "vue";
import { useStore } from "vuex";

import ItemsInfo from "@/views/admin/order/ItemsInfoPopup.vue";
import CancelOrderView from "@/views/admin/order/CancelOrderView.vue";
import Pagenation from "@/components/Pagenation.vue";
export default {
  components: {
    ItemsInfo,
    CancelOrderView,
    Pagenation,
  },
  setup(props, context) {
    context.emit("parent_getSession", "");

    const store = useStore();

    // list
    const count = ref(0);
    const cancelOrders = ref([]);
    const startIndex = ref(0);

    //click row style
    const clickedRow = ref(0);
    const clicked = ref("");

    //page
    const size = store.state.pageStore.size;
    const startNum = ref(0); //페이지 첫번째 숫자

    //views
    const selectedOrderid = ref("");
    const popupView = ref(false);

    const currentView = ref(null);
    const cancelOrderId = ref("");
    const isClicked = ref(false);

    watch(
      () => store.state.pageStore.reqPage,
      () => {
        getCancelOrders(store.state.pageStore.reqPage);
      }
    );

    const getCancelOrders = async (page) => {
      try {
        const res = await axios.get("api/orders/cancel", {
          params: { page: page - 1, size: size },
        });

        cancelOrders.value = res.data.content;
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

    const openOrderItemView = (id) => {
      selectedOrderid.value = id;
      openPopup();
    };

    const openPopup = () => {
      popupView.value = popupView.value ? false : true;
    };

    const onClose = () => {
      clicked.value = "";
      currentView.value = null;
      isClicked.value = false;
    };

    const openCancelView = (id) => {
      clickedRow.value = id;
      clicked.value = "clicked";
      isClicked.value = true;
      currentView.value = CancelOrderView;
      cancelOrderId.value = id;
    };

    const onModify = () => {
      getCancelOrders();
      currentView.value = null;
      isClicked.value = false;
    };

    getCancelOrders(1);

    return {
      count,
      cancelOrders,
      selectedOrderid,
      popupView,
      currentView,
      isClicked,
      cancelOrderId,
      startIndex,
      clickedRow,
      clicked,
      openOrderItemView,
      openPopup,
      onClose,
      openCancelView,
      onModify,
    };
  },
};
</script>

<style scoped>
/* PopUp */

.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.popup-window {
  position: relative;
  width: 100%;
  height: 100%;
}

.pop-up {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);
  padding: 0;

  /* 임시 지정 */
  width: 35%;
  height: 60%;

  /* 초기에 약간 아래에 배치 */
  transform: translate(-10%, -70%);
}

.popup-view {
  opacity: 0;
  display: none;
  visibility: hidden;
}
.active {
  opacity: 1;
  display: block;
  visibility: visible;
}

/** 수정 영역 오픈 */
.row .left {
  width: 80%;
  padding: 0 15px;
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
}

.row.modify .left {
  width: 70%;
  padding: 0 15px;
  transition: width 0.25s;
  -webkit-transition: width 0.25s;
}

.row .right {
  width: 20%;
  padding: 0 15px;
  transition: width 0.25s, opacity 0.2s;
  -webkit-transition: width 0.25s, opacity 0.2s;
}

.row.modify .right {
  width: 30%;
  padding: 0 15px;
  transition: width 0.25s, opacity 0.2s;
  -webkit-transition: width 0.25s, opacity 0.2s;
}

.clicked {
  background-color: rgb(204, 204, 204);
}
</style>
