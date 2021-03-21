import { Chart } from 'react-chartjs-2';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      data: {
        labels: this.props.data.map((d) => d.label),
        datasets: [
          {
            label: this.props.title,
            fill: false,
            data: this.props.data.map((d) => d.value),
            borderColor: this.props.color
          }
        ]
      },
      options: {
        bezierCurve: true,
        layout: {
          padding: {
            bottom: 0,
            top: 10
          },
          margin: {
            bottom: 0,
            left: 0,
            right: 0
          }
        },
        tooltips: {
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          // Cache la grid
          xAxes: [
            {
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: this.props.showgrid
              },
              ticks: {
                display: this.props.ytick,
                stepSize: this.props.step,
                beginAtZero: this.props.beginzero
              }
            }
          ]
        }
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default LineChart;
