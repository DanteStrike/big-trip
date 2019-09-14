import ChartDataLabels from 'chartjs-plugin-datalabels';


export const chartMoneyConfig = {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [],
    datasets: [{
      backgroundColor: `rgb(250, 250, 250)`,
      borderWidth: 0,
      data: []
    }]
  },
  options: {
    plugins: {
      datalabels: {
        color: `rgb(0, 0, 0)`,
        clamp: true,
        anchor: `end`,
        align: `left`,
        formatter(value) {
          return `€ ${value}`;
        }
      }
    },
    layout: {
      padding: {
        left: 28,
        right: 0,
        top: 0,
        bottom: 30
      }
    },

    legend: {
      display: false
    },

    title: {
      display: true,
      text: `MONEY`,
      position: `left`,
      color: `rgb(0, 0, 0)`,
      fontSize: `30`,
      fullWidth: true,
      padding: 20
    },

    scales: {
      xAxes: [{
        display: false,
        ticks: {
          beginAtZero: true,
        },
        minBarLength: 40,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          padding: 5
        },
        barPercentage: 0.8,
        categoryPercentage: 1,
        gridLines: {
          display: false,
          drawBorder: false,
        }
      }]
    }
  }
};
