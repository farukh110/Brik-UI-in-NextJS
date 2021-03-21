class IndiceBrik extends React.Component {
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
    const pluginChartIndice = {
      // Permet d'afficher l'indice au milieu du doughnut
      beforeDraw: function (chart) {
        var width = chart.chart.width,
          height = chart.chart.height,
          ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + 'em upgrade';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#B2DD62';

        var text = '95',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 + 5;

        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    };

    this.myChart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: this.props.data.map((d) => d.value),
            name: 'Indice Brik',
            backgroundColor: ['#F5F5F5', '#B2DD62']
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        aspectRatio: 1,
        tooltips: { enabled: false },
        hover: { mode: null }
      },
      plugins: [pluginChartIndice],
      layout: {
        padding: {
          bottom: -20
        },
        margin: {
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default IndiceBrik;
