<template>
  <div class="card-body">
    <div class="chart-area">
      <vue3-chart-js
        ref="chartRef"
        :type="lineChart.type"
        :data="lineChart.data"
        :options="lineChart.options"
      ></vue3-chart-js>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
export default {
  props: {
    props_data: {
      type: Array,
    },
    select_data: {
      type: String,
    },
  },
  components: {
    Vue3ChartJs,
  },
  setup(props) {
    const chartRef = ref(null);

    const monthlyIncoms = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyProfits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthlyCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const month = [
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
    const currentMonth = ref("");
    const currentMonthRange = ref([
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
    ]);

    const lineChart = {
      type: "line",
      data: {
        labels: Array.from(currentMonthRange),
        datasets: [],
      },
      options: {
        interaction: {
          mode: "index",
        },
        plugins: {
          tooltip: {
            usePointStyle: true,
          },
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              color: "white",
            },
          },
        },
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
              color: "white",
            },
            gridLines: {
              display: true,
            },
          },

          x: {
            ticks: {
              color: "white",
            },
            gridLines: {
              display: false,
            },
          },
        },

        responsive: true,
        maintainAspectRatio: false,
      },
    };

    watch(
      () => props.props_data,
      (next, prev) => {
        console.log("props_data 변경");
        init();
        updateChart();
      }
    );

    watch(
      () => props.select_data,
      (next, prev) => {
        console.log("select_data 변경");
        changeChart();
      }
    );

    const changeChart = () => {
      lineChart.data.datasets[0].label = props.select_data;
      if (props.select_data == "매출액") {
        updateChart();
      } else if (props.select_data == "주문수") {
        lineChart.data.datasets = [];
        lineChart.data.datasets.push({
          label: "주문수",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 2,
          pointStyle: "rectRot",
          pointRadius: 4,
          data: monthlyCount,
        });
      }

      chartRef.value.update();
    };

    const updateChart = () => {
      console.log("updateChart");
      lineChart.data.labels = getLabels();
      lineChart.data.datasets = [];
      lineChart.data.datasets.push(
        {
          label: "매출액",
          backgroundColor: "#F5F5F8",
          borderColor: "rgb(187, 145, 255)",
          borderWidth: 2,
          pointStyle: "rectRounded",
          pointRadius: 4,
          data: monthlyIncoms,
        },
        {
          label: "순이익",
          backgroundColor: "#F5F5F8",
          borderColor: "rgb(17, 145, 255)",
          borderWidth: 2,
          pointStyle: "rect",
          pointRadius: 4,
          data: monthlyProfits,
        }
      );

      chartRef.value.update();
    };

    const getLabels = () => {
      currentMonthRange.value = month.slice(
        currentMonth.value,
        currentMonth.value + 12
      );
      return currentMonthRange.value;
    };

    const init = () => {
      console.log("init");
      if (props.props_data) {
        currentMonth.value =
          props.props_data[props.props_data.length - 1].orderMonth;

        for (let i = 0; i < props.props_data.length; i++) {
          let index = 0;
          if (props.props_data[i].orderMonth <= currentMonth.value) {
            index =
              12 - currentMonth.value + props.props_data[i].orderMonth - 1;
          } else {
            index = props.props_data[i].orderMonth - currentMonth.value - 1;
          }
          monthlyIncoms[index] = props.props_data[i].totalIncome;
          monthlyCount[index] = props.props_data[i].totalCount;
          monthlyProfits[index] = props.props_data[i].totalProfit;
        }
      }
    };

    return {
      lineChart,
      updateChart,
      chartRef,
    };
  },
};
</script>
