import React, { Component } from "react";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'Cooper Hewitt'";
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.scaleLineColor = "tranparent";
Chart.defaults.global.tooltipenabled = false;

let myLineChart;

export default class StackedBarChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    let myChartRef = this.chartRef.current.getContext("2d");

    const { costsOfPrep, labels } = this.props;

    if (typeof myLineChart !== "undefined") myLineChart.destroy();

    myLineChart = new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels:
          labels.length === costsOfPrep.length
            ? labels
            : new Array(costsOfPrep.length).fill("Data"),
        datasets: [
          {
            label: "Sales",
            data: costsOfPrep,
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: function(value, context) {
              return ` £ ${value}`;
            },
            anchor: "end",
            align: "end"
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false, //this will remove only the label
                reverse: true,
                beginAtZero: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false, //this will remove only the label
                reverse: true,
                beginAtZero: true
              }
            }
          ]
        },
        tooltips: {
          enabled: false
        }
      }
    });
  };

  render() {
    return (
      <div
        style={{
          position: "relative",
          width: 500,
          height: 500,
          backgroundColor: "white"
        }}
      >
        <canvas id="myChart" ref={this.chartRef} />
      </div>
      // </div>
    );
  }
}
