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
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { defineComponent } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./js/event-utils";

export default {
  components: {
    FullCalendar,
  },
  setup() {
    const currentEvents = ref([]);

    // methods :

    const handleWeekendsToggle = () => {
      calendarOptions.value.weekends = !calendarOptions.value.weekends; // update a property
    };

    /**
     * 달력 셀 클릭 시 발생 이벤트
     * @param {선택한 날짜 정보} selectInfo
     */
    const handleDateSelect = (selectInfo) => {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
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
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      eventLimit: true, // '달력상에 셀 크기보다 많은 이벤트가 등록되어 있는 경우 more로 표기함'
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
      events: [
        {
          title: "event 1",
          start: "2023-03-09T12:30:00",
          end: "2023-03-13T11:30:00",
          allDay: false,
        },
      ],
    });

    return {
      calendarOptions,
      currentEvents,
      handleWeekendsToggle,
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
</style>
