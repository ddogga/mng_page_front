<template>
  <form @submit.prevent="addEvent" class="modal-content mt-5">
    <div class="modal-header">
      <div class="modal-title">새 일정 등록</div>
      <div>
        <img
          class="close-image"
          src="@/assets/img/x_button.png"
          @click="closePopup"
        />
      </div>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-xl-10">
          <label class="col-xl-4" for="edit-allDay">하루종일</label>
          <input
            class="checkBox"
            id="edit-allDay"
            type="checkbox"
            v-model="eventInfo.allDay"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-xl-10">
          <label class="col-xl-4" for="edit-title">일정명</label>
          <input
            class="inputModal"
            v-model="eventInfo.title"
            type="text"
            id="edit-title"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xl-10">
          <label class="col-xl-4" for="edit-start">시작</label>
          <input
            class="inputModal"
            type="text"
            id="edit-start"
            v-model="eventInfo.start"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xl-10">
          <label class="col-xl-4" for="edit-end">끝</label>
          <input
            class="inputModal"
            type="text"
            id="edit-end"
            v-model="eventInfo.end"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xl-10">
          <label class="col-xl-4" for="edit-color">색상</label>
          <select
            class="inputModal"
            v-model="eventInfo.backgroundColor"
            id="edit-color"
          >
            <option value="#D25565" style="color: #d25565">빨간색</option>
            <option value="#9775fa" style="color: #9775fa">보라색</option>
            <option value="#ffa94d" style="color: #ffa94d">주황색</option>
            <option value="#74c0fc" style="color: #74c0fc">파란색</option>
            <option value="#f06595" style="color: #f06595">핑크색</option>
            <option value="#63e6be" style="color: #63e6be">연두색</option>
            <option value="#a9e34b" style="color: #a9e34b">초록색</option>
            <option value="#4d638c" style="color: #4d638c">남색</option>
            <option value="#495057" style="color: #495057">검정색</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-10">
          <label class="col-xl-4" style="float: left" for="edit-desc"
            >설명</label
          >
          <textarea
            rows="4"
            cols="27"
            v-model="eventInfo.description"
            id="edit-desc"
          ></textarea>
        </div>
      </div>
    </div>
    <div v-show="add" class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">
        취소
      </button>
      <button type="submit" class="btn btn-primary" id="save-event">
        저장
      </button>
    </div>
    <div v-show="modify" class="modal-footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">
        닫기
      </button>
      <button type="button" class="btn btn-danger" id="deleteEvent">
        삭제
      </button>
      <button type="button" class="btn btn-primary" id="updateEvent">
        저장
      </button>
    </div>
  </form>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";
import axios from "../../axios/axiossetting.js";
import { useRouter } from "vue-router";
export default {
  props: {
    selectDateInfo: {
      type: Object,
    },
  },
  emits: ["close-popup"],
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const add = ref(true);
    const modify = ref(false);
    const closePopup = () => {
      context.emit("close-popup");
    };

    const eventInfo = ref({
      allDay: true,
      title: "",
      start: "",
      end: "",
      backgroundColor: "",
      description: "",
      userName: "",
    });

    watch(
      () => props.selectDateInfo,
      (next, prev) => {
        console.log(props.selectDateInfo);

        let today = new Date();
        let hours = ("0" + today.getHours()).slice(-2);
        let minutes = ("0" + today.getMinutes()).slice(-2);

        eventInfo.value.allDay = props.selectDateInfo.allDay;
        eventInfo.value.start =
          props.selectDateInfo.startStr + "T" + hours + ":" + minutes;
        eventInfo.value.end =
          props.selectDateInfo.endStr + "T" + hours + ":" + minutes;
      }
    );

    const addEvent = async () => {
      try {
        eventInfo.value.userName = store.state.userName;
        const res = await axios.post("api/event/new", eventInfo.value);
        console.log(res.data);
        router.go(0);
      } catch (err) {
        console.log(err);
      }
    };

    return {
      closePopup,
      add,
      modify,
      eventInfo,
      addEvent,
    };
  },
};
</script>

<style scoped>
.close-image {
  width: 20px;
  height: 20px;
}

body {
  padding: 1.5em;
  background: #f5f5f5;
}

a {
  color: #73685d;
}

.inputModal {
  width: 65%;
  margin-bottom: 10px;
}
.checkBox {
  width: 65%;
  margin-bottom: 10px;
  padding-right: 20px;
}
</style>
