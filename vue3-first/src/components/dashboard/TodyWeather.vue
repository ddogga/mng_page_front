<template>
  <div class="text-white">
    <div class="row">
      <div class="col-sm-3">{{ dateBuilder() }}</div>
    </div>
    <div class="row today-weather">
      <div class="col-sm-4">
        <i class="fas fa-3x fa-cloud-rain" style="color: #000"></i>
      </div>
      <div class="col-sm-8">
        <div class="row">
          <div class="col-sm-5" style="float: left">
            {{ weather.name }}
          </div>
          <!-- <div class="col-sm-7">
            {{ weather.main.temp }}
          </div> -->
        </div>
        <div class="row">
          <div class="col-sm-5" style="float: left">
            {{ weather.weather[0].main }}
          </div>
          <!-- <div class="col-sm-7">
            {{ weather.main.temp_max }} / {{ weather.main.temp_min }}
          </div> -->
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">요일</div>
      <div class="col">요일</div>
      <div class="col">요일</div>
      <div class="col">요일</div>
      <div class="col">요일</div>
      <div class="col">요일</div>
      <div class="col">요일</div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
export default {
  setup() {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const api_key = "c75924f550da2e1826b251956284d2bc";
    const url_base = "https://api.openweathermap.org/data/2.5/";
    const weather = ref({});

    const isPositionReady = ref(false);

    // const getCurrentPosition = () => {
    //   if (!navigator.geolocation) {
    //     setAlert("위치 정보를 찾을 수 없습니다.1");
    //   } else {
    //     // getCurrentPosition(ok,error)
    //     navigator.geolocation.getCurrentPosition(
    //       getPositionValue,
    //       geolocationError
    //     );
    //   }
    // };

    const getPositionValue = (val) => {
      const latitude = val.coords.latitude;
      const longitude = val.coords.longitude;

      isPositionReady.value = true;

      let fetchUrl = `${url_base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key}`;
      console.log(fetchUrl);
      fetchWeather(fetchUrl);
    };

    const geolocationError = () => {
      setAlert("위치 정보를 찾을 수 없습니다.");
    };

    const setAlert = (text) => {
      alert(text);
    };

    const fetchWeather = async (fetchUrl) => {
      await fetch(fetchUrl)
        .then((res) => {
          console.log(res);
          return res.json();
        }) //fetch 정보(?) json 형식으로 변경
        .then((results) => {
          return setResult(results);
        });
    };

    const setResult = (results) => {
      weather.value = results;
      console.log("weather value : ");
      console.log(weather.value);
    };

    const dateBuilder = () => {
      let now = new Date();

      let day = days[now.getDay()];
      let date = now.getDate();
      let month = months[now.getMonth()];
      let year = now.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    };

    onBeforeMount(() => {
      if (!navigator.geolocation) {
        setAlert("위치 정보를 찾을 수 없습니다.1");
      } else {
        // getCurrentPosition(ok,error)
        navigator.geolocation.getCurrentPosition(
          getPositionValue,
          geolocationError
        );
      }
    });
    // getCurrentPosition();

    return {
      dateBuilder,
      weather,
    };
  },
};
</script>

<style scoped>
.today-weather {
  margin-top: 2%;
  height: 100px;
}
</style>
