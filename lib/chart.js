function renderBarChart(type) {
  const labels = {
    "grade": "Bar plot of restaurant inspection(health) grades",
    "violation": "Bar plot of restaurant inspection(health) violations",
  };

  clearBarChart();
  chartLabel = document.getElementById('chart-label');
  chartLabel.innerHTML = "";
  chartLabel.innerText = labels[type];
  createBarChart(type);
}


function clearBarChart() {
  let chart = document.getElementById('chart');
  chart.innerHTML = "";
}


function createBarChart(type = "violation") {

  const srcs = {
    "violation": "http://www.amyskywyl.com/restaurant-inspection-results-visualization//data/violation_count.tsv",
    "grade": "http://www.amyskywyl.com/restaurant-inspection-results-visualization//data/health_grade_count.tsv",
  };

  let srcPath = srcs[type];

  let svg = d3.select("svg"),
    margin = { top: 20, right: 60, bottom: 100, left: 100 },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

  let g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.tsv(srcPath, function (d) {
    d.frequency = +d.frequency;
    return d;
  }, function (error, data) {
    if (error) throw error;

    x.domain(data.map(function (d) { return d.name; }));
    y.domain([0, d3.max(data, function (d) { return d.frequency; })]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)")
      .style("text-anchor", "start");

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.75em")
      .attr("text-anchor", "end")
      .text("Incidents");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.name); })
      .attr("y", function (d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.frequency); });
  });
}

window.renderBarChart = renderBarChart;
