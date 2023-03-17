<template>
  <!-- Card Body -->
  <div class="card-body">
    <div class="chart-area">
      <vue3-chart-js
        style="height: 35vh; width: 55vw"
        v-bind="{ ...PieChart }"
      />
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
    const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    };
    const PieChart = {
      type: "pie",
      data: data,
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    };

    return {
      PieChart,
    };
  },
};
</script>

<style scoped>
.chart-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
