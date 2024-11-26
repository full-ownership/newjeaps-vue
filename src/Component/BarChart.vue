<template>
  <div class="chart-container">
    <bar-chart />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

// Chart.js 플러그인 등록
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  extends: Bar,
  data() {
    return {
      datacollection: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            borderWidth: 1,
            data: [30, 70, 100, 50, 80, 60],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Sales Data',
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true,
            },
          },
        },
      },
    }
  },
  mounted() {
    this.renderChart(this.datacollection, this.options)
  },
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 400px;
}
</style>
