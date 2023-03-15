<template>
  <!-- Card Body -->
  <div class="card-body">
    <div class="chart-area">
      <vue3-chart-js v-bind="{ ...LineChart }" />
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  components: {
    Vue3ChartJs,
  },
  setup() {
    const LineChart = {
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
            label: "Data One",
            borderColor: "#41B883",
            tension: 0.5,
            backgroundColor: "black",
            data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 100],
          },
          {
            label: "Data Two",
            borderColor: "#00D8FF",
            tension: 0.5,
            backgroundColor: "blue",
            //Data to be represented on y-axis
            data: [40, 60, 30, 50, 10, 10, 20, 40, 50, 70, 90, 100],
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    return {
      LineChart,
    };
  },
};
</script>
