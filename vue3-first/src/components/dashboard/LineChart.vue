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
  },
  components: {
    Vue3ChartJs,
  },
  setup(props) {
    const chartRef = ref(null);

    const monthlyIncoms = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

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

    const lineChart = {
      type: "line",
      data: {
        labels: [
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
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1,
            data: monthlyIncoms,
          },
        ],
      },
      options: {
        plugins: {},
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
            },
            gridLines: {
              display: true,
            },
          },

          x: {
            gridLines: {
              display: false,
            },
          },
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    watch(
      () => props.props_data,
      (next, prev) => {
        console.log("props_data 변경");
        updateChart();
      }
    );

    const updateChart = () => {
      lineChart.data.labels = getLabels();
      lineChart.data.datasets[0].data = getMonthlyIncoms();
      chartRef.value.update();
    };

    const getLabels = () => {
      currentMonth.value =
        props.props_data[props.props_data.length - 1].orderMonth;
      return month.slice(currentMonth.value, currentMonth.value + 12);
    };

    const getMonthlyIncoms = () => {
      for (let i = 0; i < props.props_data.length; i++) {
        let index = 0;
        if (props.props_data[i].orderMonth <= currentMonth.value) {
          index = 12 - currentMonth.value + props.props_data[i].orderMonth - 1;
        } else {
          index = props.props_data[i].orderMonth - currentMonth.value - 1;
        }
        monthlyIncoms[index] = props.props_data[i].totalIncome;
      }
      return monthlyIncoms;
    };

    return {
      lineChart,
      updateChart,
      chartRef,
    };
  },
};
</script>
