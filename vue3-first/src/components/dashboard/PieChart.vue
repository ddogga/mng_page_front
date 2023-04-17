<template>
  <!-- Card Body -->
  <div class="card-body">
    <div class="chart-area">
      <vue3-chart-js
        ref="chartRef"
        :type="pieChart.type"
        :data="pieChart.data"
        :options="pieChart.options"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  props: {
    items: {
      type: Array,
    },
  },
  components: {
    Vue3ChartJs,
  },
  setup(props) {
    // const data = {
    //   labels: ["Red", "Blue", "Yellow"],
    //   datasets: [
    //     {
    //       label: "My First Dataset",
    //       data: [300, 50, 100],
    //       backgroundColor: [
    //         "rgb(255, 99, 132)",
    //         "rgb(54, 162, 235)",
    //         "rgb(255, 205, 86)",
    //       ],
    //       hoverOffset: 4,
    //     },
    //   ],
    // };
    const chartRef = ref(null);
    const colors = [
      "#958FF6",
      "#EADA80",
      "#4363DE",
      "#F4F284",
      "#FE943F",
      "#2BE6C1",
      "#A90E92",
      "#60CDEC",
      "#861C71",
      "#161156",
    ];

    const data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverOffset: 4,
        },
      ],
    };
    const pieChart = {
      type: "pie",
      data: data,
      options: {
        responsive: false,
        plugins: {
          legend: false,
        },
      },
    };

    watch(
      () => props.items,
      (next, prev) => {
        console.log(props.items);
        init();
      }
    );

    const init = () => {
      for (let i = 0; i < props.items.length; i++) {
        console.log("pieChart=", props.items[i]);
        data.labels.push(props.items[i].name);
        data.datasets[0].data.push(props.items[i].salesQuantity);
        data.datasets[0].backgroundColor.push(colors[i]);
      }
      // pieChart.data = data;
      chartRef.value.update();
    };

    return {
      pieChart,
      chartRef,
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
