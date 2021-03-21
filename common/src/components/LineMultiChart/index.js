import { Chart } from 'react-chartjs-2';
class LineMultiChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.datasets[0].data = this.props.data[0].map((d) => d.value);
    this.myChart.data.datasets[1].data = this.props.data[1].map((d) => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      data: {
        labels: this.props.data[0].map((d) => d.label),
        datasets: [
          {
            label: 'Prix du m²',
            fill: false,
            data: this.props.data[0].map((d) => d.value),
            borderColor: this.props.color,
            yAxisID: 'price'
          },
          {
            label: 'Nombre de transaction',
            fill: false,
            data: this.props.data[1].map((d) => d.value),
            borderColor: '#666666',
            yAxisID: 'number'
          }
        ]
      },
      options: {
        bezierCurve: true,
        layout: {
          padding: {
            bottom: 20,
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
          display: true
        },
        scales: {
          // Cache la grid
          xAxes: [
            {
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
                display: false
              },
              ticks: {}
            }
          ],
          yAxes: [
            {
              id: 'price',
              position: 'left',
              stacked: false,
              gridLines: {},
              weight: 2,

              ticks: {
                fontColor: this.props.color
              }
            },

            {
              id: 'number',
              position: 'right',
              stacked: true,
              weight: 1,
              // display only one grid (price) to get cleaner
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
                drawBorder: false,
                display: false
              },
              ticks: {
                display: true,
                beginAtZero: false,
                padding: 0,
                fontColor: '#666666'
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

export default LineMultiChart;
