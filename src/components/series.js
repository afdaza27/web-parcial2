import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import { FormattedMessage } from "react-intl";

const Series = () => {
  const getBrowserLanguage = () => {
    return navigator.language || navigator.userLanguage;
  };

  const [series, setSeries] = useState([]);
  const [message, setMessage] = useState("");
  const [showingChart, setShowingChart] = useState(false);

  const drawChart = () => {
    if (series.length > 0 && !showingChart) {
      setShowingChart(true);
      const canvas = d3.select("#canvas");

      const width = 900;
      const height = 500;

      const margin = { top: 10, left: 80, bottom: 40, right: 10 };

      const iwidth = width - margin.left - margin.right;
      const iheight = height - margin.top - margin.bottom;

      const svg = canvas.append("svg");
      svg.attr("width", width);
      svg.attr("height", height);

      let g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const y = d3.scaleLinear().domain([0, 12]).range([iheight, 0]);

      const x = d3
        .scaleBand()
        .domain(series.map((s) => s.name))
        .range([0, iwidth])
        .padding(0.1);

      const bars = g.selectAll("rect").data(series);

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .style("fill", "orange")
        .attr("x", (s) => x(s.name))
        .attr("y", (s) => y(s.seasons))
        .attr("height", (s) => iheight - y(s.seasons))
        .attr("width", x.bandwidth());

      g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);

      g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
    }
  };

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("series") === null) {
        setMessage("Oops! Something went wrong, try again later");
      } else {
        let savedSeries = localStorage.getItem("series");
        setSeries(JSON.parse(savedSeries));
        setMessage("");
      }
    } else {
      let URL = "";
      if (getBrowserLanguage() === "es") {
        URL =
          "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/d9eb0701f6b495dac63bbf59adc4614a9eb5fbc8/series-es.json";
      } else {
        URL =
          "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/64146e99e4416da3a8be2e2da4156cb87b3f6fd0/series-en.json";
      }
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          setSeries(res);
          setMessage("");
          localStorage.setItem("series", JSON.stringify(res));
        });
    }
  }, []);

  useEffect(() => drawChart());

  return (
    <div className="container-fluid">
      <h1>{message}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>
              <FormattedMessage id="Name" />
            </th>
            <th>
              <FormattedMessage id="Channel" />
            </th>
            <th>
              <FormattedMessage id="Description" />
            </th>
          </tr>
        </thead>
        <tbody>
          {series.map((s) => (
            <tr>
              <td className="font-weight-bold">{s.id}</td>
              <td>{s.name}</td>
              <td>{s.channel}</td>
              <td>{s.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Series;
