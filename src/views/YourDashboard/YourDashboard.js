import React, { Component } from "react";
import classes from "./YourDashboard.module.css";
import YourLineGraph from "../../components/YourDashboard/YourLineGraph";
import StackedBarChart from "../../components/YourDashboard/StackedBarChart";
import CspChart from "../../components/YourDashboard/CspChart";

import chartIcon from "../../assets/chart-icon.svg";
import {
  monthlyChanges,
  monthlyLabels,
  costsOfSpoilage,
  costsOfPrep,
  CSPlabels,
  CSPdata
} from "../../mockData";

export default class Dashboard extends Component {
  state = {
    monthlyChanges,
    monthlyLabels,
    costsOfSpoilage,
    costsOfPrep,
    CSPlabels,
    CSPdata
  };

  render() {
    const {
      monthlyChanges,
      monthlyLabels,
      costsOfSpoilage,
      costsOfPrep,
      CSPlabels,
      CSPdata
    } = this.state;
    return (
      <div className={classes.container}>
        <header>
          <img src={chartIcon} alt="bar chart icon" />
          <h1>Dashboard</h1>
        </header>
        <YourLineGraph data={monthlyChanges} labels={monthlyLabels} />
        <StackedBarChart
          costsOfPrep={costsOfPrep}
          costsOfSpoilage={costsOfSpoilage}
          labels={monthlyLabels}
        />
        <CspChart labels={CSPlabels} data={CSPdata} />
      </div>
    );
  }
}
