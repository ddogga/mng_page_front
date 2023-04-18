<template>
  <!-- Begin Page Content -->
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-white">관리자 대시보드</h1>

      >
    </div>

    <!-- Content Row -->
    <div class="row">
      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body" style="color = w">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xl font-weight-bold text-info text-uppercase mb-1"
                >
                  이번달 매출
                </div>
                <div class="h5 mb-0 font-weight-bold text-white">
                  ${{ monthlyIncom }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-success shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xl font-weight-bold text-success text-uppercase mb-1"
                >
                  이번년도 총 매출
                </div>
                <div class="h5 mb-0 font-weight-bold text-white">
                  ${{ annualIncom }}
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Earnings (Monthly) Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-info shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-info text-uppercase mb-1"
                >
                  Tasks
                </div>
                <div class="row no-gutters align-items-center">
                  <div class="col-auto">
                    <div class="h5 mb-0 mr-3 font-weight-bold text-white">
                      50%
                    </div>
                  </div>
                  <div class="col">
                    <div class="progress progress-sm mr-2">
                      <div
                        class="progress-bar bg-info"
                        role="progressbar"
                        style="width: 50%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Requests Card Example -->
      <div class="col-xl-3 col-md-6 mb-4">
        <div class="card border-left-warning shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div
                  class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                >
                  Pending Requests
                </div>
                <div class="h5 mb-0 font-weight-bold text-white">18</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-comments fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->

    <div class="row">
      <!-- Area Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-white">주문 현황</h6>
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Dropdown Header:</div>
                <p class="dropdown-item" @click="changeChart('매출액')">매출</p>
                <p class="dropdown-item" @click="changeChart('주문수')">
                  주문수
                </p>
              </div>
            </div>
          </div>
          <!-- Card Body -->
          <div class="card-body">
            <div class="chart-area">
              <CurrentOrder />
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-white">이번주 할일</h6>
            <!-- 드롭다운 -->
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Dropdown Header:</div>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>

          <!-- Card Body -->
          <div class="card-body">
            <div class="chart-area">
              <TodayEvent />
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-white">오늘의 날씨 정보</h6>
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Dropdown Header:</div>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <!-- Card Body -->
          <div class="card-body">
            <div class="chart-area">
              <TodayWeather />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Row -->

    <div class="row">
      <!-- Area Chart -->
      <div class="col-xl-8 col-lg-7">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-white">연간 매출 현황</h6>
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Dropdown Header:</div>
                <a class="dropdown-item" href="#" @click="changeChart('매출액')"
                  >매출</a
                >
                <a class="dropdown-item" href="#" @click="changeChart('주문수')"
                  >주문수</a
                >
              </div>
            </div>
          </div>
          <!-- Card Body -->
          <LineChart :props_data="monthly" :select_data="select_data" />
        </div>
      </div>

      <!-- Pie Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div
            class="card-header py-3 d-flex flex-row align-items-center justify-content-between"
          >
            <h6 class="m-0 font-weight-bold text-white">인기 상품 TOP 10</h6>
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Dropdown Header:</div>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <!-- Card Body -->

          <PieChart :items="items" />
        </div>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "../axios/axiossetting.js";

import TodayEvent from "../components/dashboard/TodayEvent.vue";
import TodayWeather from "../components/dashboard/TodyWeather.vue";
import LineChart from "../components/dashboard/LineChart.vue";
import PieChart from "../components/dashboard/PieChart.vue";
import CurrentOrder from "@/components/dashboard/CurrentOrder.vue";

export default {
  props: {
    parent_id: {
      type: String,
      required: true,
    },
  },
  components: {
    LineChart,
    PieChart,
    TodayEvent,
    TodayWeather,
    CurrentOrder,
  },
  setup(props, context) {
    context.emit("parent_getSession", "");

    const router = useRouter();

    const monthlyIncom = ref(0);
    const annualIncom = ref(0);

    const getMonthlyIncom = async () => {
      try {
        const res = await axios.get("api/income/monthly");
        monthlyIncom.value = res.data.result;
      } catch (err) {
        console.error(err);
      }
    };

    const getAnnualIncom = async () => {
      try {
        const res = await axios.get("api/income/annual");
        annualIncom.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    getMonthlyIncom();
    getAnnualIncom();

    // LineChart
    const monthly = ref([]);
    const select_data = ref("매출액");

    onMounted(async () => {
      try {
        const res = await axios.get("api/incomes/monthly");
        console.log("Dashboard=", res.data);
        console.log(props.parent_id);
        monthly.value = res.data;
      } catch (err) {
        console.error(err);
      }
    });

    const changeChart = (seleted) => {
      select_data.value = seleted;
    };

    const items = ref([]);
    onMounted(async () => {
      try {
        const res = await axios.get("api/item/ranking");
        console.log("Dashboard=", res.data);
        items.value = res.data;
      } catch (err) {
        console.error(err);
      }
    });

    return {
      monthlyIncom,
      annualIncom,
      monthly,
      select_data,
      changeChart,
      items,
    };
  },
};
</script>

<style scoped>
.card {
  background: rgb(104, 104, 104);
}
.card-body {
  background: rgb(77, 77, 77);
}

.card-header {
  background: rgb(61, 61, 61);
}
</style>
