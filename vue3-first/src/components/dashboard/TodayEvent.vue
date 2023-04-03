<template>
  <div class="text-white">
    <div
      v-for="(event, index) in currentEvents"
      :key="index"
      class="row event-row"
    >
      <div class="col-sm-3">
        <div class="card shadow mb-4 event-date">
          {{ event.start }} <br />
          {{ currentDay[index] }}
        </div>
      </div>
      <div class="col-sm-8">
        <div
          class="card shadow mb-4"
          :style="{ background: event.backgroundColor }"
        >
          <div class="evnet-title">{{ event.title }}</div>
          <span class="evnet-contents">{{ event.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/axiossetting";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const userName = store.state.userName;
    const week = ["일", "월", "화", "수", "목", "금", "토"];

    const currentEvents = ref([]);
    const currentDay = ref([]);

    const getWeeklyEvents = async () => {
      console.log("userName = " + userName);
      try {
        const res = await axios.get("api/events/week", {
          params: {
            userName: userName,
          },
        });

        currentDay.value = res.data.map(function (element) {
          console.log(element.start.substr(0, 10));
          return week[new Date(element.start.substr(0, 10)).getDay()];
        });

        currentEvents.value = res.data.map(function (element) {
          element.start = element.start.substr(5, 5);
          return element;
        });
      } catch (err) {
        console.log(err);
      }
    };

    getWeeklyEvents();

    return {
      currentEvents,
      currentDay,
    };
  },
};
</script>

<style scoped>
.evnet-title {
  font-size: 1rem;
  color: white;
}
.evnet-contents {
  font-size: 0.8rem;
  color: rgb(86, 142, 247);
}

.event-row {
  padding-left: 6%;
  padding-right: 6%;
}

.event-date {
  background: rgb(47, 47, 47);
  color: white;
}
</style>
