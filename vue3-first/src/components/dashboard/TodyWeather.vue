<template>
  <div class="text-white">
    <div class="modal-header">
      <div>{{ dateBuilder() }}</div>
      <div>{{ weather.name }}</div>
    </div>
    <div class="row today-weather">
      <div class="col-sm-4" style="text-align: right">
        <i class="fas fa-4x" :class="[weatherIcon ? weatherIcon : '']"></i>
      </div>

      <div class="col-sm-4" style="font-size: 1.8rem; text-align: left">
        <div>{{ weather?.main?.temp }}°C</div>
        <div>{{ weather?.weather?.[0].main }}</div>
      </div>

      <div class="col-sm-4" style="font-size: 0.9rem; padding-top: 10px">
        <div>최고/최저 기온</div>
        <div>
          {{ weather?.main?.temp_max }}°C / {{ weather?.main?.temp_min }}°C
        </div>
      </div>
    </div>

    <div class="row" style="margin-bottom: 2%">
      <div class="col">
        <hr class="hr sidebar-divider" />
        대기오염
        <hr class="hr sidebar-divider" />
      </div>
      <div class="col">
        <hr class="hr sidebar-divider" />
        체감온도
        <hr class="hr sidebar-divider" />
      </div>

      <div class="col">
        <hr class="hr sidebar-divider" />
        바람세기
        <hr class="hr sidebar-divider" />
      </div>

      <div class="col">
        <hr class="hr sidebar-divider" />
        습도
        <hr class="hr sidebar-divider" />
      </div>
    </div>

    <div class="row">
      <div class="col">
        {{ airCondition[airPollution?.list?.[0].main.aqi - 1] }}
      </div>
      <div class="col">{{ weather?.main?.feels_like }} °C</div>
      <div class="col">{{ weather?.wind?.speed }} m/s</div>
      <div class="col">{{ weather?.main?.humidity }} %</div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { ICON_NAME } from "@/components/js/iconConverter.js";
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
    const airCondition = ["아주 좋음", "좋음", "보통", "나쁨", "아주 나쁨"];

    const api_key = "c75924f550da2e1826b251956284d2bc";
    const url_base = "https://api.openweathermap.org/data/2.5/";
    const weather = ref({});
    const airPollution = ref({});

    const isPositionReady = ref(false);
    const weatherIcon = ref("");

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

      let weatherFetchUrl = `${url_base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api_key}`;
      let airPollutionFetchUrl = `${url_base}air_pollution?lat=${latitude}&lon=${longitude}&APPID=${api_key}`;
      fetchWeather(weatherFetchUrl);
      fetchAirPollution(airPollutionFetchUrl);
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
          return res.json();
        }) //fetch 정보(?) json 형식으로 변경
        .then((results) => {
          return setResult(results);
        });
    };

    const fetchAirPollution = async (fetchUrl) => {
      await fetch(fetchUrl)
        .then((res) => {
          return res.json();
        })
        .then((results) => {
          console.log("air value : ");
          console.log(results);
          airPollution.value = results;
        });
    };

    const setResult = (results) => {
      weather.value = results;

      weatherIcon.value =
        ICON_NAME[weather.value.weather[0].icon.substring(0, 2)];
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

    onBeforeMount(async () => {
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
      airPollution,
      weather,
      days,
      airCondition,
      weatherIcon,
    };
  },
};
</script>

<style scoped>
i {
  color: rgb(171, 171, 169);
}
.today-weather {
  margin-top: 5%;
  height: 100px;
  margin-bottom: 5%;
}
</style>

<style scoped>
.sidebar-divider {
  margin: 0.1rem;
}

.modal-header {
  padding: 0px 15px 5px 15px;
  margin-bottom: 10%;
}

.con {
  position: relative;
}

.con-item {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
