import React, { Component } from "react";
import "chartjs-plugin-datalabels";
// import "chartjs-plugin-annotation";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'Cooper Hewitt'";
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.scaleLineColor = "tranparent";
Chart.defaults.global.tooltipenabled = false;

let myLineChart;

export default class YourLineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    let myChartRef = this.chartRef.current.getContext("2d");

    const { data, labels } = this.props;

    if (typeof myLineChart !== "undefined") myLineChart.destroy();

    myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels:
          labels.length === data.length
            ? labels
            : new Array(data.length).fill("Data"),
        datasets: [
          {
            label: "Sales",
            data: data,
            borderWidth: 1,
            //this will remove the colors in the area
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: function(value, context) {
              return value > 0 ? `+ ${value}` : value;
            },
            align: function(context) {
              var index = context.dataIndex;
              var value = context.dataset.data[index];
              return value < 1 ? "right" : "left";
            }
          }
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                display: false //this will remove only the label
              }
            }
          ]
        },
        animation: {
          onProgress: function() {
            var controller = myLineChart.controller;
            var xAxis = controller.scales["x-axis-0"];
            var chart = controller.chart;
            var numTicks = xAxis.ticks.length;

            var xOffsetStart = xAxis.width / numTicks;
            var halfBarWidth = xAxis.width / (numTicks * 2);

            xAxis.ticks.forEach(function(value, index) {
              var xOffset = xOffsetStart * index + halfBarWidth;

              var yOffset = chart.height - 90;
              myChartRef.fillStyle = "rgba(0, 0, 0, 0.5)";
              myChartRef.fillText(value, xOffset, yOffset);
            });
          }
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
    );
  }
}
