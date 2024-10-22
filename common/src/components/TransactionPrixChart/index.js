import { Chart } from 'react-chartjs-2';
class TransactionPrixChart extends React.Component {
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
      type: 'bar',
      data: {
        labels: this.props.data.map((d) => d.label),
        datasets: [
          {
            label: this.props.title,
            data: this.props.data.map((d) => d.value),
            backgroundColor: this.props.color
          }
        ]
      },
      options: {
        layout: {
          padding: {
            top: 20
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
              barThickness: this.props.thickness,
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
              gridLines: {
                color: 'rgba(0, 0, 0, 0)',
                display: false
              },
              ticks: {
                display: false,
                beginAtZero: true
              }
            }
          ]
        }
      },
      plugins: {
        afterDatasetsDraw: function (context, easing) {
          // Affiche les valeurs des bars au dessus de celles-ci
          var ctx = context.chart.ctx;
          context.data.datasets.forEach(function (dataset) {
            for (var i = 0; i < dataset.data.length; i++) {
              if (dataset.data[i] != 0) {
                var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                var textY = model.y + (dataset.type == 'line' ? -3 : 15);

                ctx.font = Chart.helpers.fontString(
                  Chart.defaults.global.defaultFontSize,
                  'normal',
                  Chart.defaults.global.defaultFontFamily
                );
                ctx.textAlign = 'start';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = dataset.type == 'line' ? '#185490' : '#185490';
                ctx.save();
                ctx.translate(model.x - 15, textY - 25);
                ctx.rotate(0);
                ctx.fillText(dataset.data[i], 0, 0);
                ctx.restore();
              }
            }
          });
        }
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default TransactionPrixChart;
