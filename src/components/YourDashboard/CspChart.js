import React, { Component } from "react";
import * as ChartAnnotation from "chartjs-plugin-annotation";

import "chartjs-plugin-datalabels";
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "'Cooper Hewitt'";
Chart.defaults.global.legend.display = false;
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.scaleLineColor = "tranparent";
Chart.defaults.global.tooltipenabled = false;

let myLineChart;

export default class CspChart extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    console.log("Chart.plugins", Chart.plugins._plugins[4]);
    let namedChartAnnotation = Chart.plugins._plugins[4];
    console.log("namedChartAnnotation", namedChartAnnotation.id);

    Chart.pluginService.register(namedChartAnnotation);
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
      type: "bar",
      plugins: [ChartAnnotation],
      data: {
        //Bring in data
        labels:
          labels.length === data.length
            ? labels
            : new Array(data.length).fill("Data"),
        datasets: [
          {
            label: "Monday",
            data: data,
            borderWidth: 1,
            //this will remove the colors in the area
            fill: false
          }
        ]
      },
      options: {
        plugins: {
          // datalabels: {
          //   formatter: function(value, context) {
          //     return value > 0 ? `+ ${value}` : value;
          //   },
          //   align: function(context) {
          //     var index = context.dataIndex;
          //     var value = context.dataset.data[index];
          //     return value < 1 ? "right" : "left";
          //   }
          // },
          annotation: {
            annotation: [
              {
                drawTime: "beforeDatasetsDraw",
                mode: "vertical",
                type: "box",
                yScaleID: "y-axis-0",
                yMin: 0,
                yMax: 10,
                xMin: "C",
                xMax: "P",
                borderColor: "rgb(101,33,171)",
                borderWidth: 1,
                onClick: function(e) {
                  console.log("box", e.type, this);
                }
              }
            ]
          },
          responsive: true
          // maintainAspectRation: false
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
                display: true //this will remove only the label
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
      // <div className={classes.graphContainer}>
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
