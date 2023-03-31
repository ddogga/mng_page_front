<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-white">일정 관리</h1>
    </div>

    <!-- Calendar-->
    <div class="demo-app">
      <div class="demo-app-sidebar">
        <div class="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div class="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              :checked="calendarOptions.weekends"
              @change="handleWeekendsToggle"
            />
            toggle weekends
          </label>
        </div>
        <div class="demo-app-sidebar-section">
          <h2>All Events ({{ currentEvents.length }})</h2>
          <ul>
            <li v-for="event in currentEvents" :key="event.id">
              <b>{{ event.startStr }}</b>
              <b>{{ event.endStr }}</b>
              <i>{{ event.title }}</i>
            </li>
          </ul>
        </div>
      </div>
      <div class="demo-app-main">
        <FullCalendar class="demo-app-calendar" :options="calendarOptions">
          <!-- <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template> -->
        </FullCalendar>
      </div>
    </div>

    <!-- 일정 추가 Popup -->
    <div class="popup-view popup-background" :class="{ active: popupView }">
      <div class="popup-window">
        <NewEventPopup
          :selectDateInfo="selectDateInfo"
          class="pop-up"
          @close-popup="openPopup"
          @reload="reload"
        ></NewEventPopup>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { defineComponent } from "vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./js/event-utils";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import moment from "moment";

import FullCalendar from "@fullcalendar/vue3";
import NewEventPopup from "./NewEventPopup.vue";

export default {
  components: {
    FullCalendar,
    NewEventPopup,
  },
  setup(props, context) {
    context.emit("parent_getSession", "");
    const router = useRouter();
    const store = useStore();

    const currentEvents = ref([]);
    let currentDate = "";
    const calendarRef = ref(null);

    // methods :
    const handleWeekendsToggle = () => {
      calendarOptions.value.weekends = !calendarOptions.value.weekends; // update a property
    };

    const selectDateInfo = ref({});

    /**
     * 달력 셀 클릭 시 발생 이벤트
     * @param {선택한 날짜 정보} selectInfo
     */
    const handleDateSelect = (selectInfo) => {
      let calendarApi = selectInfo.view.calendar;
      console.log(selectInfo);
      selectDateInfo.value = selectInfo;

      openPopup();

      calendarApi.unselect(); // clear date selection

      // if (title) {
      //   calendarApi.addEvent({
      //     title,
      //     start: selectInfo.startStr,
      //     end: selectInfo.endStr,
      //     allDay: selectInfo.allDay,
      //   });
      // }
    };

    /**
     * 달력 셀에 바인딩된 데이터 클릭시 발생 이벤트
     * @param {} clickInfo
     */
    const handleEventClick = (clickInfo) => {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    };

    /**
     * 이벤트 데이터가 초기화 혹은 변경이 일어났을 때 발생하는 이벤트
     * @param {이벤트 객체 배열} events
     */
    const handleEvents = (events) => {
      currentEvents.value = events;
    };

    /**
     * 드래그를 멈추거나 이벤트를 다른 날짜로 옮길 때 발생되는 이벤트
     * @param {*} event
     */
    const handleEventDrop = (event) => {
      console.log("Event dropped:", event.event);
    };

    const handleEventResize = (event) => {
      console.log("Event resized:", event.event);
    };

    // 달력 옵션
    const calendarOptions = ref({
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
      ],
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },
      initialView: "dayGridMonth",
      locale: "ko",

      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,

      displayEventTime: true,
      displayEventEnd: true,
      eventColor: "#378006",

      select: handleDateSelect,
      eventClick: handleEventClick,
      eventsSet: handleEvents,
      eventDrop: handleEventDrop,
      eventResize: handleEventResize,
      /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      /**
       * 일정 받아오기
       */
      events: function (start, end, timezone, callback) {
        console.log(callback);
        return getEvents(start.startStr, start.endStr);
        // callback(evnetList);
      },
    });

    // 일정 등록 Popup
    const popupView = ref(false);

    const openPopup = () => {
      popupView.value = popupView.value ? false : true;
    };

    const reload = () => {
      console.log("reload");
      router.go(0);
    };

    const userName = store.state.userName;

    const getEvents = async (startStr, endStr) => {
      const startDate = moment(startStr).format("YYYY-MM-DD");
      const endDate = moment(endStr).format("YYYY-MM-DD");
      console.log("userName = " + userName);
      try {
        const res = await axios.get("api/events", {
          params: {
            startDate: startDate,
            endDate: endDate,
            userName: userName,
          },
        });

        console.log(res.data);

        // const eventList = res.data.map(function (array) {
        //   if (array.allDay && array.start !== array.end) {
        //     array.end = moment(array.end).add(1, "days"); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
        //   }
        //   return array;
        // });
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };

    return {
      calendarOptions,
      currentEvents,
      handleWeekendsToggle,
      popupView,
      openPopup,
      selectDateInfo,
      reload,
    };
  },
};
</script>

<style scoped>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

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
  width: 500px;
  height: 500px;

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
</style>
